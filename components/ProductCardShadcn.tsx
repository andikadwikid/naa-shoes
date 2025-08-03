'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { ProductCardProps } from '../types/ui'
import { formatCurrency } from '../lib/utils'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import AddToCartDialogShadcn from './AddToCartDialogShadcn'

export default function ProductCardShadcn({ product, className = '' }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getColorPreview = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'white': '#ffffff',
      'black': '#000000',
      'pink': '#ec4899',
      'rose gold': '#e11d48',
      'nude': '#d4a574',
      'coral': '#f97316',
      'silver': '#9ca3af',
      'gold': '#fbbf24',
      'brown': '#92400e',
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#10b981',
      'purple': '#8b5cf6',
      'yellow': '#eab308',
      'orange': '#f97316',
    }
    return colorMap[color.toLowerCase()] || '#9ca3af'
  }

  return (
    <>
      <Card className={`group h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-0 ${className}`}>
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden flex-shrink-0">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.thumbnailUrl || product.image || product.galleryImages?.[0]?.url || '/placeholder-product.svg'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Status Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                NEW
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                SALE
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-lg" asChild>
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Category & Rating */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide bg-gray-50 px-2 py-1 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="text-yellow-400">★★★★★</span>
              <span>(4.9)</span>
            </div>
          </div>

          {/* Product Name - Fixed height container */}
          <Link href={`/products/${product.id}`} className="group/link">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 leading-snug transition-colors group-hover/link:text-pink-600 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Colors Preview - Fixed height container */}
          <div className="mb-3 min-h-[1.25rem] flex items-center gap-2">
            {product.colors && product.colors.length > 0 ? (
              <>
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="h-3 w-3 rounded-full border border-border"
                      style={{ backgroundColor: getColorPreview(color) }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                  )}
                </div>
              </>
            ) : (
              <span className="text-xs text-muted-foreground opacity-0">No colors</span>
            )}
          </div>

          {/* Size Range - Fixed height container */}
          <div className="mb-3 min-h-[1.25rem] flex items-center">
            {product.sizes && product.sizes.length > 0 ? (
              <span className="text-xs text-muted-foreground">
                Sizes: {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground opacity-0">No sizes</span>
            )}
          </div>

          {/* Price - Push to bottom with flex-1 spacer above */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-lg text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
                Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0 flex-shrink-0">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center border border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600 text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            Detail
          </Link>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            + Keranjang
          </button>
        </CardFooter>
      </Card>

      {/* Add to Cart Dialog */}
      <AddToCartDialogShadcn
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={product}
      />
    </>
  )
}
