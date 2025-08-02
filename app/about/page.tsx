import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Tentang Kami - NAA Shoes | Sepatu Wanita Modern & Berkualitas",
  description: "Pelajari tentang NAA Shoes - brand sepatu wanita terpercaya Indonesia. Temukan misi kami menyediakan sepatu berkualitas tinggi, stylish, dan nyaman untuk wanita modern usia 21-40.",
  keywords: ["tentang NAA Shoes", "sepatu wanita", "perusahaan sepatu", "brand fashion", "sepatu berkualitas", "footwear nyaman"],
  openGraph: {
    title: "Tentang Kami - NAA Shoes",
    description: "Pelajari tentang NAA Shoes - brand sepatu wanita terpercaya yang menyediakan kualitas dan kenyamanan",
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

      <main id="main-content" role="main">
        
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-br from-pink-50 via-white to-rose-50 overflow-hidden"
          role="banner"
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Hero Text */}
              <div className="text-center lg:text-left">
                <h1 
                  id="hero-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Kami</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                  Sepatu yang Dirancang untuk Wanita Modern
                </p>
                
                <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Kami memahami bahwa setiap langkah wanita modern adalah perjalanan menuju kesuksesan. 
                  NAA Shoes hadir untuk mendampingi setiap perjalanan Anda dengan sepatu yang menggabungkan 
                  gaya, kenyamanan, dan kualitas terbaik.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="/products"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label="Jelajahi koleksi sepatu kami"
                  >
                    Jelajahi Koleksi
                  </a>
                  <a
                    href="#our-story"
                    className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label="Baca cerita lengkap kami"
                  >
                    Cerita Kami
                  </a>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&h=750&fit=crop&crop=center"
                    alt="Wanita modern memakai sepatu flat NAA Shoes dengan gaya elegan"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Overlay dengan gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-200 rounded-full opacity-60 blur-xl"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-200 rounded-full opacity-40 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section 
          id="our-story"
          className="py-16 sm:py-20 lg:py-24 bg-white"
          aria-labelledby="story-heading"
          role="region"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 id="story-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Cerita <span className="text-pink-600">Perjalanan</span> Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Dari mimpi sederhana hingga menjadi brand sepatu wanita terpercaya di Indonesia
              </p>
            </header>

            <div className="prose prose-lg prose-pink max-w-none">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 sm:p-10 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Awal Mula</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  NAA Shoes lahir dari pengalaman pribadi pendiri kami yang kesulitan menemukan sepatu 
                  yang benar-benar nyaman namun tetap stylish untuk aktivitas sehari-hari. Sebagai wanita 
                  karir yang aktif, kami memahami pentingnya memiliki sepatu yang dapat mendukung mobilitas 
                  tinggi tanpa mengorbankan penampilan.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Didirikan pada tahun 2020, NAA Shoes dimulai dengan visi sederhana: menciptakan sepatu 
                  yang memahami kebutuhan wanita modern Indonesia. Kami percaya bahwa setiap wanita berhak 
                  merasakan kenyamanan dan percaya diri dalam setiap langkahnya.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Inovasi Berkelanjutan</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Kami terus berinovasi dalam teknologi dan desain, menggunakan material berkualitas 
                    tinggi dan teknik pembuatan terdepan untuk menghadirkan sepatu yang sempurna.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Komunitas yang Kuat</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Lebih dari sekadar brand, kami membangun komunitas wanita yang saling mendukung 
                    dan menginspirasi untuk terus berkarya dan meraih impian.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section 
          className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-pink-50"
          aria-labelledby="mission-vision-heading"
          role="region"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 id="mission-vision-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Misi & <span className="text-pink-600">Visi</span> Kami
              </h2>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <article className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300" role="article">
                <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Menghadirkan sepatu berkualitas tinggi yang memadukan gaya, kenyamanan, dan keterjangkuan 
                  untuk mendukung setiap langkah wanita modern Indonesia dalam meraih impian dan kesuksesan mereka.
                </p>
              </article>
              
              <article className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300" role="article">
                <div className="w-16 h-16 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Menjadi brand sepatu wanita terdepan di Indonesia yang dikenal karena inovasi desain, 
                  kualitas material terbaik, dan komitmen untuk memberdayakan setiap wanita melalui kepercayaan diri.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section 
          className="py-16 sm:py-20 lg:py-24 bg-white"
          aria-labelledby="values-heading"
          role="region"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Nilai-Nilai <span className="text-pink-600">Kami</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Prinsip-prinsip yang menjadi fondasi dalam setiap produk dan layanan yang kami berikan
              </p>
            </header>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              role="list"
              aria-label="Company values"
            >
              <article className="text-center group" role="listitem">
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  role="img"
                  aria-label="Quality First icon"
                >
                  <svg 
                    className="w-10 h-10 text-pink-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kualitas Terdepan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menggunakan material premium dan standar produksi internasional untuk menjamin 
                  setiap sepatu memenuhi ekspektasi tertinggi pelanggan kami.
                </p>
              </article>
              
              <article className="text-center group" role="listitem">
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  role="img"
                  aria-label="Customer Love icon"
                >
                  <svg 
                    className="w-10 h-10 text-rose-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cinta Pelanggan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mengutamakan kepuasan dan kebahagiaan pelanggan melalui produk berkualitas 
                  dan layanan yang ramah, responsif, dan penuh perhatian.
                </p>
              </article>
              
              <article className="text-center group" role="listitem">
                <div 
                  className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  role="img"
                  aria-label="Innovation icon"
                >
                  <svg 
                    className="w-10 h-10 text-purple-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inovasi Berkelanjutan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Terus berinovasi dalam desain, teknologi, dan material untuk menciptakan 
                  sepatu yang semakin nyaman, tahan lama, dan sesuai dengan tren masa kini.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-pink-600 to-rose-600 text-white"
          role="complementary"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
              Siap Melangkah Bersama Kami?
            </h2>
            <p className="text-xl text-pink-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Temukan sepatu yang sempurna untuk menemani setiap perjalanan hidup Anda. 
              Bergabunglah dengan ribuan wanita yang telah mempercayai NAA Shoes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-pink-600 font-semibold px-8 py-4 rounded-lg hover:bg-pink-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-600"
                aria-label="Jelajahi koleksi lengkap sepatu kami"
              >
                Jelajahi Koleksi Lengkap
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-600"
                aria-label="Hubungi tim customer service kami"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
