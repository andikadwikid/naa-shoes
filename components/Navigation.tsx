'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '../hooks/useCart'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { getItemCount } = useCart()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount = mounted ? getItemCount() : 0

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100/50 sticky top-0 z-50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16 sm:h-18">

          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center py-2 focus:outline-none rounded-lg"
              aria-label="NAA Shoes - Go to homepage"
            >
              <div className="flex items-center space-x-2">
                {/* Logo icon */}
                <div className="w-8 h-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                {/* Brand text */}
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 group-hover:from-pink-700 group-hover:to-purple-700 transition-colors">
                    NAA Shoes
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Premium Footwear</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1" role="menubar">
              <Link
                href="/"
                className={`group relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg focus:outline-none ${
                  isActive('/')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                role="menuitem"
                aria-label="Go to homepage"
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <span className="relative z-10">Home</span>
                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-transform duration-300 rounded-full ${
                  isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
              <Link
                href="/products"
                className={`group relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg focus:outline-none ${
                  isActive('/products')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                role="menuitem"
                aria-label="Browse our shoe collection"
                aria-current={isActive('/products') ? 'page' : undefined}
              >
                <span className="relative z-10">Koleksi</span>
                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-transform duration-300 rounded-full ${
                  isActive('/products') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
              <Link
                href="/blog"
                className={`group relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg focus:outline-none ${
                  isActive('/blog')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                role="menuitem"
                aria-label="Read our fashion blog"
                aria-current={isActive('/blog') ? 'page' : undefined}
              >
                <span className="relative z-10">Blog</span>
                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-transform duration-300 rounded-full ${
                  isActive('/blog') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
              <Link
                href="/about"
                className={`group relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg focus:outline-none ${
                  isActive('/about')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                role="menuitem"
                aria-label="Learn about our company"
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                <span className="relative z-10">About</span>
                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-transform duration-300 rounded-full ${
                  isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
              <Link
                href="/contact"
                className={`group relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg focus:outline-none ${
                  isActive('/contact')
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
                role="menuitem"
                aria-label="Contact customer service"
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                <span className="relative z-10">Contact</span>
                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transition-transform duration-300 rounded-full ${
                  isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
            </div>
          </div>

          {/* Desktop Shopping Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/cart"
              className={`relative transition-colors duration-200 focus:outline-none rounded p-1 ${
                isActive('/cart')
                  ? 'text-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
              aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
              aria-current={isActive('/cart') ? 'page' : undefined}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  aria-label={`${cartItemCount} items in cart`}
                  role="status"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className={`relative p-2 transition-colors duration-200 touch-manipulation focus:outline-none rounded ${
                isActive('/cart')
                  ? 'text-pink-600'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
              aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
              aria-current={isActive('/cart') ? 'page' : undefined}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {cartItemCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]"
                  aria-label={`${cartItemCount} items in cart`}
                  role="status"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="p-2 text-gray-600 hover:text-pink-600 focus:outline-none rounded-lg touch-manipulation"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t border-pink-100 bg-white"
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-3 py-3 space-y-1">
            <Link
              href="/"
              className={`block text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none px-4 py-3 ${
                isActive('/')
                  ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600'
                  : 'text-gray-900 hover:text-pink-600 hover:bg-pink-50'
              }`}
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Go to homepage"
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none px-4 py-3 ${
                isActive('/products')
                  ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600'
                  : 'text-gray-900 hover:text-pink-600 hover:bg-pink-50'
              }`}
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Browse our shoe collection"
              aria-current={isActive('/products') ? 'page' : undefined}
            >
              Products
            </Link>
            <Link
              href="/blog"
              className={`block text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none px-4 py-3 ${
                isActive('/blog')
                  ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600'
                  : 'text-gray-900 hover:text-pink-600 hover:bg-pink-50'
              }`}
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Read our fashion blog"
              aria-current={isActive('/blog') ? 'page' : undefined}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`block text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none px-4 py-3 ${
                isActive('/about')
                  ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600'
                  : 'text-gray-900 hover:text-pink-600 hover:bg-pink-50'
              }`}
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Learn about our company"
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none px-4 py-3 ${
                isActive('/contact')
                  ? 'text-pink-600 bg-pink-50 border-l-4 border-pink-600'
                  : 'text-gray-900 hover:text-pink-600 hover:bg-pink-50'
              }`}
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Contact customer service"
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
