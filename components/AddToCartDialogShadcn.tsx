'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { Product } from '../types/product'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import { formatCurrency, cn } from '../lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface AddToCartDialogShadcnProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export default function AddToCartDialogShadcn({ 
  open, 
  onOpenChange, 
  product 
}: AddToCartDialogShadcnProps) {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes?.[0] || 36)
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Black')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor)
    }
    onOpenChange(false)
    showToast(`${quantity} ${product.name} added to cart!`, 'success')
    setQuantity(1)
  }

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white rounded-xl shadow-xl border-0 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-lg font-semibold text-gray-900">Add to Cart</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Pilih ukuran dan warna yang Anda inginkan
          </DialogDescription>
        </DialogHeader>

        {/* Product Info */}
        <div className="flex gap-3 bg-pink-50 p-3 rounded-lg">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
            <Image
              src={product.thumbnailUrl || product.image || product.galleryImages?.[0]?.url || '/placeholder-product.svg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-gray-900 leading-tight text-sm">{product.name}</h4>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide bg-white px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-pink-600">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-700">Select Size</h5>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-colors ${selectedSize === size
                    ? 'border-pink-600 bg-pink-50 text-pink-600'
                    : 'border-gray-300 text-gray-700 hover:border-pink-300'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-700">Select Color</h5>
            <div className="grid grid-cols-1 gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-colors text-left flex items-center gap-2 ${selectedColor === color
                    ? 'border-pink-600 bg-pink-50 text-pink-600'
                    : 'border-gray-300 text-gray-700 hover:border-pink-300'
                    }`}
                >
                  <div
                    className="h-3 w-3 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: getColorPreview(color) }}
                  />
                  {color}
                  {selectedColor === color && (
                    <Check className="ml-auto h-3 w-3 text-pink-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Quantity</h5>
          <div className="flex items-center justify-center gap-3 bg-gray-50 rounded-lg p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-pink-500 hover:bg-pink-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center font-semibold text-base text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-pink-500 hover:bg-pink-50 transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 p-3 shadow-sm">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-lg font-bold text-pink-600">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:gap-2 pt-2">
          <button
            onClick={() => onOpenChange(false)}
            className="order-2 sm:order-1 flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="order-1 sm:order-2 flex-1 py-2.5 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Add {quantity} to Cart
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
