import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const color = await prisma.color.findUnique({
      where: { id: parseInt(id) }
    })

    if (!color) {
      return NextResponse.json(
        { error: 'Color not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(color)
  } catch (error) {
    console.error('Error fetching color:', error)
    return NextResponse.json(
      { error: 'Failed to fetch color' },
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
    const { name, hexCode } = body

    const color = await prisma.color.update({
      where: { id: parseInt(id) },
      data: {
        name,
        hexCode
      }
    })

    return NextResponse.json(color)
  } catch (error) {
    console.error('Error updating color:', error)
    return NextResponse.json(
      { error: 'Failed to update color' },
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

    await prisma.color.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Color deleted successfully' })
  } catch (error) {
    console.error('Error deleting color:', error)
    return NextResponse.json(
      { error: 'Failed to delete color' },
      { status: 500 }
    )
  }
}
