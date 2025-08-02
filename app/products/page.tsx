'use client'

import { useState, useEffect, useMemo } from 'react'
import ProductCard from '../../components/ProductCard'
import Pagination from '../../components/Pagination'
import { getPaginatedProducts, getCategories } from '../../services/api-products'
import { Product } from '../../types/product'
import type { PaginatedResponse } from '../../services/api-products'

const metadata = {
  title: "Koleksi Sepatu Wanita Terlengkap - Sneakers, Heels, Boots | NAA Shoes",
  description: "Jelajahi koleksi sepatu wanita terlengkap dengan kualitas terbaik. Sneakers, high heels, boots, flats, sandals dengan harga terjangkau. Gratis ongkir & garansi kualitas.",
  keywords: ["sepatu wanita", "sneakers", "high heels", "boots", "flats", "sandals", "sepatu online", "fashion", "footwear"],
  openGraph: {
    title: "Koleksi Sepatu Wanita Terlengkap | NAA Shoes",
    description: "Jelajahi koleksi sepatu wanita terlengkap dengan kualitas terbaik",
    url: "https://naashoes.com/products",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Koleksi Sepatu Wanita NAA Shoes",
      },
    ],
  },
  alternates: {
    canonical: "https://naashoes.com/products",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Koleksi Sepatu Wanita",
  "description": "Koleksi sepatu wanita terlengkap dengan berbagai kategori dan style",
  "url": "https://naashoes.com/products",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Sepatu Wanita",
    "numberOfItems": 25
  }
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://naashoes.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://naashoes.com/products"
    }
  ]
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Product> | null>(null)
  const [categories, setCategories] = useState<string[]>(['All'])

  const itemsPerPage = 12

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await getCategories()
        setCategories(categoryList)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    loadCategories()
  }, [])

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await getPaginatedProducts({
          page: currentPage,
          limit: itemsPerPage,
          category: selectedCategory,
          search: searchTerm,
          sortBy
        })
        setPaginatedData(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, selectedCategory, searchTerm, sortBy])

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [selectedCategory, searchTerm, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Smooth scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setCurrentPage(1)
  }

  const products = paginatedData?.data || []
  const pagination = paginatedData?.pagination

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              All Products
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Temukan sepatu impian Anda dari koleksi lengkap kami
            </p>
          </header>

          {/* Filters and Search */}
          <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8" aria-labelledby="filters-heading">
            <h2 id="filters-heading" className="sr-only">Product filters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Cari nama sepatu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent touch-manipulation"
                    aria-describedby="search-description"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p id="search-description" className="sr-only">Search for shoes by name or description</p>
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
                  className="w-full px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent touch-manipulation"
                  aria-describedby="category-description"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <p id="category-description" className="sr-only">Filter products by category</p>
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
                  className="w-full px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent touch-manipulation"
                  aria-describedby="sort-description"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest First</option>
                </select>
                <p id="sort-description" className="sr-only">Sort products by different criteria</p>
              </div>
            </div>
          </section>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div className="text-sm sm:text-base text-gray-600">
              {pagination && (
                <p className="mb-1 sm:mb-0">
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-{Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} of {pagination.totalItems} products
                </p>
              )}
              {(searchTerm || selectedCategory !== 'All') && (
                <p className="text-xs sm:text-sm">
                  {searchTerm && (
                    <span>
                      for "<span className="font-semibold text-pink-600">{searchTerm}</span>"
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span className={searchTerm ? 'ml-1' : ''}>
                      {searchTerm && 'in '}
                      <span className="font-semibold text-pink-600">{selectedCategory}</span>
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="self-start sm:self-auto text-pink-600 hover:text-pink-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-pink-50 transition-colors touch-manipulation"
                aria-label="Clear all applied filters"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12" role="status" aria-live="polite">
              <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Loading products...</span>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <section aria-labelledby="products-heading">
              <h2 id="products-heading" className="sr-only">Products List</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list">
                {products.map((product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <nav className="mt-12" aria-label="Products pagination">
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
                </nav>
              )}
            </section>
          )}

          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 className="text-lg font-medium text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  aria-label="Clear all filters to see all products"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
