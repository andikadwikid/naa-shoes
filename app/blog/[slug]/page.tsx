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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading article...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/blog" className="hover:text-pink-600 transition-colors">
              Blog
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
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
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-gray-600">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime} min read
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-10 mb-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
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
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 sm:p-8 text-center text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Temukan Sepatu Impian Anda
              </h3>
              <p className="text-pink-100 mb-6">
                Jelajahi koleksi sepatu wanita terlengkap dengan berbagai style dan brand terpercaya.
              </p>
              <Link
                href="/products"
                className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Lihat Koleksi Produk
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Artikel Terbaru</h3>
                <div className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <Link
                      key={recentPost.id}
                      href={`/blog/${recentPost.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={recentPost.image}
                            alt={recentPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight mb-1">
                            {recentPost.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(recentPost.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Kategori</h3>
                <div className="space-y-2">
                  {['Fashion Trends', 'Care Tips', 'Health & Fit', 'Styling Tips', 'Shopping Guide', 'Sustainability'].map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-gray-700 hover:text-pink-600 transition-colors py-1"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
