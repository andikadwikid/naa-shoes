'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Power, PowerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="h-8 px-3 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
      >
        <Link href={`/admin/master/brands/${brand.id}/edit`}>
          <Edit2 className="w-3.5 h-3.5 mr-1.5" />
          Edit
        </Link>
      </Button>

      <Button
        onClick={handleToggleStatus}
        variant="outline"
        size="sm"
        className={`h-8 px-3 ${
          brand.isActive
            ? 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300'
            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
        }`}
      >
        {brand.isActive ? (
          <>
            <PowerOff className="w-3.5 h-3.5 mr-1.5" />
            Deactivate
          </>
        ) : (
          <>
            <Power className="w-3.5 h-3.5 mr-1.5" />
            Activate
          </>
        )}
      </Button>

      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant="outline"
        size="sm"
        className="h-8 px-3 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300"
      >
        {isDeleting ? (
          <>
            <div className="w-3.5 h-3.5 mr-1.5 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Delete
          </>
        )}
      </Button>
    </div>
  )
}
