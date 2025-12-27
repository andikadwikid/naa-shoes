'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SizeTemplateActions from './SizeTemplateActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface SizeTemplateItem {
  id: number
  centimeters: number
  size: {
    id: number
    value: number
  }
}

interface SizeTemplate {
  id: number
  name: string
  description?: string
  category?: string
  isActive: boolean
  isDefault: boolean
  createdAt: string
  sizeTemplateItems?: SizeTemplateItem[]
}

export default function SizeTemplatesPage() {
  const [sizeTemplates, setSizeTemplates] = useState<SizeTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchSizeTemplates = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/size-templates?include=items')
      if (response.ok) {
        const data = await response.json()
        setSizeTemplates(data)
      } else {
        setError('Failed to fetch size templates')
      }
    } catch (error) {
      console.error('Error fetching size templates:', error)
      setError('Error loading size templates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSizeTemplates()
  }, [])

  const handleRefresh = () => {
    fetchSizeTemplates()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
        <span className="ml-2 text-gray-600">Loading size templates...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
        <button 
          onClick={handleRefresh}
          className="ml-2 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Size Templates</h1>
          <p className="text-gray-600">Manage size guide templates for different shoe types</p>
        </div>
        <Link
          href="/admin/master/size-templates/create"
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Template
        </Link>
      </div>

      {/* Templates List */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100/50 overflow-hidden">
        {sizeTemplates.length === 0 ? (
          <div className="text-center py-16 px-6">
            <div className="text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No size templates</h3>
              <p className="text-gray-600 mb-8">Get started by creating your first size template.</p>
              <Link
                href="/admin/master/size-templates/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Add Template
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-b border-pink-100/70 hover:bg-gradient-to-r hover:from-pink-50/70 hover:to-purple-50/70">
                  <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Template</TableHead>
                  <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Category</TableHead>
                  <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Size Range</TableHead>
                  <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm">Status</TableHead>
                  <TableHead className="text-gray-700 font-semibold px-6 py-4 text-sm text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeTemplates.map((template, index) => (
                  <TableRow
                    key={template.id}
                    className={`
                      border-b border-gray-100/50 transition-all duration-200
                      hover:bg-gradient-to-r hover:from-pink-50/30 hover:to-purple-50/30
                      hover:shadow-sm group
                      ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}
                    `}
                  >
                    <TableCell className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold text-gray-900 text-base">
                            {template.name}
                          </div>
                          {template.isDefault && (
                            <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200 font-medium px-3 py-1 rounded-full shadow-sm">
                              Default
                            </Badge>
                          )}
                        </div>
                        {template.description && (
                          <div className="text-gray-600 text-sm leading-relaxed max-w-md">
                            {template.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {template.category ? (
                        <Badge className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/70 font-medium px-3 py-1.5 rounded-full shadow-sm">
                          {template.category}
                        </Badge>
                      ) : (
                        <span className="text-gray-500 font-medium">All categories</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      {template.sizeTemplateItems && template.sizeTemplateItems.length > 0 ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900">
                            {template.sizeTemplateItems.length} sizes
                          </div>
                          <div className="text-sm text-gray-500 bg-gray-100/60 px-2 py-1 rounded-md inline-block">
                            {Math.min(...template.sizeTemplateItems.map(item => item.size.value))} - {Math.max(...template.sizeTemplateItems.map(item => item.size.value))}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">No sizes configured</span>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-5">
                      <Badge
                        className={`
                          font-medium px-3 py-1.5 rounded-full shadow-sm
                          ${template.isActive
                            ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-emerald-200'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                          }
                        `}
                      >
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-5 text-right">
                      <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                        <SizeTemplateActions template={template} onUpdate={handleRefresh} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
