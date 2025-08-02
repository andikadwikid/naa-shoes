'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'

interface BlogActionsProps {
  blog: any
  onDelete?: (id: number) => void
  onToggleStatus?: (id: number, isPublished: boolean) => void
}

export default function BlogActions({ blog, onDelete, onToggleStatus }: BlogActionsProps) {
  const { showToast } = useToast()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showToast('Blog post deleted successfully!', 'success')
        onDelete?.(blog.id)
        setShowDeleteModal(false)
      } else {
        const errorData = await response.json()
        showToast(errorData.error || 'Failed to delete blog post', 'error')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      showToast('Failed to delete blog post', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...blog,
          isPublished: !blog.isPublished
        })
      })

      if (response.ok) {
        const action = blog.isPublished ? 'unpublished' : 'published'
        showToast(`Blog post ${action} successfully!`, 'success')
        onToggleStatus?.(blog.id, !blog.isPublished)
      } else {
        const errorData = await response.json()
        showToast(errorData.error || 'Failed to update blog status', 'error')
      }
    } catch (error) {
      console.error('Error updating blog status:', error)
      showToast('Failed to update blog status', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        {/* View Blog */}
        <Link
          href={`/blog/${blog.slug}`}
          target="_blank"
          className="text-blue-600 hover:text-blue-900 text-sm"
          title="View blog post"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>

        {/* Edit Blog */}
        <Link
          href={`/admin/blogs/${blog.id}/edit`}
          className="text-indigo-600 hover:text-indigo-900 text-sm"
          title="Edit blog post"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </Link>

        {/* Toggle Publish Status */}
        <button
          onClick={handleToggleStatus}
          disabled={loading}
          className={`text-sm ${
            blog.isPublished 
              ? 'text-orange-600 hover:text-orange-900' 
              : 'text-green-600 hover:text-green-900'
          } disabled:opacity-50`}
          title={blog.isPublished ? 'Unpublish blog post' : 'Publish blog post'}
        >
          {blog.isPublished ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* Delete Blog */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-red-600 hover:text-red-900 text-sm"
          title="Delete blog post"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-3">Delete Blog Post</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
