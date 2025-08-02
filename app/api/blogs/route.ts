import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/blogs - Get published blog posts for public
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category') || ''
    const featured = searchParams.get('featured') === 'true'
    const recent = searchParams.get('recent') === 'true'

    const skip = (page - 1) * limit

    // Build where condition for published posts only
    const where: any = {
      isPublished: true
    }

    if (category && category !== 'all') {
      where.blogCategory = {
        slug: category
      }
    }

    if (featured) {
      where.isFeatured = true
    }

    let orderBy: any = { publishedAt: 'desc' }
    if (recent) {
      orderBy = { createdAt: 'desc' }
    }

    // Get blogs with relations
    const [blogs, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: {
            select: {
              name: true,
              avatar: true
            }
          },
          blogCategory: {
            select: {
              name: true,
              slug: true
            }
          },
          tags: {
            include: {
              tag: {
                select: {
                  name: true,
                  slug: true
                }
              }
            }
          }
        },
        orderBy,
        skip: featured ? 0 : skip,
        take: featured ? 3 : limit
      }),
      prisma.blogPost.count({ where })
    ])

    // Format the response to match the existing BlogPost interface
    const formattedBlogs = blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      content: blog.content,
      image: blog.image || '',
      author: {
        name: blog.author.name,
        avatar: blog.author.avatar || ''
      },
      publishedAt: blog.publishedAt?.toISOString().split('T')[0] || blog.createdAt.toISOString().split('T')[0],
      readTime: blog.readTime || 5,
      category: blog.blogCategory.name,
      tags: blog.tags.map(bt => bt.tag.name),
      featured: blog.isFeatured
    }))

    if (featured || recent) {
      return NextResponse.json(formattedBlogs)
    }

    return NextResponse.json({
      blogs: formattedBlogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
