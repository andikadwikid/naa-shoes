'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SizeTemplate {
  id: number
  name: string
  isDefault: boolean
}

interface SizeTemplateActionsProps {
  template: SizeTemplate
  onUpdate: () => void
}

export default function SizeTemplateActions({ template, onUpdate }: SizeTemplateActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/size-templates/${template.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onUpdate()
        setShowConfirmDialog(false)
      } else {
        alert('Failed to delete template')
      }
    } catch (error) {
      alert('Error deleting template')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSetDefault = async () => {
    try {
      const response = await fetch(`/api/admin/size-templates/${template.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isDefault: true
        }),
      })

      if (response.ok) {
        onUpdate()
      } else {
        alert('Failed to set as default template')
      }
    } catch (error) {
      alert('Error updating template')
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
          <Link href={`/admin/master/size-templates/${template.id}/edit`}>
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit
          </Link>
        </Button>

        {!template.isDefault && (
          <Button
            onClick={handleSetDefault}
            variant="outline"
            size="sm"
            className="h-8 px-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300"
          >
            <Star className="w-3.5 h-3.5 mr-1.5" />
            Set Default
          </Button>
        )}

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
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{template.name}"? This action cannot be undone.
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
