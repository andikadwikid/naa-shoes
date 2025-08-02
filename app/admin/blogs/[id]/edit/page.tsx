import { notFound } from 'next/navigation'
import BlogForm from '../../BlogForm'

interface EditBlogPageProps {
  params: {
    id: string
  }
}

async function getBlog(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/blogs/${id}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function generateMetadata({ params }: EditBlogPageProps) {
  const blog = await getBlog(params.id)
  
  return {
    title: blog ? `Edit "${blog.title}" - Admin Dashboard` : 'Edit Blog Post - Admin Dashboard',
    description: 'Edit blog post details and content'
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const blog = await getBlog(params.id)

  if (!blog) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update the content and settings for "{blog.title}"
        </p>
      </div>
      
      <BlogForm blog={blog} mode="edit" />
    </div>
  )
}
