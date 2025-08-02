import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "../components/ProductCard"
import { getFeaturedProducts } from "../services/api-products"

export const metadata: Metadata = {
  title: "NAA Shoes - Sepatu Wanita Terbaru | Sneakers, Heels, Boots Online",
  description: "Toko online sepatu wanita terpercaya dengan koleksi terlengkap. Sneakers, high heels, boots, flats berkualitas tinggi. Gratis ongkir, harga terjangkau, fashion wanita modern.",
  openGraph: {
    title: "NAA Shoes - Sepatu Wanita Terbaru",
    description: "Koleksi sepatu wanita terlengkap dengan kualitas terbaik",
    url: "https://naashoes.com",
    type: "website",
  },
  alternates: {
    canonical: "https://naashoes.com",
  },
}

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      


      <div className="min-h-screen">
        {/* Enhanced Hero Banner */}
        <section
          className="relative min-h-screen flex items-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden"
          role="banner"
          aria-labelledby="hero-heading"
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Hero Content */}
              <div className="text-center lg:text-left">
                {/* Trust Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 mb-6 shadow-lg">
                  <span className="text-green-500 mr-2">✓</span>
                  Dipercaya 10,000+ Wanita Indonesia
                </div>

                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
                >
                  <span className="text-gray-900">Langkah</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    Penuh Percaya Diri
                  </span>
                </h1>

                <p
                  className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  role="text"
                  aria-describedby="hero-heading"
                >
                  Temukan sepatu impian yang mencerminkan kepribadian unik Anda.
                  <span className="font-semibold text-gray-800"> Kualitas premium, desain elegan, kenyamanan maksimal.</span>
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Gratis Ongkir
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Garansi 30 Hari
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Kualitas Premium
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/products"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Browse our complete collection of women's shoes"
                  >
                    <span>Jelajahi Koleksi</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-pink-300 hover:text-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="Learn more about NAA Shoes company and values"
                  >
                    Tentang Kami
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative lg:order-first lg:order-last">
                <div className="relative">
                  {/* Main Hero Image */}
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                    <Image
                      src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop&crop=center"
                      alt="Wanita elegan mengenakan sepatu NAA Shoes dengan percaya diri"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-pink-100 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-purple-100 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-rose-100 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">2,847+</p>
                        <p className="text-xs text-gray-500">Happy Customers</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        ★★★★★
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">4.9</p>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
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
                <p className="text-sm text-gray-600">Pengiriman gratis ke seluruh Indonesia</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pembayaran Aman</h3>
                <p className="text-sm text-gray-600">Berbagai metode pembayaran terpercaya</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="trust-seal mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-sm text-gray-600">Layanan pelanggan 24/7 siap membantu</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Dipercaya <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">10,000+</span> Wanita Indonesia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bergabunglah dengan ribuan wanita yang telah merasakan kenyamanan dan kepercayaan diri bersama NAA Shoes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="testimonial-card">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
                    alt="Sarah, customer testimonial"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Sarah Dewi</h4>
                    <p className="text-sm text-gray-500">Jakarta</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 leading-relaxed">
                  "Kualitas sepatu luar biasa! Sangat nyaman dipakai seharian. Design nya juga timeless, cocok untuk berbagai acara."
                </p>
              </div>

              <div className="testimonial-card">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
                    alt="Maya, customer testimonial"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Maya Sari</h4>
                    <p className="text-sm text-gray-500">Surabaya</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 leading-relaxed">
                  "Pelayanan customer service nya excellent! Pengiriman cepat dan packaging rapi. Definitely akan order lagi!"
                </p>
              </div>

              <div className="testimonial-card">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                    alt="Rina, customer testimonial"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Rina Hartini</h4>
                    <p className="text-sm text-gray-500">Bandung</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 leading-relaxed">
                  "Harga reasonable untuk kualitas premium. Material berkualitas tinggi dan finishing yang detail. Highly recommended!"
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
                <div className="text-gray-600">Product Variants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" role="main">

          {/* Featured Products Section */}
          <section
            className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
            aria-labelledby="featured-products-heading"
            role="region"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100 to-purple-100 rounded-full transform translate-x-32 -translate-y-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full transform -translate-x-32 translate-y-32 opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <header className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm font-medium text-pink-800 mb-6">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
                  Koleksi Terpopuler
                </div>
                <h2 id="featured-products-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Sepatu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Impian</span> Anda
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  Setiap langkah adalah pernyataan gaya. Temukan sepatu yang tidak hanya memukau mata,
                  tetapi juga memberikan kenyamanan luar biasa untuk aktivitas sehari-hari Anda.
                </p>

                {/* Trust indicators for this section */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Bahan Premium
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Desain Eksklusif
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Comfort Technology
                  </div>
                </div>
              </header>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                role="list"
                aria-label="Featured products"
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} role="listitem" className="group">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <footer className="text-center mt-16">
                <Link
                  href="/products"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="View our complete collection of women's shoes"
                >
                  <span>Lihat Semua Koleksi</span>
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </footer>
            </div>
          </section>

          {/* Categories Section */}
          <section 
            className="py-12 sm:py-16 lg:py-20 bg-gray-50" 
            aria-labelledby="categories-heading"
            role="region"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <header className="text-center mb-8 sm:mb-12">
                <h2 id="categories-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Shop by Category
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Temukan sepatu yang sempurna sesuai dengan kebutuhan dan gaya Anda
                </p>
              </header>
              
              <nav 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8" 
                role="list"
                aria-label="Product categories"
              >
                {[
                  { name: "Sneakers", count: "50+ Products", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop" },
                  { name: "High Heels", count: "30+ Products", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop" },
                  { name: "Boots", count: "25+ Products", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=300&h=300&fit=crop" },
                  { name: "Flats", count: "40+ Products", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=300&h=300&fit=crop" },
                  { name: "Sandals", count: "35+ Products", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop" }
                ].map((category) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${category.name}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-all duration-300 overflow-hidden touch-manipulation focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    role="listitem"
                    aria-label={`Browse ${category.name} collection - ${category.count}`}
                  >
                    <article>
                      <div className="relative aspect-square">
                        <Image
                          src={category.image}
                          alt={`${category.name} collection at NAA Shoes`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
                      <div className="p-3 sm:p-4 text-center">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{category.count}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </nav>
            </div>
          </section>

          {/* Featured Blog Posts Section */}
          <section 
            className="py-12 sm:py-16 lg:py-20 bg-gray-50" 
            aria-labelledby="blog-heading"
            role="region"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <header className="text-center mb-8 sm:mb-12">
                <h2 id="blog-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Fashion Tips & Trends
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Dapatkan insight terbaru seputar fashion, tips perawatan sepatu, dan tren terkini
                </p>
              </header>
              
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12" 
                role="list"
                aria-label="Featured blog articles"
              >
                {[
                  {
                    title: "Tren Sepatu Wanita 2024: Gaya yang Tak Lekang Oleh Waktu",
                    excerpt: "Temukan tren sepatu wanita terbaru di tahun 2024 yang menggabungkan kenyamanan dan gaya.",
                    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop",
                    category: "Fashion Trends",
                    readTime: "5 min",
                    slug: "tren-sepatu-wanita-2024"
                  },
                  {
                    title: "Cara Merawat Sepatu Kulit Agar Tahan Lama",
                    excerpt: "Tips dan trik merawat sepatu kulit kesayangan agar tetap awet dan terlihat seperti baru.",
                    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop",
                    category: "Care Tips",
                    readTime: "7 min",
                    slug: "cara-merawat-sepatu-kulit"
                  },
                  {
                    title: "Sepatu Ramah Lingkungan: Trend Sustainable Fashion",
                    excerpt: "Mengenal trend sepatu ramah lingkungan dan cara memilih footwear yang mendukung sustainability.",
                    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=300&fit=crop",
                    category: "Sustainability",
                    readTime: "7 min",
                    slug: "sepatu-ramah-lingkungan-sustainable-fashion"
                  }
                ].map((post, index) => (
                  <article 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300" 
                    role="listitem"
                  >
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="block focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-xl" 
                      aria-label={`Read article: ${post.title}`}
                    >
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={`Featured image for article: ${post.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-3">
                          <span className="text-pink-600 font-medium text-sm uppercase tracking-wide">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2 hover:text-pink-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span aria-label={`Reading time: ${post.readTime}`}>{post.readTime} read</span>
                          <span className="text-pink-600 font-medium hover:text-pink-700" aria-hidden="true">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              
              <footer className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="View all fashion articles and blog posts"
                >
                  Lihat Semua Artikel
                  <svg 
                    className="ml-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </footer>
            </div>
          </section>

        </main>

        {/* Enhanced Newsletter Section */}
        <aside
          className="relative py-20 overflow-hidden"
          aria-labelledby="newsletter-heading"
          role="complementary"
        >
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute top-40 right-40 w-24 h-24 bg-white rounded-full"></div>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Content */}
              <div className="text-center lg:text-left text-white">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Bergabung dengan 10,000+ Fashion Enthusiast
                </div>

                <h2 id="newsletter-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Jangan Sampai <span className="text-yellow-300">Ketinggalan</span> Tren
                </h2>

                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Dapatkan akses eksklusif ke koleksi terbaru, tips fashion dari expert,
                  dan promo khusus yang hanya tersedia untuk subscriber kami.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/90">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Koleksi terbaru sebelum orang lain
                  </div>
                  <div className="flex items-center text-white/90">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Diskon eksklusif hingga 30%
                  </div>
                  <div className="flex items-center text-white/90">
                    <svg className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Tips & trik styling dari fashion expert
                  </div>
                </div>
              </div>

              {/* Newsletter Form */}
              <div className="lg:max-w-md mx-auto w-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscribe Sekarang</h3>
                    <p className="text-gray-600">Gratis & bisa unsubscribe kapan saja</p>
                  </div>

                  <form className="space-y-4" aria-label="Newsletter subscription form">
                    <div>
                      <label className="sr-only" htmlFor="email-newsletter">
                        Email address for newsletter subscription
                      </label>
                      <input
                        id="email-newsletter"
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="w-full px-4 py-4 rounded-xl border border-gray-200 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                        aria-required="true"
                        aria-describedby="newsletter-description"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      aria-label="Subscribe to newsletter"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Subscribe Sekarang
                      </span>
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      Dengan subscribe, Anda setuju dengan
                      <a href="#" className="text-pink-600 hover:underline">Terms of Service</a> dan
                      <a href="#" className="text-pink-600 hover:underline">Privacy Policy</a> kami.
                    </p>
                  </div>

                  <p id="newsletter-description" className="sr-only">
                    Subscribe to receive updates about new products and exclusive offers from NAA Shoes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
