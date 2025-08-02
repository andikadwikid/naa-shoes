import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const sortBy = searchParams.get('sortBy')
    const orderBy = searchParams.get('orderBy') || getOrderByFromSort(sortBy) || 'createdAt'
    const order = searchParams.get('order') || getOrderFromSort(sortBy) || 'desc'

    // Helper functions for sorting
    function getOrderByFromSort(sortBy: string | null): string {
      switch (sortBy) {
        case 'price-low':
        case 'price-high':
          return 'price'
        case 'name':
          return 'name'
        case 'newest':
          return 'createdAt'
        default:
          return 'createdAt'
      }
    }

    function getOrderFromSort(sortBy: string | null): string {
      switch (sortBy) {
        case 'price-low':
          return 'asc'
        case 'price-high':
          return 'desc'
        case 'name':
          return 'asc'
        case 'newest':
          return 'desc'
        default:
          return 'desc'
      }
    }

    // Build where conditions properly to avoid circular references
    const whereConditions: any = {
      isActive: true // Only show active products to public
    }

    // Array to collect all conditions that need to be combined with AND
    const andConditions: any[] = []

    // Filter by category
    if (category && category !== 'All') {
      whereConditions.category = {
        name: category
      }
    }

    // Filter by search (SQLite doesn't fully support mode: 'insensitive', so we'll handle case sensitivity in application)
    if (search) {
      const searchLower = search.toLowerCase()
      andConditions.push({
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { category: { name: { contains: search } } }
        ]
      })
    }

    // Filter for featured products
    if (featured === 'true') {
      andConditions.push({
        OR: [
          { isNew: true },
          { isOnSale: true }
        ]
      })
    }

    // Combine all conditions
    if (andConditions.length > 0) {
      whereConditions.AND = andConditions
    }

    const queryOptions: any = {
      where: whereConditions,
      orderBy: { [orderBy]: order },
      include: {
        category: true,
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    }

    // Add limit if specified
    if (limit && !isNaN(parseInt(limit))) {
      queryOptions.take = parseInt(limit)
    }

    // Add offset if specified
    if (offset && !isNaN(parseInt(offset))) {
      queryOptions.skip = parseInt(offset)
    }

    const products = await prisma.product.findMany(queryOptions)

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
