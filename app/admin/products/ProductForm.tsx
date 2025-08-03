'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorAlert from '../components/ErrorAlert'
import ThumbnailUpload from '../components/ThumbnailUpload'
import GalleryUpload from '../components/GalleryUpload'

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

interface GalleryImage {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
  altText?: string
  caption?: string
}

// New inventory structure for color-size-stock combination
interface ProductInventoryItem {
  colorId: number
  sizeId: number
  stock: number
}

interface ProductFormProps {
  product?: {
    id: number
    name: string
    description?: string | null
    price: number
    originalPrice?: number | null
    thumbnailUrl?: string | null
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
  const [sizeTemplates, setSizeTemplates] = useState<any[]>([])
  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [productInventories, setProductInventories] = useState<ProductInventoryItem[]>([])
  const [selectedSizeGuides, setSelectedSizeGuides] = useState<{sizeId: number, centimeters: number}[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(product?.thumbnailUrl || null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
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
        const [categoriesRes, brandsRes, colorsRes, sizesRes, templatesRes] = await Promise.all([
          fetch('/api/admin/categories'),
          fetch('/api/admin/brands'),
          fetch('/api/admin/colors'),
          fetch('/api/admin/sizes'),
          fetch('/api/admin/size-templates?include=items')
        ])

        if (!categoriesRes.ok || !brandsRes.ok || !colorsRes.ok || !sizesRes.ok) {
          throw new Error('Failed to load master data')
        }

        const [categoriesData, brandsData, colorsData, sizesData, templatesData] = await Promise.all([
          categoriesRes.json(),
          brandsRes.json(),
          colorsRes.json(),
          sizesRes.json(),
          templatesRes.ok ? templatesRes.json() : []
        ])

        setCategories(categoriesData)
        setBrands(brandsData)
        setColors(colorsData)
        setSizes(sizesData)
        setSizeTemplates(templatesData)

        // Load existing product data if in edit mode
        if (product?.id) {
          const response = await fetch(`/api/admin/products/${product.id}`)
          if (response.ok) {
            const productData = await response.json()

            // Set existing inventories (color-size-stock combinations)
            if (productData.productInventories) {
              setProductInventories(productData.productInventories.map((pi: any) => ({
                colorId: pi.colorId,
                sizeId: pi.sizeId,
                stock: pi.stock
              })))

              // Extract unique colors and sizes
              const uniqueColors = [...new Set(productData.productInventories.map((pi: any) => pi.colorId))] as number[]
              const uniqueSizes = [...new Set(productData.productInventories.map((pi: any) => pi.sizeId))] as number[]
              setSelectedColors(uniqueColors)
              setSelectedSizes(uniqueSizes)
            }

            // Set existing size guides
            if (productData.sizeGuides) {
              setSelectedSizeGuides(productData.sizeGuides.map((sg: any) => ({
                sizeId: sg.sizeId,
                centimeters: sg.centimeters
              })))
            }

            // Set existing thumbnail
            if (productData.thumbnailUrl) {
              setThumbnailUrl(productData.thumbnailUrl)
            }

            // Set existing gallery images
            if (productData.galleryImages) {
              const existingGallery = productData.galleryImages.map((img: any) => ({
                url: img.url,
                filename: img.url.split('/').pop() || '',
                originalName: img.altText || 'Gallery image',
                size: 0,
                type: 'image/jpeg',
                altText: img.altText,
                caption: img.caption
              }))
              setGalleryImages(existingGallery)
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
        thumbnailUrl,
        productInventories,
        sizeGuides: selectedSizeGuides,
        galleryImages: galleryImages.map(img => ({
          url: img.url,
          altText: img.altText || formData.name,
          caption: img.caption || null
        }))
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
    setSelectedColors(prev => {
      const isSelected = prev.includes(colorId)
      if (isSelected) {
        // Remove color and all its inventory entries
        setProductInventories(prevInventories => 
          prevInventories.filter(pi => pi.colorId !== colorId)
        )
        return prev.filter(id => id !== colorId)
      } else {
        // Add color and create inventory entries for all selected sizes
        const newInventories: ProductInventoryItem[] = selectedSizes.map(sizeId => ({
          colorId,
          sizeId,
          stock: 0
        }))
        setProductInventories(prev => [...prev, ...newInventories])
        return [...prev, colorId]
      }
    })
  }

  const handleSizeToggle = (sizeId: number) => {
    setSelectedSizes(prev => {
      const isSelected = prev.includes(sizeId)
      if (isSelected) {
        // Remove size and all its inventory entries
        setProductInventories(prevInventories => 
          prevInventories.filter(pi => pi.sizeId !== sizeId)
        )
        return prev.filter(id => id !== sizeId)
      } else {
        // Add size and create inventory entries for all selected colors
        const newInventories: ProductInventoryItem[] = selectedColors.map(colorId => ({
          colorId,
          sizeId,
          stock: 0
        }))
        setProductInventories(prev => [...prev, ...newInventories])
        return [...prev, sizeId]
      }
    })
  }

  const handleInventoryStockChange = (colorId: number, sizeId: number, stock: number) => {
    setProductInventories(prev => {
      const existing = prev.find(pi => pi.colorId === colorId && pi.sizeId === sizeId)
      if (existing) {
        return prev.map(pi => 
          pi.colorId === colorId && pi.sizeId === sizeId 
            ? { ...pi, stock } 
            : pi
        )
      } else {
        return [...prev, { colorId, sizeId, stock }]
      }
    })
  }

  const handleSizeGuideChange = (sizeId: number, centimeters: number) => {
    setSelectedSizeGuides(prev => {
      const existing = prev.find(sg => sg.sizeId === sizeId)
      if (existing) {
        if (centimeters === 0) {
          return prev.filter(sg => sg.sizeId !== sizeId)
        }
        return prev.map(sg => sg.sizeId === sizeId ? { ...sg, centimeters } : sg)
      } else if (centimeters > 0) {
        return [...prev, { sizeId, centimeters }]
      }
      return prev
    })
  }

  // Database template functions
  const calculateStandardSizeGuide = (euSize: number): number => {
    // Standard EU formula: (EU Size - 2) ÷ 1.5
    return parseFloat(((euSize - 2) / 1.5).toFixed(1))
  }

  const handleApplyDatabaseTemplate = (templateId: number) => {
    const template = sizeTemplates.find(t => t.id === templateId)
    if (!template || !template.sizeTemplateItems) return

    const newSizeGuides: {sizeId: number, centimeters: number}[] = []

    selectedSizes.forEach(sizeId => {
      const templateItem = template.sizeTemplateItems.find((item: any) => item.sizeId === sizeId)
      if (templateItem) {
        newSizeGuides.push({
          sizeId,
          centimeters: templateItem.centimeters
        })
      }
    })

    setSelectedSizeGuides(newSizeGuides)
    console.log(`✅ Applied "${template.name}" template to ${newSizeGuides.length} sizes`)
  }

  const handleApplyDefaultTemplate = () => {
    const defaultTemplate = sizeTemplates.find(t => t.isDefault)
    if (defaultTemplate) {
      handleApplyDatabaseTemplate(defaultTemplate.id)
    } else {
      // Fallback to standard calculation if no default template
      const newSizeGuides: {sizeId: number, centimeters: number}[] = []
      selectedSizes.forEach(sizeId => {
        const size = sizes.find(s => s.id === sizeId)
        if (size) {
          const centimeters = calculateStandardSizeGuide(size.value)
          newSizeGuides.push({ sizeId, centimeters })
        }
      })
      setSelectedSizeGuides(newSizeGuides)
      console.log(`✅ Applied standard formula to ${newSizeGuides.length} sizes`)
    }
  }

  const handleClearSizeGuides = () => {
    setSelectedSizeGuides([])
  }

  const getInventoryStock = (colorId: number, sizeId: number) => {
    const inventory = productInventories.find(pi => pi.colorId === colorId && pi.sizeId === sizeId)
    return inventory?.stock || 0
  }

  const getTotalStockForColor = (colorId: number) => {
    return productInventories
      .filter(pi => pi.colorId === colorId)
      .reduce((total, pi) => total + pi.stock, 0)
  }

  const getTotalStockForSize = (sizeId: number) => {
    return productInventories
      .filter(pi => pi.sizeId === sizeId)
      .reduce((total, pi) => total + pi.stock, 0)
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

      {/* Product Thumbnail */}
      <div>
        <ThumbnailUpload
          thumbnailUrl={thumbnailUrl}
          onChange={setThumbnailUrl}
          productName={formData.name}
        />
      </div>

      {/* Product Gallery */}
      <div>
        <GalleryUpload
          images={galleryImages}
          onChange={setGalleryImages}
          maxImages={8}
          productName={formData.name}
        />
      </div>

      {/* Colors Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Colors
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map(color => {
            const isSelected = selectedColors.includes(color.id)
            const totalStock = getTotalStockForColor(color.id)

            return (
              <div key={color.id} className="border border-gray-200 rounded-lg p-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleColorToggle(color.id)}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <span className="text-sm font-medium">{color.name}</span>
                  </div>
                </label>
                {isSelected && (
                  <div className="mt-1 text-xs text-gray-500">
                    Total stock: {totalStock}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sizes Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Sizes
        </label>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {sizes.map(size => {
            const isSelected = selectedSizes.includes(size.id)
            const totalStock = getTotalStockForSize(size.id)

            return (
              <div key={size.id} className="border border-gray-200 rounded-lg p-2 text-center">
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSizeToggle(size.id)}
                    className="sr-only"
                  />
                  <div className={`text-sm font-medium py-1 rounded ${
                    isSelected 
                      ? 'bg-pink-100 text-pink-700 border-pink-300' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    {size.value}
                  </div>
                </label>
                {isSelected && (
                  <div className="text-xs text-gray-500 mt-1">
                    Stock: {totalStock}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Inventory Matrix (Color x Size x Stock) */}
      {selectedColors.length > 0 && selectedSizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Inventory Management (Stock per Color-Size Combination)
          </label>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Color / Size
                  </th>
                  {selectedSizes.map(sizeId => {
                    const size = sizes.find(s => s.id === sizeId)
                    return (
                      <th key={sizeId} className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        {size?.value}
                      </th>
                    )
                  })}
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedColors.map(colorId => {
                  const color = colors.find(c => c.id === colorId)
                  const totalForColor = getTotalStockForColor(colorId)
                  
                  return (
                    <tr key={colorId}>
                      <td className="px-4 py-2 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color?.hexCode }}
                          />
                          <span className="text-sm font-medium">{color?.name}</span>
                        </div>
                      </td>
                      {selectedSizes.map(sizeId => (
                        <td key={`${colorId}-${sizeId}`} className="px-3 py-2 text-center border-r border-gray-200">
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={getInventoryStock(colorId, sizeId) || ''}
                            onChange={(e) => handleInventoryStockChange(colorId, sizeId, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2 text-center text-sm font-medium text-gray-700">
                        {totalForColor}
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200">
                    Total
                  </td>
                  {selectedSizes.map(sizeId => (
                    <td key={sizeId} className="px-3 py-2 text-center text-sm text-gray-700 border-r border-gray-200">
                      {getTotalStockForSize(sizeId)}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center text-sm font-bold text-gray-700">
                    {productInventories.reduce((total, pi) => total + pi.stock, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Size Guides with Templates */}
      {selectedSizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Size Guide (Foot Length in Centimeters)
              </label>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">
                  {selectedSizeGuides.filter(sg => sg.centimeters > 0).length} / {selectedSizes.length} configured
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{
                      width: `${selectedSizes.length > 0 ? (selectedSizeGuides.filter(sg => sg.centimeters > 0).length / selectedSizes.length) * 100 : 0}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Template Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleApplyDatabaseTemplate(parseInt(e.target.value))
                    e.target.value = '' // Reset select
                  }
                }}
                className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                title="Choose a template to auto-fill size guides"
              >
                <option value="">📐 Choose Template</option>
                {sizeTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.isDefault ? '⭐ ' : ''}{template.name}
                    {template.category ? ` (${template.category})` : ''}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleApplyDefaultTemplate}
                className="text-xs px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors font-medium"
                title="Quick apply default template"
              >
                ⚡ Apply Default
              </button>

              <button
                type="button"
                onClick={handleClearSizeGuides}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                title="Clear all size guide values"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          {/* Size Guide Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {selectedSizes.map(sizeId => {
              const size = sizes.find(s => s.id === sizeId)
              const guideValue = selectedSizeGuides.find(sg => sg.sizeId === sizeId)?.centimeters || 0

              return (
                <div key={sizeId} className="border border-gray-200 rounded-lg p-3 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size {size?.value}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="0.0"
                    value={guideValue || ''}
                    onChange={(e) => handleSizeGuideChange(sizeId, parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <div className="text-xs text-gray-500 mt-1">cm</div>

                  {/* Quick preset buttons for individual sizes */}
                  <div className="flex gap-1 mt-2">
                    <button
                      type="button"
                      onClick={() => handleSizeGuideChange(sizeId, calculateStandardSizeGuide(size?.value || 0))}
                      className="text-xs px-1 py-0.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                      title="Apply standard formula"
                    >
                      Std
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSizeGuideChange(sizeId, 0)}
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

          {/* Smart Suggestions & Template Info */}
          <div className="mt-4 space-y-3">
            {/* Smart Suggestions based on Category */}
            {formData.categoryId && (
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="text-sm font-medium text-green-900 mb-1">💡 Smart Suggestion:</h4>
                <p className="text-xs text-green-800">
                  {(() => {
                    const category = categories.find(c => c.id.toString() === formData.categoryId)?.name.toLowerCase()
                    if (category?.includes('heel') || category?.includes('high')) {
                      return 'For high heels, consider using "High Heels" template (slightly smaller for better fit)'
                    } else if (category?.includes('sneaker') || category?.includes('sport')) {
                      return 'For sneakers, use "Sneakers" template (slightly larger for comfort during activities)'
                    } else if (category?.includes('boot')) {
                      return 'For boots, "Boots" template works well (standard sizing with ankle support)'
                    } else if (category?.includes('flat')) {
                      return 'For flats, "Standard EU" or "Narrow Fit" templates usually work best'
                    }
                    return 'Based on your category, "Standard EU" template is recommended as starting point'
                  })()}
                </p>
              </div>
            )}

            {/* Template Info */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">📏 Size Guide Templates:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
                <div>
                  <strong>📏 Standard EU:</strong> (Size - 2) ÷ 1.5 <br/>
                  <strong>👠 Narrow Fit:</strong> Standard - 0.2cm <br/>
                  <strong>👟 Wide Fit:</strong> Standard + 0.3cm
                </div>
                <div>
                  <strong>💃 High Heels:</strong> Standard - 0.1cm <br/>
                  <strong>🏃 Sneakers:</strong> Standard + 0.2cm <br/>
                  <strong>🥾 Boots:</strong> Standard sizing
                </div>
              </div>
              <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-900">
                <strong>🎯 Pro Tip:</strong> Start with a template, then fine-tune individual sizes.
                Most customers measure 0.5-1cm longer than their actual foot length for comfort.
                <br/>
                <strong>Example:</strong> Size 38 Standard = (38 - 2) ÷ 1.5 = 24.0 cm
              </div>
            </div>
          </div>
        </div>
      )}

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
