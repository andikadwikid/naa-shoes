'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'

interface Category {
  id: number
  name: string
}

interface Color {
  id: number
  name: string
  hexCode?: string
}

interface Size {
  id: number
  value: number
}

interface Brand {
  id: number
  name: string
}

interface ProductFormProps {
  product?: {
    id: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    categoryId: number
    brandId?: number | null
    isNew: boolean
    isOnSale: boolean
    isActive: boolean
    material?: string | null
    weight?: number | null
  }
}

export default function ProductForm({ product }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    originalPrice: product?.originalPrice?.toString() || '',
    categoryId: product?.categoryId?.toString() || '',
    brandId: product?.brandId ? product.brandId.toString() : '',
    isNew: product?.isNew ?? false,
    isOnSale: product?.isOnSale ?? false,
    isActive: product?.isActive ?? true,
    material: product?.material || '',
    weight: product?.weight?.toString() || ''
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<{sizeId: number, stock: number}[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loadError, setLoadError] = useState<string>('')
  const router = useRouter()

  // Load master data and existing product data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        // Load master data
        const [categoriesRes, brandsRes, colorsRes, sizesRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/brands'),
          fetch('/api/admin/colors'),
          fetch('/api/admin/sizes')
        ])

        if (!categoriesRes.ok || !brandsRes.ok || !colorsRes.ok || !sizesRes.ok) {
          throw new Error('Failed to load master data')
        }

        const [categoriesData, brandsData, colorsData, sizesData] = await Promise.all([
          categoriesRes.json(),
          brandsRes.json(),
          colorsRes.json(),
          sizesRes.json()
        ])

        setCategories(categoriesData)
        setBrands(brandsData)
        setColors(colorsData)
        setSizes(sizesData)

        // Load existing product data if in edit mode
        if (product?.id) {
          const response = await fetch(`/api/admin/products/${product.id}`)
          if (response.ok) {
            const productData = await response.json()

            // Set existing colors
            if (productData.colors) {
              setSelectedColors(productData.colors.map((pc: any) => pc.colorId))
            }

            // Set existing sizes with stock
            if (productData.sizes) {
              setSelectedSizes(productData.sizes.map((ps: any) => ({
                sizeId: ps.sizeId,
                stock: ps.stock
              })))
            }
          }
        }
      } catch (error) {
        console.error('Error loading data:', error)
        setLoadError('Failed to load required data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [product?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const url = product 
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'
      
      const method = product ? 'PATCH' : 'POST'

      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        categoryId: parseInt(formData.categoryId),
        brandId: formData.brandId ? parseInt(formData.brandId) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        colors: selectedColors,
        sizes: selectedSizes
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        router.push('/admin/products')
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleColorToggle = (colorId: number) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    )
  }

  const handleSizeStockChange = (sizeId: number, stock: number) => {
    setSelectedSizes(prev => {
      const existing = prev.find(s => s.sizeId === sizeId)
      if (existing) {
        if (stock === 0) {
          return prev.filter(s => s.sizeId !== sizeId)
        }
        return prev.map(s => s.sizeId === sizeId ? { ...s, stock } : s)
      } else if (stock > 0) {
        return [...prev, { sizeId, stock }]
      }
      return prev
    })
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading product data..." />
  }

  if (loadError) {
    return (
      <ErrorAlert
        title="Loading Error"
        message={loadError}
        onRetry={() => window.location.reload()}
      />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="e.g., Elegant Rose Gold Heels"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brand Selection */}
      <div>
        <label htmlFor="brandId" className="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <select
          id="brandId"
          name="brandId"
          value={formData.brandId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">Select brand (optional)</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
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
          placeholder="Product description"
        />
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Original Price
          </label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            Weight (grams)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
          Material
        </label>
        <input
          type="text"
          id="material"
          name="material"
          value={formData.material}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="e.g., Leather, Canvas, Synthetic"
        />
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Colors
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map(color => (
            <label key={color.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedColors.includes(color.id)}
                onChange={() => handleColorToggle(color.id)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hexCode }}
                />
                <span className="text-sm">{color.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes & Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sizes & Stock
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {sizes.map(size => (
            <div key={size.id} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Size {size.value}
              </label>
              <input
                type="number"
                min="0"
                placeholder="Stock"
                value={selectedSizes.find(s => s.sizeId === size.id)?.stock || ''}
                onChange={(e) => handleSizeStockChange(size.id, parseInt(e.target.value) || 0)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Status Flags */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isNew"
            name="isNew"
            checked={formData.isNew}
            onChange={handleChange}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="isNew" className="ml-2 block text-sm text-gray-700">
            Mark as New Product
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isOnSale"
            name="isOnSale"
            checked={formData.isOnSale}
            onChange={handleChange}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="isOnSale" className="ml-2 block text-sm text-gray-700">
            Mark as On Sale
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active (Visible to customers)
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Link
          href="/admin/products"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  )
}
