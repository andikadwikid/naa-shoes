'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Power, PowerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 px-3 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
        >
          <Link href={`/admin/master/categories/${category.id}/edit`}>
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Link>
        </Button>

        <Button
          onClick={handleToggleStatus}
          variant="outline"
          size="sm"
          className={`h-8 px-3 ${
            category.isActive
              ? 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300'
              : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
          }`}
        >
          {category.isActive ? (
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
          onClick={() => setShowConfirmDialog(true)}
          variant="outline"
          size="sm"
          className="h-8 px-3 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Delete
        </Button>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{category.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowConfirmDialog(false)}
              variant="outline"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
