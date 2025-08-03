import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

interface Params {
  id: string
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        galleryImages: { orderBy: { displayOrder: 'asc' } },
        productInventories: { 
          include: { 
            color: true,
            size: true 
          } 
        },
        sizeGuides: { include: { size: true } }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      originalPrice,
      categoryId,
      brandId,
      isNew,
      isOnSale,
      isActive,
      material,
      weight,
      productInventories,
      sizeGuides,
      thumbnailUrl,
      galleryImages
    } = body

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Generate slug from name if name is provided
    let slug = existingProduct.slug
    if (name && name !== existingProduct.name) {
      slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if slug already exists (excluding current product)
      const duplicateSlug = await prisma.product.findFirst({
        where: { 
          slug,
          id: { not: id }
        }
      })

      if (duplicateSlug) {
        return NextResponse.json(
          { error: 'Product with this name already exists' },
          { status: 400 }
        )
      }
    }

    // Update product
    const updateData: any = {
      ...(name && { name, slug }),
      ...(description !== undefined && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(originalPrice !== undefined && { originalPrice: originalPrice ? parseFloat(originalPrice) : null }),
      ...(categoryId && { categoryId: parseInt(categoryId) }),
      ...(brandId !== undefined && { brandId: brandId ? parseInt(brandId) : null }),
      ...(thumbnailUrl !== undefined && { thumbnailUrl }),
      ...(isNew !== undefined && { isNew }),
      ...(isOnSale !== undefined && { isOnSale }),
      ...(isActive !== undefined && { isActive }),
      ...(material !== undefined && { material }),
      ...(weight !== undefined && { weight: weight ? parseFloat(weight) : null })
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        brand: true,
        galleryImages: { orderBy: { displayOrder: 'asc' } },
        productInventories: { 
          include: { 
            color: true,
            size: true 
          } 
        },
        sizeGuides: { include: { size: true } }
      }
    })

    // Handle product inventories update if provided
    if (productInventories && Array.isArray(productInventories)) {
      // Delete existing inventories
      await prisma.productInventory.deleteMany({
        where: { productId: id }
      })

      // Add new inventories (only those with stock > 0)
      const validInventories = productInventories.filter((inv: any) => inv.stock > 0)
      if (validInventories.length > 0) {
        await prisma.productInventory.createMany({
          data: validInventories.map((inv: { colorId: number, sizeId: number, stock: number }) => ({
            productId: id,
            colorId: inv.colorId,
            sizeId: inv.sizeId,
            stock: inv.stock
          }))
        })
      }
    }

    // Handle size guides update if provided
    if (sizeGuides && Array.isArray(sizeGuides)) {
      // Delete existing size guides
      await prisma.sizeGuide.deleteMany({
        where: { productId: id }
      })

      // Add new size guides (only those with valid measurements)
      const validGuides = sizeGuides.filter((guide: any) => guide.centimeters > 0)
      if (validGuides.length > 0) {
        await prisma.sizeGuide.createMany({
          data: validGuides.map((guide: { sizeId: number, centimeters: number }) => ({
            productId: id,
            sizeId: guide.sizeId,
            centimeters: parseFloat(guide.centimeters.toString())
          }))
        })
      }
    }

    // Handle gallery images update if provided
    if (galleryImages && Array.isArray(galleryImages)) {
      // Delete existing gallery images
      await prisma.productImage.deleteMany({
        where: { productId: id }
      })

      // Add new gallery images
      if (galleryImages.length > 0) {
        await prisma.productImage.createMany({
          data: galleryImages.map((img: any, index: number) => ({
            productId: id,
            url: img.url,
            altText: img.altText || name || existingProduct.name,
            caption: img.caption || null,
            displayOrder: index
          }))
        })
      }
    }

    // Fetch updated product with all relations
    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        galleryImages: { orderBy: { displayOrder: 'asc' } },
        productInventories: { 
          include: { 
            color: true,
            size: true 
          } 
        },
        sizeGuides: { include: { size: true } }
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
