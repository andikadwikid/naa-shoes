import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

interface Params {
  id: string
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id)
    
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
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
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

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id)
    
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
      colors,
      sizes
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
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    // Handle colors update if provided
    if (colors && Array.isArray(colors)) {
      // Delete existing colors
      await prisma.productColor.deleteMany({
        where: { productId: id }
      })

      // Add new colors
      if (colors.length > 0) {
        await prisma.productColor.createMany({
          data: colors.map((colorId: number) => ({
            productId: id,
            colorId
          }))
        })
      }
    }

    // Handle sizes update if provided
    if (sizes && Array.isArray(sizes)) {
      // Delete existing sizes
      await prisma.productSize.deleteMany({
        where: { productId: id }
      })

      // Add new sizes
      if (sizes.length > 0) {
        await prisma.productSize.createMany({
          data: sizes.map((size: { sizeId: number, stock: number }) => ({
            productId: id,
            sizeId: size.sizeId,
            stock: size.stock || 0
          }))
        })
      }
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id)
    
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
