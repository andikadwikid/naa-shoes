'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Product } from '../types/product'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import { formatCurrency } from '../lib/utils'

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export default function AddToCartModal({ isOpen, onClose, product }: AddToCartModalProps) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes?.[0] || 36)
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Black')
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor)
    onClose()
    showToast(`${product.name} added to cart!`, 'success')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add to Cart</h3>
            <button
              onClick={onClose}
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
                src={product.thumbnailUrl || product.image || product.galleryImages?.[0]?.url || '/placeholder-product.svg'}
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
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors touch-manipulation ${selectedSize === size
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
              {(product.colors || []).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors touch-manipulation text-left ${selectedColor === color
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
              onClick={onClose}
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
  )
}
