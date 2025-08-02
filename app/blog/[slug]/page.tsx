'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRecentBlogPosts } from '../../../services/blog'
import { BlogPost } from '../../../types/blog'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

// Note: generateMetadata is removed since this is now a client component

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [postData, recentPostsData] = await Promise.all([
          getBlogPostBySlug(resolvedParams.slug),
          getRecentBlogPosts(4)
        ])
        
        if (!postData) {
          notFound()
        }
        
        setPost(postData)
        // Filter out current post from recent posts
        setRecentPosts(recentPostsData.filter(p => p.slug !== resolvedParams.slug).slice(0, 3))
      } catch (error) {
        console.error('Error fetching blog post:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [resolvedParams.slug])

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
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading article...</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "image": post.author.avatar
    },
    "publisher": {
      "@type": "Organization",
      "name": "NAA Shoes",
      "logo": "https://naashoes.com/logo.png"
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://naashoes.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
    "timeRequired": `PT${post.readTime}M`
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-pink-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-pink-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-900 font-medium truncate" aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Header */}
              <header className="mb-8">
                <div className="mb-4">
                  <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={post.author.avatar}
                      alt={`${post.author.name} - Author photo`}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                      <time dateTime={post.publishedAt} className="text-gray-600">
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="relative h-64 sm:h-80 lg:h-96 mb-8 rounded-2xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={`Featured image for article: ${post.title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </figure>

              {/* Content */}
              <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10 mb-8">
                <div 
                  className="text-black prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-black prose-p:leading-relaxed prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-ul:text-black prose-li:text-black"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </section>

              {/* Tags */}
              <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8" aria-labelledby="tags-heading">
                <h2 id="tags-heading" className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <aside className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 sm:p-8 text-center text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Temukan Sepatu Impian Anda
                </h2>
                <p className="text-pink-100 mb-6">
                  Jelajahi koleksi sepatu wanita terlengkap dengan berbagai style dan brand terpercaya.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  aria-label="Browse our shoe collection"
                >
                  Lihat Koleksi Produk
                </Link>
              </aside>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Recent Posts */}
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8" aria-labelledby="recent-posts-heading">
                  <h2 id="recent-posts-heading" className="text-lg font-semibold text-gray-900 mb-6">Artikel Terbaru</h2>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.id}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                        aria-label={`Read article: ${recentPost.title}`}
                      >
                        <article className="flex space-x-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={recentPost.image}
                              alt={`Thumbnail for article: ${recentPost.title}`}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight mb-1">
                              {recentPost.title}
                            </h3>
                            <time dateTime={recentPost.publishedAt} className="text-xs text-gray-500">
                              {formatDate(recentPost.publishedAt)}
                            </time>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Categories */}
                <nav className="bg-white rounded-xl shadow-sm p-6" aria-labelledby="categories-heading">
                  <h2 id="categories-heading" className="text-lg font-semibold text-gray-900 mb-6">Kategori</h2>
                  <ul className="space-y-2">
                    {['Fashion Trends', 'Care Tips', 'Health & Fit', 'Styling Tips', 'Shopping Guide', 'Sustainability'].map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-gray-700 hover:text-pink-600 transition-colors py-1"
                          aria-label={`Browse ${category} articles`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
