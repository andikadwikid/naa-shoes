'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import BlogForm from '../../BlogForm'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface EditBlogPageProps {}

export default function EditBlogPage({}: EditBlogPageProps) {
  const params = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blogs/${params.id}`)
        if (response.ok) {
          const blogData = await response.json()
          setBlog(blogData)
        } else {
          setError('Blog not found')
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        setError('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading blog...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Error</h1>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update the content and settings for "{blog?.title || 'this blog post'}"
        </p>
      </div>

      <BlogForm blog={blog} mode="edit" />
    </div>
  )
}
