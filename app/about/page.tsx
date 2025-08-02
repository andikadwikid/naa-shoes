import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About NAA Shoes - Our Story & Values | Women's Footwear Expert",
  description: "Learn about NAA Shoes - Indonesia's trusted women's footwear brand. Discover our mission to provide quality, stylish, and comfortable shoes for modern women aged 21-40.",
  keywords: ["about NAA Shoes", "women's footwear", "shoe company", "fashion brand", "quality shoes", "comfortable footwear"],
  openGraph: {
    title: "About NAA Shoes - Our Story & Values",
    description: "Learn about NAA Shoes - trusted women's footwear brand providing quality and comfort",
    url: "https://naashoes.com/about",
    type: "website",
  },
  alternates: {
    canonical: "https://naashoes.com/about",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "NAA Shoes",
    "description": "Toko sepatu wanita terpercaya yang menyediakan koleksi berkualitas tinggi",
    "url": "https://naashoes.com",
    "logo": "https://naashoes.com/logo.png",
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "NAA Shoes Founder"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta"
    },
    "sameAs": [
      "https://instagram.com/naashoes",
      "https://facebook.com/naashoes"
    ]
  }
}

export default function AboutPage() {
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
          
          {/* Header */}
          <header className="text-center mb-12" role="banner">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">NAA Shoes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Passionate about empowering women through stylish, comfortable, and high-quality footwear
            </p>
          </header>

          {/* Story Section */}
          <section 
            className="bg-white rounded-lg shadow-sm p-8 mb-12"
            aria-labelledby="story-heading"
            role="region"
          >
            <h2 id="story-heading" className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                NAA Shoes didirikan dengan visi untuk memberikan sepatu berkualitas tinggi yang 
                menggabungkan gaya modern dan kenyamanan maksimal untuk wanita aktif usia 21-40 tahun.
              </p>
              <p className="mb-4">
                Kami memahami bahwa setiap wanita memiliki kebutuhan yang berbeda - dari profesional 
                muda yang membutuhkan sepatu formal untuk kantor, hingga ibu muda yang mencari sneakers 
                nyaman untuk aktivitas sehari-hari.
              </p>
              <p>
                Tim kami terdiri dari desainer berpengalaman dan ahli material yang berdedikasi untuk 
                menciptakan koleksi sepatu yang tidak hanya indah dipandang, tetapi juga memberikan 
                dukungan dan kenyamanan sepanjang hari.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            aria-labelledby="mission-vision-heading"
            role="region"
          >
            <h2 id="mission-vision-heading" className="sr-only">Mission and Vision</h2>
            
            <article className="bg-pink-50 rounded-lg p-6" role="article">
              <h3 className="text-xl font-bold text-pink-600 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Memberikan sepatu berkualitas tinggi yang memadukan style, comfort, dan affordability 
                untuk mendukung gaya hidup aktif wanita modern.
              </p>
            </article>
            
            <article className="bg-rose-50 rounded-lg p-6" role="article">
              <h3 className="text-xl font-bold text-rose-600 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi brand sepatu wanita terdepan yang dikenal karena inovasi design, 
                kualitas material, dan pelayanan pelanggan yang exceptional.
              </p>
            </article>
          </section>

          {/* Values */}
          <section 
            className="bg-white rounded-lg shadow-sm p-8"
            aria-labelledby="values-heading"
            role="region"
          >
            <header className="text-center mb-8">
              <h2 id="values-heading" className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
            </header>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              role="list"
              aria-label="Company values"
            >
              <article className="text-center" role="listitem">
                <div 
                  className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  role="img"
                  aria-label="Quality First icon"
                >
                  <svg 
                    className="w-8 h-8 text-pink-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Menggunakan material terbaik dan proses produksi yang ketat untuk menjamin kualitas setiap produk.
                </p>
              </article>
              
              <article className="text-center" role="listitem">
                <div 
                  className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  role="img"
                  aria-label="Customer Love icon"
                >
                  <svg 
                    className="w-8 h-8 text-pink-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Love</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Mengutamakan kepuasan pelanggan dengan pelayanan yang ramah dan responsif.
                </p>
              </article>
              
              <article className="text-center" role="listitem">
                <div 
                  className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  role="img"
                  aria-label="Innovation icon"
                >
                  <svg 
                    className="w-8 h-8 text-pink-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Terus berinovasi dalam design dan teknologi untuk menciptakan sepatu yang lebih baik.
                </p>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <aside 
            className="mt-12 text-center bg-gradient-to-r from-pink-500 to-rose-400 rounded-xl p-8 text-white"
            role="complementary"
            aria-labelledby="cta-heading"
          >
            <h2 id="cta-heading" className="text-2xl font-bold mb-4">
              Ready to Step Into Style?
            </h2>
            <p className="text-pink-100 mb-6 leading-relaxed">
              Jelajahi koleksi sepatu wanita terlengkap kami dan temukan sepatu yang sempurna untuk gaya hidup Anda.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center" role="navigation">
              <a
                href="/products"
                className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                aria-label="Browse our complete shoe collection"
              >
                Shop Our Collection
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                aria-label="Get in touch with our team"
              >
                Contact Us
              </a>
            </nav>
          </aside>
        </div>
      </main>
    </>
  )
}
