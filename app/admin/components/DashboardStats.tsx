'use client'

import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'
import ErrorAlert from './ErrorAlert'

interface DashboardStatsData {
  totalProducts: number
  totalCategories: number
  totalColors: number
  totalSizes: number
  activeProducts: number
  inactiveProducts: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true)
      setError('')

      try {
        const [productsRes, categoriesRes, colorsRes, sizesRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/categories'),
          fetch('/api/admin/colors'),
          fetch('/api/admin/sizes')
        ])

        if (!productsRes.ok || !categoriesRes.ok || !colorsRes.ok || !sizesRes.ok) {
          throw new Error('Failed to load dashboard data')
        }

        const [products, categories, colors, sizes] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          colorsRes.json(),
          sizesRes.json()
        ])

        const activeProducts = products.filter((p: any) => p.isActive).length
        const inactiveProducts = products.length - activeProducts

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          totalColors: colors.length,
          totalSizes: sizes.length,
          activeProducts,
          inactiveProducts
        })
      } catch (error) {
        console.error('Error loading dashboard stats:', error)
        setError('Failed to load dashboard statistics')
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard statistics..." />
  }

  if (error) {
    return (
      <ErrorAlert 
        title="Dashboard Error"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!stats) {
    return null
  }

  const statItems = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'text-blue-600 bg-blue-100'
    },
    {
      name: 'Active Products',
      value: stats.activeProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-600 bg-green-100'
    },
    {
      name: 'Categories',
      value: stats.totalCategories,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'text-purple-600 bg-purple-100'
    },
    {
      name: 'Colors',
      value: stats.totalColors,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      color: 'text-pink-600 bg-pink-100'
    },
    {
      name: 'Sizes',
      value: stats.totalSizes,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m0 0V1m0 2h2m0 0V1m0 2h2m0 0V1m0 2h4a1 1 0 011 1v4M4 8h16M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8" />
        </svg>
      ),
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      name: 'Inactive Products',
      value: stats.inactiveProducts,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`inline-flex items-center justify-center p-3 rounded-md ${item.color}`}>
                  {item.icon}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {item.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
