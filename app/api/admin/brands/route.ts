import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const orderBy = searchParams.get('orderBy') || 'name'
    const order = searchParams.get('order') || 'asc'

    const queryOptions: any = {
      orderBy: { [orderBy]: order }
    }

    // Add limit if specified
    if (limit && !isNaN(parseInt(limit))) {
      queryOptions.take = parseInt(limit)
    }

    const brands = await prisma.brand.findMany(queryOptions)

    return NextResponse.json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, logo, website } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { slug }
    })

    if (existingBrand) {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        description,
        logo,
        website
      }
    })

    return NextResponse.json(brand, { status: 201 })
  } catch (error) {
    console.error('Error creating brand:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
