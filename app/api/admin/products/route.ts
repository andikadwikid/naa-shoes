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

    // Search filter with case-insensitive matching
    if (search) {
      andConditions.push({
        name: {
          contains: search,
          mode: 'insensitive'
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

    // Brand filter
    if (brand !== 'All') {
      andConditions.push({
        brand: {
          name: brand
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
        galleryImages: {
          orderBy: { displayOrder: 'asc' },
          take: 1
        },
        productInventories: { 
          include: { 
            color: true,
            size: true 
          } 
        },
        sizeGuides: { include: { size: true } }
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
      brandId,
      productInventories,
      sizeGuides,
      thumbnailUrl,
      galleryImages,
      isNew,
      isOnSale,
      isActive,
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
        brandId: brandId ? parseInt(brandId) : null,
        thumbnailUrl: thumbnailUrl || null,
        isNew: isNew || false,
        isOnSale: isOnSale || false,
        isActive: isActive ?? true,
        material,
        weight: weight ? parseFloat(weight) : null,
        galleryImages: galleryImages ? {
          create: galleryImages.map((img: any, index: number) => ({
            url: img.url,
            altText: img.altText || name,
            caption: img.caption || null,
            displayOrder: index
          }))
        } : undefined,
        productInventories: productInventories ? {
          create: productInventories
            .filter((inv: any) => inv.stock > 0) // Only create entries with stock > 0
            // Remove duplicates based on colorId + sizeId combination
            .reduce((acc: any[], inv: { colorId: number, sizeId: number, stock: number }) => {
              const exists = acc.find(item => item.colorId === inv.colorId && item.sizeId === inv.sizeId)
              if (!exists) {
                acc.push({
                  colorId: inv.colorId,
                  sizeId: inv.sizeId,
                  stock: inv.stock
                })
              }
              return acc
            }, [])
        } : undefined,
        sizeGuides: sizeGuides ? {
          create: sizeGuides
            .filter((guide: any) => guide.centimeters > 0) // Only create guides with valid measurements
            .map((guide: { sizeId: number, centimeters: number }) => ({
              sizeId: guide.sizeId,
              centimeters: parseFloat(guide.centimeters.toString())
            }))
        } : undefined
      },
      include: {
        category: true,
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

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
