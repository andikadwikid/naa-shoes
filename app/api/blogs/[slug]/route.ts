import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET /api/blogs/[slug] - Get a single published blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const blog = await prisma.blogPost.findUnique({
      where: { 
        slug,
        isPublished: true
      },
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
      }
    })

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Format the response to match the existing BlogPost interface
    const formattedBlog = {
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
    }

    return NextResponse.json(formattedBlog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}
