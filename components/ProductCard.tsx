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
    <div className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors leading-tight cursor-pointer min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed min-h-[3rem] sm:min-h-[3.75rem]">
          {product.description}
        </p>

        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-bold text-base sm:text-lg text-gray-900 truncate">
              {formatCurrency(product.price)}
            </span>
            <div className="min-h-[1.25rem]">
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through truncate">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
            {product.category}
          </span>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center min-h-[1.25rem] sm:min-h-[1.5rem]">
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 flex-shrink-0"
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                     color.toLowerCase() === 'black' ? '#000000' :
                                     color.toLowerCase() === 'pink' ? '#ec4899' :
                                     color.toLowerCase() === 'rose gold' ? '#e11d48' :
                                     color.toLowerCase() === 'nude' ? '#d4a574' :
                                     color.toLowerCase() === 'coral' ? '#f97316' :
                                     '#9ca3af'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 self-center ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 text-center border border-pink-600 text-pink-600 hover:bg-pink-50 active:bg-pink-100 text-xs sm:text-sm font-medium py-2.5 px-3 rounded-lg transition-colors duration-200 touch-manipulation"
            >
              View Details
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white text-xs sm:text-sm font-medium py-2.5 px-3 rounded-lg transition-colors duration-200 touch-manipulation"
            >
              Quick Add
            </button>
          </div>
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
