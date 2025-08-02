'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ProductCardProps } from '../types/ui'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import { formatCurrency } from '../lib/utils'

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0])
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor)
    setIsModalOpen(false)
    showToast(`${product.name} added to cart!`, 'success')
  }

  return (
    <div className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}>
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
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
            {product.category}
          </span>
          <div className="flex items-center text-xs text-gray-400">
            <span className="text-yellow-400 mr-1">★★★★★</span>
            <span>(4.9)</span>
          </div>
        </div>

        {/* Product Name */}
        <Link
          href={`/products/${product.id}`}
          className="block"
          onClick={() => {
            // Small delay to ensure navigation completes before scroll
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 100)
          }}
        >
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
              {product.colors.slice(0, 3).map((color, index) => (
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
              {product.colors.length > 3 && (
                <span className="text-xs">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
          <span>Size: {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center border border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600 text-sm font-medium py-2.5 rounded-lg transition-colors"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }, 100)
            }}
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

        {/* Modal for Size and Color Selection */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add to Cart</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg touch-manipulation"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex space-x-3 sm:space-x-4 mb-6">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-base sm:text-lg font-bold text-pink-600">{formatCurrency(product.price)}</p>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Size
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors touch-manipulation ${
                          selectedSize === size
                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300 active:border-pink-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Color
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors touch-manipulation text-left ${
                          selectedColor === color
                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300 active:border-pink-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="order-2 sm:order-1 flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="order-1 sm:order-2 flex-1 py-3 px-4 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white rounded-lg transition-colors touch-manipulation font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
