'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      role="banner"
      aria-labelledby="hero-heading"
    >
      {/* Modern Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white to-rose-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg className="absolute top-20 left-20 text-pink-100" width="60" height="60" viewBox="0 0 60 60" fill="currentColor">
            <circle cx="30" cy="30" r="30"/>
          </svg>
          <svg className="absolute top-40 right-32 text-purple-100" width="80" height="80" viewBox="0 0 80 80" fill="currentColor">
            <circle cx="40" cy="40" r="40"/>
          </svg>
          <svg className="absolute bottom-32 left-40 text-rose-100" width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="50"/>
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* Hero Content - Takes up 7 columns */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-full mb-8"
              variants={fadeInUp}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">10,000+ Wanita Memilih NAA Shoes</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[0.9]"
              variants={fadeInUp}
            >
              <span className="text-gray-900">Sepatu</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-size-200 animate-gradient">
                Impian
              </span>
              <br />
              <span className="text-gray-600 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal">
                Anda
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl lg:text-2xl mb-12 text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={fadeInUp}
            >
              Koleksi premium yang menggabungkan
              <span className="font-semibold text-gray-900"> style, comfort, </span>
              dan 
              <span className="font-semibold text-gray-900"> quality </span>
              dalam setiap langkah.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto lg:mx-0"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-500">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Browse our complete collection"
              >
                <span>Lihat Koleksi</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Learn more about us"
              >
                Tentang Kami
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Takes up 5 columns */}
          <motion.div
            className="lg:col-span-5 relative"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
          >
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center"
                  alt="Premium NAA Shoes collection"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Free Shipping</div>
                    <div className="text-gray-500 text-xs">Ke seluruh Indonesia</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">30 Days Warranty</div>
                    <div className="text-gray-500 text-xs">Jaminan kualitas</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
