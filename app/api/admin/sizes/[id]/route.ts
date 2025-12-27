import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const size = await prisma.size.findUnique({
      where: { id: parseInt(id) }
    })

    if (!size) {
      return NextResponse.json(
        { error: 'Size not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(size)
  } catch (error) {
    console.error('Error fetching size:', error)
    return NextResponse.json(
      { error: 'Failed to fetch size' },
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
    const { value } = body

    const size = await prisma.size.update({
      where: { id: parseInt(id) },
      data: {
        value: parseFloat(value)
      }
    })

    return NextResponse.json(size)
  } catch (error) {
    console.error('Error updating size:', error)
    return NextResponse.json(
      { error: 'Failed to update size' },
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

    await prisma.size.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Size deleted successfully' })
  } catch (error) {
    console.error('Error deleting size:', error)
    return NextResponse.json(
      { error: 'Failed to delete size' },
      { status: 500 }
    )
  }
}
