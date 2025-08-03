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

    // Filter by search with case-insensitive matching
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

    const queryOptions: any = {
      where: whereConditions,
      orderBy: { [orderBy]: order },
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
    }

    // Add limit if specified
    if (limit && !isNaN(parseInt(limit))) {
      queryOptions.take = parseInt(limit)
    }

    // Add offset if specified
    if (offset && !isNaN(parseInt(offset))) {
      queryOptions.skip = parseInt(offset)
    }

    const products = await prisma.product.findMany(queryOptions) as any[]

    // Transform products to include legacy structure for backward compatibility
    const transformedProducts = products.map((product: any) => ({
      ...product,
      // Legacy fields for backward compatibility
      colors: [...new Set(product.productInventories?.map((inv: any) => inv.color.name) || [])],
      sizes: ([...new Set(product.productInventories?.map((inv: any) => inv.size.value) || [])] as number[]).sort((a: number, b: number) => a - b),
      colorStock: product.productInventories ?
        ([...new Set(product.productInventories.map((inv: any) => inv.color.name))] as string[]).map((colorName: string) => ({
          color: colorName,
          stock: product.productInventories
            .filter((inv: any) => inv.color.name === colorName)
            .reduce((total: number, inv: any) => total + inv.stock, 0)
        })) : [],
      sizeGuide: product.sizeGuides?.map((sg: any) => ({
        size: sg.size.value,
        centimeters: sg.centimeters
      })) || []
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
