'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: number
  name: string
  slug: string
  isActive: boolean
}

interface CategoryActionsProps {
  category: Category
}

export default function CategoryActions({ category }: CategoryActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        setShowConfirmDialog(false)
      } else {
        alert('Failed to delete category')
      }
    } catch (error) {
      alert('Error deleting category')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async () => {
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !category.isActive
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to update category status')
      }
    } catch (error) {
      alert('Error updating category status')
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <Link
          href={`/admin/master/categories/${category.id}/edit`}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
        >
          Edit
        </Link>
        <button
          onClick={handleToggleStatus}
          className={`text-sm font-medium ${
            category.isActive 
              ? 'text-orange-600 hover:text-orange-900' 
              : 'text-green-600 hover:text-green-900'
          }`}
        >
          {category.isActive ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={() => setShowConfirmDialog(true)}
          className="text-red-600 hover:text-red-900 text-sm font-medium"
        >
          Delete
        </button>
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Category</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete "{category.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
