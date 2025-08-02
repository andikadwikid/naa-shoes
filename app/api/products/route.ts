import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const orderBy = searchParams.get('orderBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

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

    // Filter by category
    if (category && category !== 'All') {
      queryOptions.where.category = {
        name: category
      }
    }

    // Filter by search
    if (search) {
      queryOptions.where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filter for featured products
    if (featured === 'true') {
      queryOptions.where.OR = [
        { isNew: true },
        { isOnSale: true }
      ]
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
