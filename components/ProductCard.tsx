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
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-2 ${className}`}>
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Enhanced badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {product.isNew && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
                  BARU
                </span>
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm ml-auto">
                SALE
              </span>
            )}
          </div>

          {/* Favorite heart button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
            <svg className="w-4 h-4 text-gray-600 hover:text-pink-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick view button */}
          <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white/95 backdrop-blur-sm text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-white transition-colors duration-200 shadow-lg">
              Quick View
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full">
            {product.category}
          </span>

          {/* Rating stars */}
          <div className="flex items-center text-yellow-400 text-xs">
            <span className="mr-1">★★★★★</span>
            <span className="text-gray-500 text-xs">(4.9)</span>
          </div>
        </div>

        <Link href={`/products/${product.id}`} className="group/link">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2 group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-pink-600 group-hover/link:to-purple-600 transition-all duration-300 leading-tight cursor-pointer min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price section with better visual hierarchy */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xl text-gray-900">
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
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span>Gratis Ongkir</span>
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <span>Garansi 30hr</span>
          </div>
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
