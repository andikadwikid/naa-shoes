import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    // Build where conditions properly to avoid circular references
    const whereConditions: any = {
      isActive: true
    }

    // Array to collect all conditions that need to be combined with AND
    const andConditions: any[] = []

    // Filter by category
    if (category && category !== 'All') {
      whereConditions.category = {
        name: category
      }
    }

    // Filter by search
    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { name: { contains: search, mode: 'insensitive' } } }
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

    const count = await prisma.product.count({
      where: whereConditions
    })

    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error counting products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
