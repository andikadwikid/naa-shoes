'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SizeFormProps {
  size?: {
    id: number
    value: number
  }
}

export default function SizeForm({ size }: SizeFormProps) {
  const [formData, setFormData] = useState({
    value: size?.value?.toString() || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const url = size 
        ? `/api/admin/sizes/${size.id}`
        : '/api/admin/sizes'
      
      const method = size ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: parseFloat(formData.value)
        }),
      })

      if (response.ok) {
        router.push('/admin/master/sizes')
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

  // Common EU shoe sizes for suggestions
  const commonSizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
            Size Value *
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            min="20"
            max="60"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="e.g., 38"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter EU size (e.g., 38, 39, 40). Supports half sizes like 38.5
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Select
          </label>
          <div className="grid grid-cols-4 gap-2">
            {commonSizes.map(commonSize => (
              <button
                key={commonSize}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, value: commonSize.toString() }))}
                className={`p-2 text-sm border rounded-lg transition-colors ${
                  formData.value === commonSize.toString()
                    ? 'bg-pink-100 border-pink-300 text-pink-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {commonSize}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Size Preview */}
      {formData.value && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
              <span className="font-bold text-gray-700 text-lg">{formData.value}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">EU {formData.value}</p>
              <p className="text-sm text-gray-500">European Size</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Link
          href="/admin/master/sizes"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : (size ? 'Update Size' : 'Create Size')}
        </button>
      </div>
    </form>
  )
}
