'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'
import ErrorAlert from './ErrorAlert'

interface Product {
  id: number
  name: string
  price: number
  category: {
    name: string
  }
  images: {
    url: string
    altText: string
  }[]
}

export default function RecentProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRecentProducts = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('/api/admin/products?limit=5&sortBy=newest')

        if (!response.ok) {
          throw new Error('Failed to load recent products')
        }

        const data = await response.json()
        // Handle new paginated response format
        setProducts(data.data || [])
      } catch (error) {
        console.error('Error loading recent products:', error)
        setError('Failed to load recent products')
      } finally {
        setIsLoading(false)
      }
    }

    loadRecentProducts()
  }, [])

  if (isLoading) {
    return <LoadingSpinner size="md" text="Loading recent products..." />
  }

  if (error) {
    return (
      <ErrorAlert 
        title="Products Error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
          <Link 
            href="/admin/products"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="p-6">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No products yet</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 relative">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText || product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 truncate block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-gray-500">{product.category.name}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
