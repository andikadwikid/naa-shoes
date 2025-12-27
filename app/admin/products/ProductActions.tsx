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

interface Product {
  id: number
  name: string
  isActive: boolean
}

interface ProductActionsProps {
  product: Product
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
        setShowConfirmDialog(false)
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      alert('Error deleting product')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleToggleStatus = async () => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !product.isActive
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Failed to update product status')
      }
    } catch (error) {
      alert('Error updating product status')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full h-8 px-3 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
        >
          <Link href={`/admin/products/${product.id}/edit`}>
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button
            onClick={handleToggleStatus}
            variant="outline"
            size="sm"
            className={`flex-1 h-8 px-3 ${
              product.isActive
                ? 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300'
                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
            }`}
          >
            {product.isActive ? (
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
            className="flex-1 h-8 px-3 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Delete
          </Button>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
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
