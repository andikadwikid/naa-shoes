'use client'

import { useState, useEffect, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { getProducts, categories } from '../services/products'
import { Product } from '../types/product'

export default function ProductsPageWithUseMemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [currentPage, setCurrentPage] = useState(1)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const itemsPerPage = 12

  // Fetch all products once
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true)
      try {
        const products = await getProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAllProducts()
  }, [])

  // Client-side filtering and sorting with useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search
    if (searchTerm) {
      const lowercaseQuery = searchTerm.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return b.id - a.id
        default:
          return 0
      }
    })

    return filtered
  }, [allProducts, selectedCategory, searchTerm, sortBy])

  // Pagination calculation with useMemo
  const paginationData = useMemo(() => {
    const totalItems = filteredAndSortedProducts.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

    return {
      products: currentProducts,
      totalPages,
      totalItems,
      startIndex,
      endIndex
    }
  }, [filteredAndSortedProducts, currentPage, itemsPerPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm, sortBy])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      {/* ... rest of JSX stays the same ... */}
      
      {/* Products Grid */}
      {!loading && paginationData.products.length > 0 && (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {paginationData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={paginationData.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  )
}
