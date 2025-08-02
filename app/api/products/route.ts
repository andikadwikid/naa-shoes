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

    const queryOptions: any = {
      where: {
        isActive: true // Only show active products to public
      },
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

    // Filter by category (combine with existing where conditions)
    if (category && category !== 'All') {
      queryOptions.where = {
        ...queryOptions.where,
        category: {
          name: category
        }
      }
    }

    // Filter by search
    if (search) {
      queryOptions.where.AND = [
        queryOptions.where,
        {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { category: { name: { contains: search, mode: 'insensitive' } } }
          ]
        }
      ]
    }

    // Filter for featured products
    if (featured === 'true') {
      queryOptions.where = {
        ...queryOptions.where,
        OR: [
          { isNew: true },
          { isOnSale: true }
        ]
      }
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
