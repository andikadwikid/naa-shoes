import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      description, 
      price, 
      originalPrice, 
      categoryId, 
      colors, 
      sizes, 
      images,
      isNew,
      isOnSale,
      material,
      weight
    } = body

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    })

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        categoryId: parseInt(categoryId),
        isNew: isNew || false,
        isOnSale: isOnSale || false,
        material,
        weight: weight ? parseFloat(weight) : null,
        images: images ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            altText: img.altText || name,
            isPrimary: index === 0,
            order: index
          }))
        } : undefined,
        colors: colors ? {
          create: colors.map((colorId: number) => ({
            colorId
          }))
        } : undefined,
        sizes: sizes ? {
          create: sizes.map((size: { sizeId: number, stock: number }) => ({
            sizeId: size.sizeId,
            stock: size.stock || 0
          }))
        } : undefined
      },
      include: {
        category: true,
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
