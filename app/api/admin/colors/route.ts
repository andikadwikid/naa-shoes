import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(colors)
  } catch (error) {
    console.error('Error fetching colors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch colors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, hexCode } = body

    if (!name || !hexCode) {
      return NextResponse.json(
        { error: 'Name and hex code are required' },
        { status: 400 }
      )
    }

    const color = await prisma.color.create({
      data: {
        name,
        hexCode
      }
    })

    return NextResponse.json(color, { status: 201 })
  } catch (error) {
    console.error('Error creating color:', error)
    return NextResponse.json(
      { error: 'Failed to create color' },
      { status: 500 }
    )
  }
}
