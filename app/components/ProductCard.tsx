'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0])
  const { addToCart } = useCart()
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className={`group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
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
                                   '#9ca3af'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>

        {/* Modal for Size and Color Selection */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Add to Cart</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex space-x-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-lg font-bold text-pink-600">{formatPrice(product.price)}</p>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-4 text-sm font-medium rounded-lg border-2 transition-colors ${
                          selectedSize === size
                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300'
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
                  <div className="grid grid-cols-2 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`py-2 px-4 text-sm font-medium rounded-lg border-2 transition-colors ${
                          selectedColor === color
                            ? 'border-pink-600 bg-pink-50 text-pink-600'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product, selectedSize, selectedColor)
                      setIsModalOpen(false)
                    }}
                    className="flex-1 py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
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
