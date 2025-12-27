'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Size {
  id: number
  value: number
}

interface SizeTemplateItem {
  sizeId: number
  centimeters: number
}

interface SizeTemplate {
  id: number
  name: string
  description?: string
  category?: string
  isDefault: boolean
}

interface SizeTemplateFormProps {
  template?: SizeTemplate
}

export default function SizeTemplateForm({ template }: SizeTemplateFormProps) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    description: template?.description || '',
    category: template?.category || '',
    isDefault: template?.isDefault || false
  })
  
  const [sizes, setSizes] = useState<Size[]>([])
  const [sizeTemplateItems, setSizeTemplateItems] = useState<SizeTemplateItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const router = useRouter()

  // Load sizes and existing template data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Load available sizes
        const sizesResponse = await fetch('/api/admin/sizes')
        if (sizesResponse.ok) {
          const sizesData = await sizesResponse.json()
          setSizes(sizesData)
        }

        // Load existing template data if editing
        if (template?.id) {
          const templateResponse = await fetch(`/api/admin/size-templates/${template.id}`)
          if (templateResponse.ok) {
            const templateData = await templateResponse.json()
            
            // Set existing template items
            if (templateData.sizeTemplateItems) {
              setSizeTemplateItems(templateData.sizeTemplateItems.map((item: any) => ({
                sizeId: item.sizeId,
                centimeters: item.centimeters
              })))
            }
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [template?.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSizeGuideChange = (sizeId: number, centimeters: number) => {
    setSizeTemplateItems(prev => {
      const existing = prev.find(item => item.sizeId === sizeId)
      if (existing) {
        if (centimeters === 0) {
          return prev.filter(item => item.sizeId !== sizeId)
        }
        return prev.map(item => 
          item.sizeId === sizeId ? { ...item, centimeters } : item
        )
      } else if (centimeters > 0) {
        return [...prev, { sizeId, centimeters }]
      }
      return prev
    })
  }

  // Template calculation functions
  const calculateStandardSizeGuide = (euSize: number): number => {
    return parseFloat(((euSize - 2) / 1.5).toFixed(1))
  }

  const applyStandardTemplate = () => {
    const newItems: SizeTemplateItem[] = sizes.map(size => ({
      sizeId: size.id,
      centimeters: calculateStandardSizeGuide(size.value)
    }))
    setSizeTemplateItems(newItems)
  }

  const clearAllSizes = () => {
    setSizeTemplateItems([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const url = template 
        ? `/api/admin/size-templates/${template.id}`
        : '/api/admin/size-templates'
      
      const method = template ? 'PATCH' : 'POST'

      const submitData = {
        ...formData,
        sizeTemplateItems
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        router.push('/admin/master/size-templates')
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.general}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Template Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., Standard EU Sizing"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category (Optional)
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="heels">High Heels</option>
              <option value="sneakers">Sneakers</option>
              <option value="boots">Boots</option>
              <option value="flats">Flats</option>
              <option value="sandals">Sandals</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Optional description for this template"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
              Set as default template
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Default template will be automatically suggested when creating products
          </p>
        </div>
      </div>

      {/* Size Guide Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Size Guide Configuration</h3>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={applyStandardTemplate}
              className="text-sm px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
            >
              Apply Standard Formula
            </button>
            <button
              type="button"
              onClick={clearAllSizes}
              className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4 text-sm text-gray-600">
          {sizeTemplateItems.length} / {sizes.length} sizes configured
        </div>

        {/* Size Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sizes.map(size => {
            const item = sizeTemplateItems.find(item => item.sizeId === size.id)
            const centimeters = item?.centimeters || 0

            return (
              <div key={size.id} className="border border-gray-200 rounded-lg p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size {size.value}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  value={centimeters || ''}
                  onChange={(e) => handleSizeGuideChange(size.id, parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <div className="text-xs text-gray-500 mt-1">cm</div>
                
                {/* Quick actions */}
                <div className="flex gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => handleSizeGuideChange(size.id, calculateStandardSizeGuide(size.value))}
                    className="text-xs px-1 py-0.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    title="Apply standard formula"
                  >
                    Std
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSizeGuideChange(size.id, 0)}
                    className="text-xs px-1 py-0.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                    title="Clear this size"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Template Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Standard Formula:</strong> (EU Size - 2) ÷ 1.5 = Foot length in cm
            <br />
            <strong>Example:</strong> Size 38 = (38 - 2) ÷ 1.5 = 24.0 cm
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Link
          href="/admin/master/size-templates"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : (template ? 'Update Template' : 'Create Template')}
        </button>
      </div>
    </form>
  )
}
