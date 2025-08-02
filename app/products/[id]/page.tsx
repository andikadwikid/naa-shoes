'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Product } from '../../../types/product'
import { getProductById, getProducts } from '../../../services/products'
import { useCart } from '../../../hooks/useCart'
import { useToast } from '../../../hooks/useToast'
import { formatCurrency } from '../../../lib/utils'
import ProductCard from '../../../components/ProductCard'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      try {
        const productData = await getProductById(parseInt(params.id))
        if (!productData) {
          notFound()
          return
        }
        
        setProduct(productData)
        setSelectedSize(productData.sizes[0])
        setSelectedColor(productData.colors[0])

        // Load related products (same category, excluding current product)
        const allProducts = await getProducts()
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (error) {
        console.error('Error loading product:', error)
        notFound()
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      showToast('Please select a size', 'error')
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor)
    }
    
    showToast(`${quantity} ${product.name} added to cart!`, 'success')
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  // Mock product images (in real app, product would have multiple images)
  const productImages = product ? [
    product.image,
    product.image, // Duplicate for demo
    product.image,
  ] : []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-pink-600">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isOnSale && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  SALE
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-pink-600'
                      : 'ring-1 ring-gray-200 hover:ring-pink-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    New Arrival
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors ${
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
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Color</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-colors text-left ${
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

            {/* Quantity */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-3 hover:bg-gray-100 rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-3 text-center min-w-[50px] font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-3 hover:bg-gray-100 rounded-r-lg"
                  disabled={quantity >= 10}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-base"
              >
                Add {quantity} to Cart - {formatCurrency(product.price * quantity)}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
                <button className="border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Share Product
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium quality materials
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Comfortable all-day wear
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping on orders over Rp 500.000
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  30-day return policy
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
