'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Pagination from '../../../components/Pagination'
import ProductActions from './ProductActions'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
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
  images: Array<{
    id: number
    url: string
    altText: string
    isPrimary: boolean
  }>
  colors: Array<{
    id: number
    color: {
      id: number
      name: string
      hexCode: string
    }
  }>
  sizes: Array<{
    id: number
    stock: number
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
  }, [currentPage, selectedCategory, selectedStatus, debouncedSearchTerm, sortBy])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [selectedCategory, selectedStatus, debouncedSearchTerm, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedCategory('All')
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {(debouncedSearchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {debouncedSearchTerm || selectedCategory !== 'All' || selectedStatus !== 'All'
                    ? 'Try adjusting your filters to find products.'
                    : 'Get started by adding your first product.'
                  }
                </p>
                <div className="mt-6">
                  {debouncedSearchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' ? (
                    <button
                      onClick={handleClearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-pink-600 bg-pink-50 hover:bg-pink-100"
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <Link
                      href="/admin/products/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
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
                  {products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Product Image */}
                      <div className="relative aspect-square">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].url}
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
                          <p className="text-sm text-gray-500">{product.category.name}</p>
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
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>
                            {product.colors.length} color{product.colors.length !== 1 ? 's' : ''}
                          </span>
                          <span>
                            {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}
                          </span>
                          <span>
                            Stock: {product.sizes.reduce((total, size) => total + size.stock, 0)}
                          </span>
                        </div>

                        {/* Actions */}
                        <ProductActions product={product} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
              {viewMode === 'table' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12">
                                {product.images[0] ? (
                                  <Image
                                    className="h-12 w-12 rounded-lg object-cover"
                                    src={product.images[0].url}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                  />
                                ) : (
                                  <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                  {product.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {product.isNew && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                      NEW
                                    </span>
                                  )}
                                  {product.isOnSale && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                      SALE
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.category.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>
                              <div className="font-medium">
                                Rp {product.price.toLocaleString('id-ID')}
                              </div>
                              {product.originalPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  Rp {product.originalPrice.toLocaleString('id-ID')}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>
                              <div className="font-medium">
                                {product.sizes.reduce((total, size) => total + size.stock, 0)} units
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.colors.length} colors, {product.sizes.length} sizes
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <ProductActions product={product} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
