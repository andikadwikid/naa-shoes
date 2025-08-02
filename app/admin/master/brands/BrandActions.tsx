'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '../../hooks/useToast'

interface Brand {
  id: number
  name: string
  slug: string
  isActive: boolean
}

interface BrandActionsProps {
  brand: Brand
}

export default function BrandActions({ brand }: BrandActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/brands/${brand.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete brand')
      }

      showToast('Brand deleted successfully', 'success')
      router.refresh()
    } catch (error) {
      console.error('Error deleting brand:', error)
      showToast(error instanceof Error ? error.message : 'Failed to delete brand', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async () => {
    try {
      const response = await fetch(`/api/admin/brands/${brand.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !brand.isActive,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update brand status')
      }

      showToast(`Brand ${brand.isActive ? 'deactivated' : 'activated'} successfully`, 'success')
      router.refresh()
    } catch (error) {
      console.error('Error updating brand status:', error)
      showToast(error instanceof Error ? error.message : 'Failed to update brand status', 'error')
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/admin/master/brands/${brand.id}/edit`}
        className="text-pink-600 hover:text-pink-700 font-medium"
      >
        Edit
      </Link>
      <button
        onClick={handleToggleStatus}
        className={`font-medium ${
          brand.isActive
            ? 'text-orange-600 hover:text-orange-700'
            : 'text-green-600 hover:text-green-700'
        }`}
      >
        {brand.isActive ? 'Deactivate' : 'Activate'}
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  )
}
