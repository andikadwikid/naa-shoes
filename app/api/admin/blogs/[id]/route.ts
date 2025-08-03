import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

// GET /api/admin/blogs/[id] - Get a single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    const blog = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        blogCategory: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
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

    // Format the response
    const formattedBlog = {
      ...blog,
      tags: blog.tags.map(bt => bt.tag)
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

// PUT /api/admin/blogs/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    const data = await request.json()
    const { 
      title, 
      slug, 
      excerpt, 
      content, 
      image, 
      authorId, 
      blogCategoryId, 
      isPublished, 
      isFeatured,
      readTime,
      tags = []
    } = data

    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Check if slug already exists for another blog
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug }
      })

      if (slugExists && slugExists.id !== id) {
        return NextResponse.json(
          { error: 'Blog post with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update published date if status changes to published
    let publishedAt = existingBlog.publishedAt
    if (isPublished && !existingBlog.isPublished) {
      publishedAt = new Date()
    } else if (!isPublished) {
      publishedAt = null
    }

    // Delete existing tags
    await prisma.blogTag.deleteMany({
      where: { blogPostId: id }
    })

    // Update the blog post
    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        authorId,
        blogCategoryId,
        isPublished,
        isFeatured,
        readTime,
        publishedAt,
        tags: {
          create: tags.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { slug: tagName.toLowerCase().replace(/\s+/g, '-') },
                create: {
                  name: tagName,
                  slug: tagName.toLowerCase().replace(/\s+/g, '-')
                }
              }
            }
          }))
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        blogCategory: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      }
    })

    // Format the response
    const formattedBlog = {
      ...blog,
      tags: blog.tags.map(bt => bt.tag)
    }

    return NextResponse.json(formattedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/blogs/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Delete the blog post (tags will be deleted automatically due to cascade)
    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
