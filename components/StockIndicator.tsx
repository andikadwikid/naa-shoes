'use client'

import { Package, AlertTriangle, CheckCircle } from 'lucide-react'
import { ColorStock } from '../types/product'

interface StockIndicatorProps {
  colorStock: ColorStock[]
  selectedColor?: string
  size?: 'sm' | 'md' | 'lg'
  showAllColors?: boolean
}

export default function StockIndicator({ 
  colorStock, 
  selectedColor, 
  size = 'sm',
  showAllColors = false 
}: StockIndicatorProps) {
  if (!colorStock || colorStock.length === 0) {
    return null
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: 'out-of-stock', label: 'Habis', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
    if (stock <= 5) return { status: 'low-stock', label: `Sisa ${stock}`, color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' }
    return { status: 'in-stock', label: `Stok ${stock}`, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  }

  const getStockIcon = (stock: number) => {
    if (stock === 0) return <AlertTriangle className="h-3 w-3" />
    if (stock <= 5) return <Package className="h-3 w-3" />
    return <CheckCircle className="h-3 w-3" />
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }

  // If we have a selected color, show only that color's stock
  if (selectedColor && !showAllColors) {
    const colorData = colorStock.find(cs => cs.color.toLowerCase() === selectedColor.toLowerCase())
    if (!colorData) return null

    const stockInfo = getStockStatus(colorData.stock)
    
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full border ${stockInfo.bgColor} ${stockInfo.borderColor} ${stockInfo.color} ${sizeClasses[size]}`}>
        {getStockIcon(colorData.stock)}
        <span className="font-medium">{stockInfo.label}</span>
      </div>
    )
  }

  // Show all colors stock (for admin or detailed view)
  if (showAllColors) {
    return (
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-700">Stock per Warna:</h5>
        <div className="space-y-1">
          {colorStock.map((cs) => {
            const stockInfo = getStockStatus(cs.stock)
            return (
              <div key={cs.color} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cs.color}</span>
                <div className={`inline-flex items-center gap-1 rounded-full border ${stockInfo.bgColor} ${stockInfo.borderColor} ${stockInfo.color} ${sizeClasses.sm}`}>
                  {getStockIcon(cs.stock)}
                  <span className="font-medium">{stockInfo.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Default: show general stock indicator
  const totalStock = colorStock.reduce((sum, cs) => sum + cs.stock, 0)
  const lowStockColors = colorStock.filter(cs => cs.stock > 0 && cs.stock <= 5).length
  const outOfStockColors = colorStock.filter(cs => cs.stock === 0).length

  let indicator = null
  if (totalStock === 0) {
    indicator = (
      <div className={`inline-flex items-center gap-1.5 rounded-full border bg-red-50 border-red-200 text-red-600 ${sizeClasses[size]}`}>
        <AlertTriangle className="h-3 w-3" />
        <span className="font-medium">Habis</span>
      </div>
    )
  } else if (lowStockColors > 0 || outOfStockColors > 0) {
    indicator = (
      <div className={`inline-flex items-center gap-1.5 rounded-full border bg-orange-50 border-orange-200 text-orange-600 ${sizeClasses[size]}`}>
        <Package className="h-3 w-3" />
        <span className="font-medium">Stok Terbatas</span>
      </div>
    )
  } else {
    indicator = (
      <div className={`inline-flex items-center gap-1.5 rounded-full border bg-green-50 border-green-200 text-green-600 ${sizeClasses[size]}`}>
        <CheckCircle className="h-3 w-3" />
        <span className="font-medium">Tersedia</span>
      </div>
    )
  }

  return indicator
}
