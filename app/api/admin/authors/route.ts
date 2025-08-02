import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/admin/authors - Get all authors
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const where: any = {
      isActive: true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    const authors = await prisma.author.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            blogPosts: true
          }
        }
      }
    })

    return NextResponse.json(authors)
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch authors' },
      { status: 500 }
    )
  }
}

// POST /api/admin/authors - Create a new author
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, avatar, bio } = data

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingAuthor = await prisma.author.findUnique({
      where: { email }
    })

    if (existingAuthor) {
      return NextResponse.json(
        { error: 'Author with this email already exists' },
        { status: 400 }
      )
    }

    const author = await prisma.author.create({
      data: {
        name,
        email,
        avatar,
        bio
      }
    })

    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json(
      { error: 'Failed to create author' },
      { status: 500 }
    )
  }
}
