import { Metadata } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getBlogCategories } from '../../services/blog'
import { BlogPost, BlogCategory } from '../../types/blog'

export const metadata: Metadata = {
  title: "Fashion Blog - Tips & Tren Sepatu Wanita | NAA Shoes",
  description: "Blog fashion terlengkap tentang tips perawatan sepatu, tren terbaru, styling guide, dan panduan memilih sepatu wanita. Update artikel fashion mingguan dari para ahli.",
  keywords: ["blog fashion", "tips sepatu", "tren sepatu 2024", "perawatan sepatu", "styling sepatu", "fashion wanita"],
  openGraph: {
    title: "Fashion Blog - Tips & Tren Sepatu Wanita",
    description: "Blog fashion terlengkap tentang tips dan tren sepatu wanita terbaru",
    url: "https://naashoes.com/blog",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Fashion Blog NAA Shoes",
      },
    ],
  },
  alternates: {
    canonical: "https://naashoes.com/blog",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "NAA Shoes Fashion Blog",
  "description": "Blog fashion tentang tips, tren, dan panduan sepatu wanita",
  "url": "https://naashoes.com/blog",
  "publisher": {
    "@type": "Organization",
    "name": "NAA Shoes",
    "logo": "https://naashoes.com/logo.png"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "Blog Posts",
    "numberOfItems": 6
  }
}

'use client'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [postsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ])
        setPosts(postsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === categories.find(cat => cat.slug === selectedCategory)?.name)

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'all')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Loading blog posts...</span>
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
      
      <main className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Fashion Blog
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
              Tips, tren, dan inspirasi seputar dunia sepatu wanita. Dapatkan insight terbaru dari para ahli fashion.
            </p>
          </header>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'all' && (
            <section className="mb-12" aria-labelledby="featured-post-heading">
              <h2 id="featured-post-heading" className="sr-only">Featured Article</h2>
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 sm:h-80 lg:h-full min-h-[400px]">
                    <Image
                      src={featuredPost.image}
                      alt={`Featured article image: ${featuredPost.title}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="text-pink-600 font-medium text-sm uppercase tracking-wide">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={`${featuredPost.author.name} - Author photo`}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                          <p className="text-sm text-gray-500">{formatDate(featuredPost.publishedAt)}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        aria-label={`Read full article: ${featuredPost.title}`}
                      >
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          )}

          {/* Category Filter */}
          <nav className="mb-8" aria-label="Blog category filter">
            <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 touch-manipulation ${
                    selectedCategory === category.slug
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                  role="tab"
                  aria-selected={selectedCategory === category.slug}
                  aria-label={`Filter by ${category.name} category, ${category.count} posts`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </nav>

          {/* Blog Posts Grid */}
          {regularPosts.length > 0 ? (
            <section aria-labelledby="blog-posts-heading">
              <h2 id="blog-posts-heading" className="sr-only">Blog Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list">
                {regularPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300" role="listitem">
                    <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read article: ${post.title}`}>
                      <div className="relative h-48 sm:h-56">
                        <Image
                          src={post.image}
                          alt={`Article image: ${post.title}`}
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
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 hover:text-pink-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={post.author.avatar}
                              alt={`${post.author.name} - Author photo`}
                              width={32}
                              height={32}
                              className="rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{post.author.name}</p>
                              <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime} min
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada artikel</h3>
                <p className="text-gray-600">
                  Belum ada artikel untuk kategori yang dipilih.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
