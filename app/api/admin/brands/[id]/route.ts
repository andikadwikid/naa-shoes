import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

interface Params {
  id: string
}

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid brand ID' },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Error fetching brand:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid brand ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description, logo, website, isActive } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Check if brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id }
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists (excluding current brand)
    const duplicateSlug = await prisma.brand.findFirst({
      where: { 
        slug,
        id: { not: id }
      }
    })

    if (duplicateSlug) {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        logo,
        website,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Error updating brand:', error)
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
        { error: 'Invalid brand ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Check if brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id }
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: body
    })

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Error updating brand:', error)
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
        { error: 'Invalid brand ID' },
        { status: 400 }
      )
    }

    // Check if brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    // Check if brand has associated products
    if (existingBrand._count.products > 0) {
      return NextResponse.json(
        { error: 'Cannot delete brand that has associated products' },
        { status: 400 }
      )
    }

    await prisma.brand.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Brand deleted successfully' })
  } catch (error) {
    console.error('Error deleting brand:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
