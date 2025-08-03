'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../../components/Pagination'
import ProductActions from './ProductActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  thumbnailUrl?: string
  isOnSale: boolean
  isNew: boolean
  isActive: boolean
  category: {
    id: number
    name: string
  }
  brand?: {
    id: number
    name: string
    slug: string
  }
  galleryImages: Array<{
    id: number
    url: string
    altText: string
    caption?: string
    displayOrder: number
  }>
  // New ProductInventory structure
  productInventories: Array<{
    id: number
    stock: number
    colorId: number
    sizeId: number
    color: {
      id: number
      name: string
      hexCode?: string
    }
    size: {
      id: number
      value: number
    }
  }>
  sizeGuides?: Array<{
    id: number
    centimeters: number
    size: {
      id: number
      value: number
    }
  }>
}

interface PaginatedResponse {
  data: Product[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    limit: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Helper functions to work with ProductInventory data
const getUniqueColors = (productInventories: Product['productInventories']) => {
  if (!productInventories) return []
  const uniqueColors = new Map()
  productInventories.forEach(inv => {
    if (!uniqueColors.has(inv.color.name)) {
      uniqueColors.set(inv.color.name, inv.color)
    }
  })
  return Array.from(uniqueColors.values())
}

const getUniqueSizes = (productInventories: Product['productInventories']) => {
  if (!productInventories) return []
  const uniqueSizes = new Map()
  productInventories.forEach(inv => {
    if (!uniqueSizes.has(inv.size.value)) {
      uniqueSizes.set(inv.size.value, inv.size)
    }
  })
  return Array.from(uniqueSizes.values()).sort((a, b) => a.value - b.value)
}

const getTotalStock = (productInventories: Product['productInventories']) => {
  if (!productInventories) return 0
  return productInventories.reduce((total, inv) => total + inv.stock, 0)
}

const getColorStock = (productInventories: Product['productInventories']) => {
  if (!productInventories) return 0
  const colorTotals = new Map()
  productInventories.forEach(inv => {
    const current = colorTotals.get(inv.color.name) || 0
    colorTotals.set(inv.color.name, current + inv.stock)
  })
  return Array.from(colorTotals.values()).reduce((total, stock) => total + stock, 0)
}

export default function AdminProductsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse | null>(null)
  const [categories, setCategories] = useState<string[]>(['All'])
  const [brands, setBrands] = useState<string[]>(['All'])
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const itemsPerPage = 12

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Load categories and brands on mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/brands')
        ])

        if (categoriesRes.ok) {
          const categoryList = await categoriesRes.json()
          const categoryNames = categoryList.map((cat: any) => cat.name)
          setCategories(['All', ...categoryNames])
        }

        if (brandsRes.ok) {
          const brandList = await brandsRes.json()
          const brandNames = brandList.map((brand: any) => brand.name)
          setBrands(['All', ...brandNames])
        }
      } catch (error) {
        console.error('Error loading filters:', error)
      }
    }

    loadFilters()
  }, [])

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          sortBy
        })

        if (debouncedSearchTerm) {
          params.append('search', debouncedSearchTerm)
        }
        if (selectedCategory !== 'All') {
          params.append('category', selectedCategory)
        }
        if (selectedBrand !== 'All') {
          params.append('brand', selectedBrand)
        }
        if (selectedStatus !== 'All') {
          params.append('status', selectedStatus)
        }

        const response = await fetch(`/api/admin/products?${params}`)
        if (response.ok) {
          const data = await response.json()
          setPaginatedData(data)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, selectedCategory, selectedBrand, selectedStatus, debouncedSearchTerm, sortBy])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [selectedCategory, selectedBrand, selectedStatus, debouncedSearchTerm, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedCategory('All')
    setSelectedBrand('All')
    setSelectedStatus('All')
    setCurrentPage(1)
  }

  const products = paginatedData?.data || []
  const pagination = paginatedData?.pagination

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your store products</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Table view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Link
            href="/admin/products/create"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2 lg:col-span-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Sale">On Sale</option>
              <option value="New">New</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results Summary and Clear Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {pagination && (
              <p>
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-{Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} of {pagination.totalItems} products
              </p>
            )}
          </div>

          {(debouncedSearchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={handleClearFilters}
              className="self-start sm:self-auto text-pink-600 hover:text-pink-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading products...</span>
          </div>
        </div>
      )}

      {/* Products Display */}
      {!loading && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100/50 overflow-hidden">
          {products.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-8">
                  {debouncedSearchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedStatus !== 'All'
                    ? 'Try adjusting your filters to find products.'
                    : 'Get started by adding your first product.'
                  }
                </p>
                <div>
                  {debouncedSearchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedStatus !== 'All' ? (
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <Link
                      href="/admin/products/create"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Add Product
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                  {products.map((product) => {
                    const uniqueColors = getUniqueColors(product.productInventories)
                    const uniqueSizes = getUniqueSizes(product.productInventories)
                    const totalStock = getTotalStock(product.productInventories)
                    const colorStock = getColorStock(product.productInventories)
                    
                    return (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Product Image */}
                        <div className="relative aspect-square">
                          {product.thumbnailUrl || (product.galleryImages && product.galleryImages.length > 0) ? (
                            <Image
                              src={product.thumbnailUrl || product.galleryImages[0]?.url || '/placeholder-product.svg'}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}

                          {/* Status Badges */}
                          <div className="absolute top-2 left-2 right-2 flex justify-between">
                            <div className="flex gap-1">
                              {product.isNew && (
                                <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  NEW
                                </span>
                              )}
                              {product.isOnSale && (
                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  SALE
                                </span>
                              )}
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <div className="mb-2">
                            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{product.category.name}</span>
                              {product.brand && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {product.brand.name}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-gray-900">
                                Rp {product.price.toLocaleString('id-ID')}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  Rp {product.originalPrice.toLocaleString('id-ID')}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Stock Info */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>
                                {uniqueColors.length} color{uniqueColors.length !== 1 ? 's' : ''}
                              </span>
                              <span>
                                {uniqueSizes.length} size{uniqueSizes.length !== 1 ? 's' : ''}
                              </span>
                              <span>
                                Total Stock: {totalStock}
                              </span>
                            </div>

                            {/* Inventory Summary */}
                            <div className="text-xs">
                              <span className="text-gray-600">Inventory Entries: </span>
                              <span className="text-gray-800">
                                {product.productInventories?.length || 0} combinations
                              </span>
                            </div>

                            {/* Size Guide Indicator */}
                            <div className="text-xs">
                              <span className="text-gray-600">Size Guide: </span>
                              <span className={`font-medium ${product.sizeGuides && product.sizeGuides.length > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                                {product.sizeGuides && product.sizeGuides.length > 0
                                  ? `${product.sizeGuides.length} sizes configured`
                                  : 'Not configured'
                                }
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <ProductActions product={product} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-b border-pink-100/70 hover:bg-gradient-to-r hover:from-pink-50/70 hover:to-purple-50/70">
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Product</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Category</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Brand</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Price</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Inventory</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Status</TableHead>
                        <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product, index) => {
                        const uniqueColors = getUniqueColors(product.productInventories)
                        const uniqueSizes = getUniqueSizes(product.productInventories)
                        const totalStock = getTotalStock(product.productInventories)

                        return (
                          <TableRow
                            key={product.id}
                            className={`
                              border-b border-gray-100/50 transition-all duration-200
                              hover:bg-gradient-to-r hover:from-pink-50/30 hover:to-purple-50/30
                              hover:shadow-sm group
                              ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}
                            `}
                          >
                            <TableCell className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                                  {product.thumbnailUrl || (product.galleryImages && product.galleryImages.length > 0) ? (
                                    <Image
                                      className="w-full h-full object-cover"
                                      src={product.thumbnailUrl || product.galleryImages[0]?.url || '/placeholder-product.svg'}
                                      alt={product.name}
                                      width={56}
                                      height={56}
                                    />
                                  ) : (
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-900 text-base max-w-xs truncate">
                                    {product.name}
                                  </div>
                                  <div className="flex gap-2">
                                    {product.isNew && (
                                      <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 px-2 py-1 text-xs">
                                        NEW
                                      </Badge>
                                    )}
                                    {product.isOnSale && (
                                      <Badge className="bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200 px-2 py-1 text-xs">
                                        SALE
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-5">
                              <Badge className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/70 font-medium px-3 py-1.5 rounded-full">
                                {product.category.name}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-6 py-5">
                              {product.brand ? (
                                <Badge className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200/70 font-medium px-3 py-1.5 rounded-full">
                                  {product.brand.name}
                                </Badge>
                              ) : (
                                <span className="text-gray-400 italic">No brand</span>
                              )}
                            </TableCell>
                            <TableCell className="px-6 py-5">
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900">
                                  Rp {product.price.toLocaleString('id-ID')}
                                </div>
                                {product.originalPrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    Rp {product.originalPrice.toLocaleString('id-ID')}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-5">
                              <div className="space-y-2">
                                <div className="font-semibold text-gray-900">
                                  Total: {totalStock} units
                                </div>
                                <div className="text-sm text-gray-600">
                                  {product.productInventories?.length || 0} inventory entries
                                </div>
                                <div className="text-sm text-gray-600">
                                  {uniqueColors.length} colors • {uniqueSizes.length} sizes
                                </div>
                                <div className="text-sm">
                                  <Badge className={`
                                    font-medium px-2 py-1 text-xs rounded-full
                                    ${product.sizeGuides && product.sizeGuides.length > 0
                                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
                                      : 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 border-orange-200'
                                    }
                                  `}>
                                    Size Guide: {product.sizeGuides && product.sizeGuides.length > 0 ? '✓ Configured' : '✗ Missing'}
                                  </Badge>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-5">
                              <Badge
                                className={`
                                  font-medium px-3 py-1.5 rounded-full shadow-sm
                                  ${product.isActive
                                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
                                    : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                                  }
                                `}
                              >
                                {product.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-6 py-5 text-right">
                              <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                                <ProductActions product={product} />
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />

                  {/* Page Info */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
