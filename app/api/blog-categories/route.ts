import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/blog-categories - Get all active blog categories with post counts
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: {
        isActive: true
      },
      include: {
        _count: {
          select: {
            blogPosts: {
              where: {
                isPublished: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    // Get total count of all published blog posts
    const totalPosts = await prisma.blogPost.count({
      where: {
        isPublished: true
      }
    })

    // Format the response to match the existing BlogCategory interface
    const formattedCategories = [
      {
        name: "All Posts",
        slug: "all",
        count: totalPosts
      },
      ...categories.map(category => ({
        name: category.name,
        slug: category.slug,
        count: category._count.blogPosts
      }))
    ]

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog categories' },
      { status: 500 }
    )
  }
}
