'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = (productId: number, size: number, color: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, size, color, newQuantity)
    }
  }

  const generateWhatsAppLink = () => {
    // Nomor WhatsApp toko (ganti dengan nomor yang sesuai)
    const whatsappNumber = '6281234567890' // Ganti dengan nomor WhatsApp toko

    // Generate pesan berdasarkan cart items
    let message = `Halo! Saya tertarik untuk membeli sepatu dari NAA Shoes:\n\n`

    state.items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`
      message += `   - Size: ${item.selectedSize}\n`
      message += `   - Color: ${item.selectedColor}\n`
      message += `   - Quantity: ${item.quantity}\n`
      message += `   - Price: ${formatPrice(item.product.price)} x ${item.quantity} = ${formatPrice(item.product.price * item.quantity)}\n\n`
    })

    message += `Total Items: ${state.totalItems}\n`
    message += `Total Price: ${formatPrice(getTotalPrice())}\n\n`
    message += `Mohon informasi lebih lanjut untuk proses pemesanan. Terima kasih!`

    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message)

    // Generate WhatsApp link
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  }

  const handleCheckout = () => {
    if (state.items.length === 0) return

    const whatsappLink = generateWhatsAppLink()
    window.open(whatsappLink, '_blank')
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-24 w-24 text-gray-400 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Shopping Cart
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {state.totalItems} item{state.totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-700 active:text-red-800 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors touch-manipulation"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <p className="text-lg font-bold text-pink-600">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )}
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-center min-w-[50px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor
                          )}
                          className="text-red-600 hover:text-red-700 p-2"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.totalItems} items)</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-pink-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4">
                Proceed to Checkout
              </button>
              
              <Link
                href="/products"
                className="block w-full text-center border border-pink-600 text-pink-600 hover:bg-pink-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
