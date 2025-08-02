import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../hooks/useCart'
import { generateWhatsAppLink, getWhatsAppConfig } from '../../lib/whatsapp'
import { formatCurrency } from '../../lib/utils'

export const metadata: Metadata = {
  title: "Shopping Cart - NAA Shoes | Review Your Selected Items",
  description: "Review your selected women's shoes in your shopping cart. Secure checkout via WhatsApp. Free shipping on all orders from NAA Shoes.",
  keywords: ["shopping cart", "checkout", "women's shoes", "secure payment", "free shipping"],
  openGraph: {
    title: "Shopping Cart - NAA Shoes",
    description: "Review your selected items and proceed to secure checkout",
    url: "https://naashoes.com/cart",
    type: "website",
  },
  alternates: {
    canonical: "https://naashoes.com/cart",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Shopping Cart",
  "description": "Shopping cart page for NAA Shoes online store",
  "url": "https://naashoes.com/cart",
  "isPartOf": {
    "@type": "WebSite",
    "name": "NAA Shoes",
    "url": "https://naashoes.com"
  }
}

'use client'

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart()

  const handleQuantityChange = (productId: number, size: number, color: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, size, color, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (state.items.length === 0) return

    const config = getWhatsAppConfig()
    const whatsappLink = generateWhatsAppLink(
      state.items,
      state.totalItems,
      getTotalPrice(),
      config
    )
    window.open(whatsappLink, '_blank')
  }

  if (state.items.length === 0) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Skip Navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <main id="main-content" className="min-h-screen bg-gray-50 py-12" role="main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div 
                  className="mx-auto h-24 w-24 text-gray-400 mb-8"
                  role="img"
                  aria-label="Empty shopping cart"
                >
                  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Looks like you haven't added any items to your cart yet. Discover our amazing collection of women's shoes.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="Browse our complete shoe collection"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Skip Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8" role="main">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-6 sm:mb-8" role="banner">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Shopping Cart
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              <span className="sr-only">You have</span>
              {state.totalItems} item{state.totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Cart Items */}
            <section 
              className="lg:col-span-2"
              aria-labelledby="cart-items-heading"
              role="region"
            >
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 sm:p-6">
                  <header className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 id="cart-items-heading" className="text-lg sm:text-xl font-semibold text-gray-900">
                      Cart Items
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-700 active:text-red-800 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label="Remove all items from cart"
                      aria-describedby="clear-cart-help"
                    >
                      Clear All
                    </button>
                    <div id="clear-cart-help" className="sr-only">
                      This will remove all items from your shopping cart
                    </div>
                  </header>

                  <div 
                    className="space-y-6"
                    role="list"
                    aria-label="Items in your cart"
                  >
                    {state.items.map((item, index) => (
                      <article
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                        role="listitem"
                        aria-labelledby={`item-title-${index}`}
                      >
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={`${item.product.name} in ${item.selectedColor}`}
                            fill
                            className="object-cover rounded-lg"
                            sizes="96px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            id={`item-title-${index}`}
                            className="font-semibold text-gray-900 mb-1"
                          >
                            {item.product.name}
                          </h3>
                          <div className="text-sm text-gray-600 mb-2">
                            <span>Size: <span className="font-medium">{item.selectedSize}</span></span>
                            <span className="mx-2" aria-hidden="true">|</span>
                            <span>Color: <span className="font-medium">{item.selectedColor}</span></span>
                          </div>
                          <p className="text-lg font-bold text-pink-600">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div 
                          className="flex items-center space-x-3"
                          role="group"
                          aria-labelledby={`quantity-label-${index}`}
                        >
                          <label id={`quantity-label-${index}`} className="sr-only">
                            Quantity for {item.product.name}
                          </label>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )}
                              className="p-2 hover:bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 touch-manipulation"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span 
                              className="px-4 py-2 text-center min-w-[50px] font-medium"
                              aria-label={`Current quantity: ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )}
                              className="p-2 hover:bg-gray-100 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 touch-manipulation"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                            className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 touch-manipulation"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p 
                            className="text-lg font-bold text-gray-900"
                            aria-label={`Total for this item: ${formatCurrency(item.product.price * item.quantity)}`}
                          >
                            {formatCurrency(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <aside 
              className="lg:col-span-1"
              aria-labelledby="order-summary-heading"
              role="complementary"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 id="order-summary-heading" className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* WhatsApp Info */}
                <div 
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                  role="region"
                  aria-labelledby="checkout-info-heading"
                >
                  <div className="flex items-start gap-3">
                    <svg 
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                    </svg>
                    <div>
                      <h3 id="checkout-info-heading" className="text-sm font-medium text-green-800 mb-1">
                        Checkout via WhatsApp
                      </h3>
                      <p className="text-xs text-green-700">
                        Pesanan akan dikirim melalui WhatsApp untuk konfirmasi dan pembayanan yang aman.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6" role="region" aria-labelledby="price-breakdown-heading">
                  <h3 id="price-breakdown-heading" className="sr-only">Price Breakdown</h3>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({state.totalItems} items)</span>
                    <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-pink-600">{formatCurrency(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4 flex items-center justify-center gap-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-describedby="checkout-description"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                    </svg>
                    Checkout via WhatsApp
                  </button>
                  <p id="checkout-description" className="text-xs text-gray-500 text-center">
                    Secure checkout through WhatsApp with order confirmation
                  </p>
                  
                  <Link
                    href="/products"
                    className="block w-full text-center border border-pink-600 text-pink-600 hover:bg-pink-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label="Continue shopping for more shoes"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
