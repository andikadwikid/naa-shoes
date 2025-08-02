import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { isActive, ...updateData } = body

    let processedData: any = { ...updateData }

    if (updateData.name) {
      const slug = updateData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if slug already exists (excluding current product)
      const existingProduct = await prisma.product.findFirst({
        where: { 
          slug,
          id: { not: parseInt(id) }
        }
      })

      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this name already exists' },
          { status: 400 }
        )
      }

      processedData.slug = slug
    }

    if (updateData.price) {
      processedData.price = parseFloat(updateData.price)
    }

    if (updateData.originalPrice !== undefined) {
      processedData.originalPrice = updateData.originalPrice ? parseFloat(updateData.originalPrice) : null
    }

    if (updateData.categoryId) {
      processedData.categoryId = parseInt(updateData.categoryId)
    }

    if (updateData.weight !== undefined) {
      processedData.weight = updateData.weight ? parseFloat(updateData.weight) : null
    }

    if (isActive !== undefined) {
      processedData.isActive = isActive
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: processedData,
      include: {
        category: true,
        images: true,
        colors: { include: { color: true } },
        sizes: { include: { size: true } }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if product exists and has orders
    const productWithOrders = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        orderItems: true
      }
    })

    if (!productWithOrders) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (productWithOrders.orderItems.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with existing orders' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
