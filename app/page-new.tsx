'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedProductCard from "../components/AnimatedProductCard"
import HeroSection from "../components/HeroSection"
import Footer from "../components/Footer"
import WhatsAppFloat from "../components/WhatsAppFloat"
import { getFeaturedProducts } from "../services/api-products"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
}

// Metadata will be handled by layout.tsx for client components

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "NAA Shoes",
  "description": "Toko sepatu wanita online terpercaya dengan koleksi terlengkap",
  "url": "https://naashoes.com",
  "logo": "https://naashoes.com/logo.png",
  "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=630&fit=crop",
  "telephone": "+62-xxx-xxx-xxxx",
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "currenciesAccepted": "IDR",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ID",
    "addressRegion": "Indonesia"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sepatu Wanita",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Sneakers Wanita",
          "category": "Footwear"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Product",
          "name": "High Heels",
          "category": "Footwear"
        }
      }
    ]
  }
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setIsLoading(true)
      try {
        const products = await getFeaturedProducts()
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error loading featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
        <HeroSection />

        {/* Trust Signals Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-gray-50 to-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Garansi Kualitas</h3>
                <p className="text-sm text-gray-600">30 hari tukar barang jika tidak puas</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Gratis Ongkir</h3>
                <p className="text-sm text-gray-600">Ke seluruh Indonesia min. pembelian 250rb</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Kualitas Terjamin</h3>
                <p className="text-sm text-gray-600">Bahan berkualitas dari supplier terpercaya</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customer Service</h3>
                <p className="text-sm text-gray-600">Tim support siap membantu 24/7</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Products Section */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Koleksi Pilihan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Temukan sepatu favorit yang paling diminati oleh pelanggan kami
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
              >
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <AnimatedProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Siap Menemukan Sepatu Impian Anda?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              variants={fadeInUp}
            >
              Jelajahi koleksi lengkap kami dan temukan style yang tepat untuk setiap momen
            </motion.p>
            <motion.div
              variants={fadeInUp}
            >
              <a
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Lihat Semua Produk
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
