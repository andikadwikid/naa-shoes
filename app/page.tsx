import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "../components/ProductCard"
import { featuredProducts } from "../services/products"

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
        {/* Hero Banner */}
        <section 
          className="relative bg-gradient-to-r from-pink-500 to-rose-400 text-white overflow-hidden" 
          role="banner"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-black opacity-20" aria-hidden="true"></div>
          <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
            <header className="text-center">
              <h1 
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                Step Into Style
              </h1>
              <p 
                className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-pink-100 max-w-2xl mx-auto leading-relaxed"
                role="text"
                aria-describedby="hero-heading"
              >
                Koleksi sepatu wanita terbaru untuk gaya hidup modern Anda
              </p>
              <nav 
                className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center" 
                aria-label="Hero call-to-action buttons"
                role="navigation"
              >
                <Link
                  href="/products"
                  className="bg-white text-pink-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-pink-50 active:bg-pink-100 transition-all duration-200 transform hover:scale-105 text-base sm:text-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                  aria-label="Browse our complete collection of women's shoes"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-pink-600 active:bg-pink-50 transition-all duration-200 text-base sm:text-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                  aria-label="Learn more about NAA Shoes company and values"
                >
                  Learn More
                </Link>
              </nav>
            </header>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" role="main">
          
          {/* Featured Products Section */}
          <section 
            className="py-12 sm:py-16 lg:py-20 bg-white" 
            aria-labelledby="featured-products-heading"
            role="region"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <header className="text-center mb-8 sm:mb-12">
                <h2 id="featured-products-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Featured Products
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Pilihan terbaik dari koleksi terbaru kami yang sedang trending
                </p>
              </header>
              
              <div 
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" 
                role="list"
                aria-label="Featured products"
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              <footer className="text-center mt-8 sm:mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="View our complete collection of women's shoes"
                >
                  View All Products
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

        {/* Newsletter Section */}
        <aside 
          className="py-12 sm:py-16 lg:py-20 bg-pink-600 text-white" 
          aria-labelledby="newsletter-heading"
          role="complementary"
        >
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
            <header>
              <h2 id="newsletter-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Stay in Style
              </h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-pink-100 leading-relaxed">
                Dapatkan update koleksi terbaru dan promo eksklusif langsung ke email Anda
              </p>
            </header>
            <form 
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4" 
              aria-label="Newsletter subscription form"
            >
              <label className="sr-only" htmlFor="email-newsletter">
                Email address for newsletter subscription
              </label>
              <input
                id="email-newsletter"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-pink-300 touch-manipulation"
                aria-required="true"
                aria-describedby="newsletter-description"
              />
              <button 
                type="submit"
                className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 active:bg-pink-100 transition-colors duration-200 whitespace-nowrap touch-manipulation focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-600"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
            <p id="newsletter-description" className="sr-only">
              Subscribe to receive updates about new products and exclusive offers from NAA Shoes
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
