'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ProductCardProps } from '../types/ui'
import { formatCurrency } from '../lib/utils'
import AddToCartModal from './AddToCartModal'

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}>
        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block relative">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.thumbnailUrl || product.image || product.galleryImages?.[0]?.url || '/placeholder-product.svg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Status Badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between">
              <div className="flex gap-2">
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
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {typeof product.category === 'string' ? product.category : product.category.name}
            </span>
            <div className="flex items-center text-xs text-gray-400">
              <span className="text-yellow-400 mr-1">���★★★★</span>
              <span>(4.9)</span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-pink-600 transition-colors leading-snug h-12">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
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
              <span className="text-xs text-green-600 font-medium">
                Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Colors & Sizes */}
          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
            <div className="flex items-center">
              <span className="mr-2">Warna:</span>
              <div className="flex space-x-1">
                {(product.colors || []).slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                        color.toLowerCase() === 'black' ? '#000000' :
                          color.toLowerCase() === 'pink' ? '#ec4899' :
                            color.toLowerCase() === 'rose gold' ? '#e11d48' :
                              color.toLowerCase() === 'nude' ? '#d4a574' :
                                color.toLowerCase() === 'coral' ? '#f97316' :
                                  color.toLowerCase() === 'silver' ? '#9ca3af' :
                                    color.toLowerCase() === 'gold' ? '#fbbf24' :
                                      color.toLowerCase() === 'brown' ? '#92400e' :
                                        '#9ca3af'
                    }}
                    title={color}
                  />
                ))}
                {(product.colors?.length || 0) > 3 && (
                  <span className="text-xs">+{(product.colors?.length || 0) - 3}</span>
                )}
              </div>
            </div>
            <span>Size: {product.sizes?.length ? `${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}` : 'Available'}</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 text-center border border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600 text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Detail
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              + Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  )
}
