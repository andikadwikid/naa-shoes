import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || 'All'
    const brand = searchParams.get('brand') || 'All'
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const status = searchParams.get('status') || 'All'

    const skip = (page - 1) * limit

    // Build where conditions
    const whereConditions: any = {}
    const andConditions: any[] = []

    // Search filter
    if (search) {
      andConditions.push({
        name: {
          contains: search
        }
      })
    }

    // Category filter
    if (category !== 'All') {
      andConditions.push({
        category: {
          name: category
        }
      })
    }

    // Status filter
    if (status !== 'All') {
      if (status === 'Active') {
        andConditions.push({ isActive: true })
      } else if (status === 'Inactive') {
        andConditions.push({ isActive: false })
      } else if (status === 'On Sale') {
        andConditions.push({ isOnSale: true })
      } else if (status === 'New') {
        andConditions.push({ isNew: true })
      }
    }

    if (andConditions.length > 0) {
      whereConditions.AND = andConditions
    }

    // Build order by
    let orderBy: any = { createdAt: 'desc' }
    if (sortBy === 'name') {
      orderBy = { name: 'asc' }
    } else if (sortBy === 'price-low') {
      orderBy = { price: 'asc' }
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' }
    } else if (sortBy === 'newest') {
      orderBy = { createdAt: 'desc' }
    } else if (sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' }
    }

    // Get total count for pagination
    const totalItems = await prisma.product.count({
      where: whereConditions
    })

    // Get products
    const products = await prisma.product.findMany({
      where: whereConditions,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
        brand: true,
        images: {
          where: { isPrimary: true },
          take: 1
        },
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    const totalPages = Math.ceil(totalItems / limit)

    return NextResponse.json({
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
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
