'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Color {
  id: number
  name: string
  hexCode: string
}

interface ColorActionsProps {
  color: Color
}

export default function ColorActions({ color }: ColorActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/colors/${color.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        setShowConfirmDialog(false)
      } else {
        alert('Failed to delete color')
      }
    } catch (error) {
      alert('Error deleting color')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="flex space-x-2">
        <Link
          href={`/admin/master/colors/${color.id}/edit`}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium py-1 px-3 rounded transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => setShowConfirmDialog(true)}
          className="bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium py-1 px-3 rounded transition-colors"
        >
          Delete
        </button>
      </div>

      {/* Confirm Delete Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Color</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete color "{color.name}"? This action cannot be undone.
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
