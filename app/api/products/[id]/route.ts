import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productId = parseInt(id)

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { 
        id: productId,
        isActive: true // Only show active products to public
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

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Transform product to include legacy structure for backward compatibility
    const transformedProduct = {
      ...product,
      // Legacy fields for backward compatibility
      colors: [...new Set(product.productInventories?.map(inv => inv.color.name) || [])],
      sizes: [...new Set(product.productInventories?.map(inv => inv.size.value) || [])].sort((a, b) => a - b),
      colorStock: product.productInventories ? 
        [...new Set(product.productInventories.map(inv => inv.color.name))].map(colorName => ({
          color: colorName,
          stock: product.productInventories
            .filter(inv => inv.color.name === colorName)
            .reduce((total, inv) => total + inv.stock, 0)
        })) : [],
      sizeGuide: product.sizeGuides?.map(sg => ({
        size: sg.size.value,
        centimeters: sg.centimeters
      })) || []
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
