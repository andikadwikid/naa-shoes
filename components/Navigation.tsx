'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getItemCount } = useCart()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemCount = mounted ? getItemCount() : 0

  return (
    <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-40" role="banner">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-pink-600 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
              aria-label="NAA Shoes - Go to homepage"
            >
              NAA Shoes
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8" role="menubar">
              <Link 
                href="/" 
                className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                role="menuitem"
                aria-label="Go to homepage"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                role="menuitem"
                aria-label="Browse our shoe collection"
              >
                Products
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                role="menuitem"
                aria-label="Read our fashion blog"
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                role="menuitem"
                aria-label="Learn about our company"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-900 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                role="menuitem"
                aria-label="Contact customer service"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Shopping Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative text-gray-600 hover:text-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded p-1"
              aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
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
              className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
              aria-label={`Shopping cart with ${cartItemCount} item${cartItemCount !== 1 ? 's' : ''}`}
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
              className="p-2 text-gray-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-lg touch-manipulation"
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
              className="block text-gray-900 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Go to homepage"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block text-gray-900 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Browse our shoe collection"
            >
              Products
            </Link>
            <Link 
              href="/blog" 
              className="block text-gray-900 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Read our fashion blog"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="block text-gray-900 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Learn about our company"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-900 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 text-base font-medium rounded-lg transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              onClick={handleMenuClose}
              role="menuitem"
              aria-label="Contact customer service"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
