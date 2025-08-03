'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { Product, getAvailableColors, getAvailableSizes, getStockForColorSize, getTotalStockForColor, getColorHexCode } from '../types/product'
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
import SizeGuide from './SizeGuide'
import StockIndicator from './StockIndicator'

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
  const availableColors = getAvailableColors(product)
  const availableSizes = getAvailableSizes(product)
  
  const [selectedSize, setSelectedSize] = useState<number>(availableSizes[0] || 36)
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || 'Black')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    const stock = getStockForColorSize(product, selectedColor, selectedSize)
    if (stock < quantity) {
      showToast(`Only ${stock} items available for ${selectedColor} in size ${selectedSize}`, 'error')
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor)
    }
    onOpenChange(false)
    showToast(`${quantity} ${product.name} added to cart!`, 'success')
    setQuantity(1)
  }

  const maxQuantity = getStockForColorSize(product, selectedColor, selectedSize)
  const isOutOfStock = maxQuantity === 0

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

        {/* Color Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-900">Color: {selectedColor}</h5>
            <span className="text-xs text-gray-500">
              {getTotalStockForColor(product, selectedColor)} available
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const totalStock = getTotalStockForColor(product, color)
              const isSelected = selectedColor === color
              const isAvailable = totalStock > 0
              
              return (
                <button
                  key={color}
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedColor(color)
                      setQuantity(1) // Reset quantity when color changes
                    }
                  }}
                  disabled={!isAvailable}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                    isSelected && isAvailable
                      ? "border-pink-300 bg-pink-50 text-pink-700"
                      : isAvailable
                      ? "border-gray-200 bg-white text-gray-700 hover:border-pink-200 hover:bg-pink-50"
                      : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60"
                  )}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: getColorHexCode(product, color) }}
                  />
                  <span>{color}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-900">Size: {selectedSize}</h5>
            <SizeGuide sizeGuide={product.sizeGuide || []} productName={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {availableSizes.map((size) => {
              const stock = getStockForColorSize(product, selectedColor, size)
              const isSelected = selectedSize === size
              const isAvailable = stock > 0
              
              return (
                <button
                  key={size}
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedSize(size)
                      setQuantity(1) // Reset quantity when size changes
                    }
                  }}
                  disabled={!isAvailable}
                  className={cn(
                    "relative p-3 text-sm font-medium rounded-lg border transition-all",
                    isSelected && isAvailable
                      ? "border-pink-300 bg-pink-50 text-pink-700"
                      : isAvailable
                      ? "border-gray-200 bg-white text-gray-700 hover:border-pink-200 hover:bg-pink-50"
                      : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                  )}
                >
                  {size}
                  {isSelected && <Check className="w-3 h-3 absolute top-1 right-1" />}
                  <div className="text-xs text-gray-500 mt-1">
                    {stock > 0 ? `${stock} left` : 'Out of stock'}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-900">Quantity</h5>
            <span className="text-xs text-gray-500">
              {maxQuantity} available
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              disabled={quantity >= maxQuantity || isOutOfStock}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-gray-100">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? 'Out of Stock' : `Add ${quantity} to Cart`}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
