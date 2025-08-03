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
        { error: 'Invalid template ID' },
        { status: 400 }
      )
    }

    const sizeTemplate = await prisma.sizeTemplate.findUnique({
      where: { id },
      include: {
        sizeTemplateItems: {
          include: { size: true },
          orderBy: { size: { value: 'asc' } }
        }
      }
    })

    if (!sizeTemplate) {
      return NextResponse.json(
        { error: 'Size template not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(sizeTemplate)
  } catch (error) {
    console.error('Error fetching size template:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid template ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description, category, isDefault, sizeTemplateItems } = body

    // Check if template exists
    const existingTemplate = await prisma.sizeTemplate.findUnique({
      where: { id }
    })

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Size template not found' },
        { status: 404 }
      )
    }

    // Check if name already exists (excluding current template)
    if (name && name !== existingTemplate.name) {
      const duplicateName = await prisma.sizeTemplate.findFirst({
        where: { 
          name,
          id: { not: id }
        }
      })

      if (duplicateName) {
        return NextResponse.json(
          { error: 'Template with this name already exists' },
          { status: 400 }
        )
      }
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.sizeTemplate.updateMany({
        where: { 
          isDefault: true,
          id: { not: id }
        },
        data: { isDefault: false }
      })
    }

    // Update template
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (category !== undefined) updateData.category = category
    if (isDefault !== undefined) updateData.isDefault = isDefault

    const sizeTemplate = await prisma.sizeTemplate.update({
      where: { id },
      data: updateData,
      include: {
        sizeTemplateItems: {
          include: { size: true },
          orderBy: { size: { value: 'asc' } }
        }
      }
    })

    // Handle size template items update if provided
    if (sizeTemplateItems && Array.isArray(sizeTemplateItems)) {
      // Delete existing items
      await prisma.sizeTemplateItem.deleteMany({
        where: { sizeTemplateId: id }
      })

      // Add new items
      if (sizeTemplateItems.length > 0) {
        await prisma.sizeTemplateItem.createMany({
          data: sizeTemplateItems.map((item: { sizeId: number, centimeters: number }) => ({
            sizeTemplateId: id,
            sizeId: item.sizeId,
            centimeters: item.centimeters
          }))
        })
      }
    }

    // Fetch updated template with items
    const updatedTemplate = await prisma.sizeTemplate.findUnique({
      where: { id },
      include: {
        sizeTemplateItems: {
          include: { size: true },
          orderBy: { size: { value: 'asc' } }
        }
      }
    })

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    console.error('Error updating size template:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid template ID' },
        { status: 400 }
      )
    }

    // Check if template exists
    const existingTemplate = await prisma.sizeTemplate.findUnique({
      where: { id }
    })

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Size template not found' },
        { status: 404 }
      )
    }

    await prisma.sizeTemplate.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Size template deleted successfully' })
  } catch (error) {
    console.error('Error deleting size template:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
