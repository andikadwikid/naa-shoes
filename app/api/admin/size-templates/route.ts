import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeItems = searchParams.get('include') === 'items'
    
    const sizeTemplates = await prisma.sizeTemplate.findMany({
      where: { isActive: true },
      orderBy: [
        { isDefault: 'desc' }, // Default templates first
        { name: 'asc' }
      ],
      include: includeItems ? {
        sizeTemplateItems: {
          include: { size: true },
          orderBy: { size: { value: 'asc' } }
        }
      } : undefined
    })

    return NextResponse.json(sizeTemplates)
  } catch (error) {
    console.error('Error fetching size templates:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, category, isDefault, sizeTemplateItems } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Check if name already exists
    const existingTemplate = await prisma.sizeTemplate.findUnique({
      where: { name }
    })

    if (existingTemplate) {
      return NextResponse.json(
        { error: 'Template with this name already exists' },
        { status: 400 }
      )
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.sizeTemplate.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      })
    }

    const sizeTemplate = await prisma.sizeTemplate.create({
      data: {
        name,
        description,
        category,
        isDefault: isDefault || false,
        sizeTemplateItems: sizeTemplateItems ? {
          create: sizeTemplateItems.map((item: { sizeId: number, centimeters: number }) => ({
            sizeId: item.sizeId,
            centimeters: item.centimeters
          }))
        } : undefined
      },
      include: {
        sizeTemplateItems: {
          include: { size: true },
          orderBy: { size: { value: 'asc' } }
        }
      }
    })

    return NextResponse.json(sizeTemplate, { status: 201 })
  } catch (error) {
    console.error('Error creating size template:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
