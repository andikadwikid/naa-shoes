import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sizes = await prisma.size.findMany({
      orderBy: { value: 'asc' }
    })
    
    return NextResponse.json(sizes)
  } catch (error) {
    console.error('Error fetching sizes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sizes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { value } = body

    if (!value) {
      return NextResponse.json(
        { error: 'Size value is required' },
        { status: 400 }
      )
    }

    const size = await prisma.size.create({
      data: {
        value: parseFloat(value)
      }
    })

    return NextResponse.json(size, { status: 201 })
  } catch (error) {
    console.error('Error creating size:', error)
    return NextResponse.json(
      { error: 'Failed to create size' },
      { status: 500 }
    )
  }
}
