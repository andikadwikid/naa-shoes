'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ColorFormProps {
  color?: {
    id: number
    name: string
    hexCode: string
  }
}

export default function ColorForm({ color }: ColorFormProps) {
  const [formData, setFormData] = useState({
    name: color?.name || '',
    hexCode: color?.hexCode || '#000000'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const url = color 
        ? `/api/admin/colors/${color.id}`
        : '/api/admin/colors'
      
      const method = color ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/master/colors')
        router.refresh()
      } else {
        const errorData = await response.json()
        if (errorData.error) {
          setErrors({ general: errorData.error })
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Color Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="e.g., Rose Gold"
          />
        </div>

        <div>
          <label htmlFor="hexCode" className="block text-sm font-medium text-gray-700 mb-2">
            Hex Code *
          </label>
          <div className="flex space-x-3">
            <input
              type="color"
              id="hexCode"
              name="hexCode"
              value={formData.hexCode}
              onChange={handleChange}
              className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={formData.hexCode}
              onChange={handleChange}
              name="hexCode"
              required
              pattern="^#[0-9A-Fa-f]{6}$"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono"
              placeholder="#000000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use the color picker or enter a hex code (e.g., #FF5733)
          </p>
        </div>
      </div>

      {/* Color Preview */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-lg border border-gray-300"
            style={{ backgroundColor: formData.hexCode }}
          />
          <div>
            <p className="font-medium text-gray-900">{formData.name || 'Color Name'}</p>
            <p className="text-sm text-gray-500 font-mono">{formData.hexCode}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Link
          href="/admin/master/colors"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : (color ? 'Update Color' : 'Create Color')}
        </button>
      </div>
    </form>
  )
}
