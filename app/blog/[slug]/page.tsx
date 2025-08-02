import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRecentBlogPosts } from '../../../services/blog'
import { BlogPost } from '../../../types/blog'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Article Not Found | NAA Shoes Blog',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${post.title} | NAA Shoes Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://naashoes.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.image,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://naashoes.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params
  const [post, recentPosts] = await Promise.all([
    getBlogPostBySlug(resolvedParams.slug),
    getRecentBlogPosts(4)
  ])
  
  if (!post) {
    notFound()
  }

  // Filter out current post from recent posts
  const filteredRecentPosts = recentPosts.filter(p => p.slug !== resolvedParams.slug).slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "id-ID",
    "about": {
      "@type": "Thing",
      "name": "Sepatu Wanita",
      "description": "Fashion dan trend sepatu wanita terbaru"
    }
  }

  // Generate table of contents from headings
  const headings = post.content.match(/<h[2-6][^>]*>(.*?)<\/h[2-6]>/gi) || []
  const tableOfContents = headings.map((heading, index) => {
    const text = heading.replace(/<[^>]*>/g, '')
    const level = parseInt(heading.charAt(2))
    const id = `heading-${index + 1}`
    return { text, level, id }
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Scroll to top on page load */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.scrollTo(0, 0);`
        }}
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav 
            className="px-3 sm:px-4 lg:px-6 xl:px-8 pt-4 sm:pt-6 lg:pt-8" 
            aria-label="Breadcrumb navigation"
            role="navigation"
          >
            <ol 
              className="flex items-center space-x-2 text-sm text-gray-600"
              itemScope 
              itemType="https://schema.org/BreadcrumbList"
            >
              <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <Link 
                  href="/" 
                  className="hover:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                  itemProp="item"
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              
              <li aria-hidden="true" role="presentation">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              
              <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <Link 
                  href="/blog" 
                  className="hover:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                  itemProp="item"
                >
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              
              <li aria-hidden="true" role="presentation">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              
              <li 
                className="text-gray-900 font-medium truncate" 
                aria-current="page"
                itemScope 
                itemType="https://schema.org/ListItem" 
                itemProp="itemListElement"
              >
                <span itemProp="name">{post.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Main Content Area */}
          <main 
            id="main-content"
            className="px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8"
            role="main"
            aria-labelledby="article-title"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Primary Content */}
              <div className="lg:col-span-3">
                <article 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  itemScope 
                  itemType="https://schema.org/BlogPosting"
                  role="article"
                  aria-labelledby="article-title"
                >
                  {/* Article Header */}
                  <header className="p-6 sm:p-8 lg:p-10 pb-0">
                    {/* Category Badge */}
                    <div className="mb-6">
                      <span 
                        className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide" 
                        itemProp="articleSection"
                        role="text"
                        aria-label={`Article category: ${post.category}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Article Title */}
                    <h1 
                      id="article-title"
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" 
                      itemProp="headline"
                    >
                      {post.title}
                    </h1>
                    
                    {/* Article Meta Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                      {/* Author Information */}
                      <div 
                        className="flex items-center space-x-4" 
                        itemScope 
                        itemType="https://schema.org/Person" 
                        itemProp="author"
                        role="group"
                        aria-label="Author information"
                      >
                        <Image
                          src={post.author.avatar}
                          alt=""
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                          itemProp="image"
                          role="img"
                        />
                        <div>
                          <p className="font-semibold text-gray-900" itemProp="name">
                            {post.author.name}
                          </p>
                          <time 
                            dateTime={post.publishedAt} 
                            className="text-gray-600 text-sm" 
                            itemProp="datePublished"
                            aria-label={`Published on ${formatDate(post.publishedAt)}`}
                          >
                            {formatDate(post.publishedAt)}
                          </time>
                        </div>
                      </div>
                      
                      {/* Reading Time */}
                      <div 
                        className="flex items-center text-gray-600"
                        role="group"
                        aria-label="Reading time information"
                      >
                        <svg 
                          className="w-5 h-5 mr-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span 
                          itemProp="timeRequired" 
                          content={`PT${post.readTime}M`}
                          aria-label={`Estimated reading time: ${post.readTime} minutes`}
                        >
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                  </header>

                  {/* Featured Image */}
                  <figure 
                    className="relative h-64 sm:h-80 lg:h-96 mx-6 sm:mx-8 lg:mx-10 mb-8 rounded-xl overflow-hidden"
                    role="img"
                    aria-labelledby="featured-image-caption"
                  >
                    <Image
                      src={post.image}
                      alt={`Featured image for article: ${post.title}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      itemProp="image"
                    />
                    <figcaption id="featured-image-caption" className="sr-only">
                      Featured image for the article: {post.title}
                    </figcaption>
                  </figure>

                  {/* Table of Contents */}
                  {tableOfContents.length > 0 && (
                    <nav 
                      className="mx-6 sm:mx-8 lg:mx-10 mb-8 p-6 bg-gray-50 rounded-xl"
                      aria-labelledby="toc-heading"
                      role="navigation"
                    >
                      <h2 id="toc-heading" className="text-lg font-semibold text-gray-900 mb-4">
                        Daftar Isi
                      </h2>
                      <ol className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <li 
                            key={index}
                            className={`${item.level === 2 ? 'ml-0' : 'ml-4'}`}
                          >
                            <a 
                              href={`#${item.id}`}
                              className="text-pink-600 hover:text-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded text-sm"
                              aria-label={`Jump to section: ${item.text}`}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  {/* Article Content */}
                  <section 
                    className="px-6 sm:px-8 lg:px-10 mb-8"
                    role="region"
                    aria-labelledby="article-content-heading"
                  >
                    <h2 id="article-content-heading" className="sr-only">Article Content</h2>
                    <div 
                      className="text-black prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-black prose-p:leading-relaxed prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-ul:text-black prose-li:text-black"
                      itemProp="articleBody"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </section>

                  {/* Article Footer */}
                  <footer className="px-6 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10">
                    {/* Tags Section */}
                    <section 
                      className="mb-8"
                      aria-labelledby="tags-heading"
                      role="region"
                    >
                      <h2 id="tags-heading" className="text-lg font-semibold text-gray-900 mb-4">
                        Tags Artikel
                      </h2>
                      <div className="flex flex-wrap gap-2" role="list" aria-label="Article tags">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-pink-100 hover:text-pink-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            itemProp="keywords"
                            role="listitem"
                            tabIndex={0}
                            aria-label={`Tag: ${tag}`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </section>

                    {/* Call to Action */}
                    <aside 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 sm:p-8 text-center text-white"
                      role="complementary"
                      aria-labelledby="cta-heading"
                    >
                      <h2 id="cta-heading" className="text-xl sm:text-2xl font-bold mb-4">
                        Temukan Sepatu Impian Anda
                      </h2>
                      <p className="text-pink-100 mb-6">
                        Jelajahi koleksi sepatu wanita terlengkap dengan berbagai style dan brand terpercaya.
                      </p>
                      <Link
                        href="/products"
                        className="inline-block bg-white text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-600"
                        aria-label="Browse our complete shoe collection"
                      >
                        Lihat Koleksi Produk
                      </Link>
                    </aside>
                  </footer>
                </article>
              </div>

              {/* Sidebar */}
              <aside 
                className="lg:col-span-1"
                role="complementary"
                aria-label="Blog sidebar with related articles and categories"
              >
                <div className="sticky top-8 space-y-8">
                  
                  {/* Recent Posts */}
                  <section 
                    className="bg-white rounded-xl shadow-sm p-6"
                    aria-labelledby="recent-posts-heading"
                    role="region"
                  >
                    <h2 id="recent-posts-heading" className="text-lg font-semibold text-gray-900 mb-6">
                      Artikel Terbaru
                    </h2>
                    <div className="space-y-4" role="list" aria-label="Recent blog posts">
                      {filteredRecentPosts.map((recentPost) => (
                        <article
                          key={recentPost.id}
                          role="listitem"
                          className="group"
                        >
                          <Link
                            href={`/blog/${recentPost.slug}`}
                            className="flex space-x-3 p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            aria-label={`Read article: ${recentPost.title}`}
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={recentPost.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight mb-1">
                                {recentPost.title}
                              </h3>
                              <time 
                                dateTime={recentPost.publishedAt} 
                                className="text-xs text-gray-500"
                                aria-label={`Published on ${formatDate(recentPost.publishedAt)}`}
                              >
                                {formatDate(recentPost.publishedAt)}
                              </time>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </section>

                  {/* Categories Navigation */}
                  <nav 
                    className="bg-white rounded-xl shadow-sm p-6"
                    aria-labelledby="categories-heading"
                    role="navigation"
                  >
                    <h2 id="categories-heading" className="text-lg font-semibold text-gray-900 mb-6">
                      Kategori Blog
                    </h2>
                    <ul className="space-y-2" role="list">
                      {[
                        { name: 'Fashion Trends', slug: 'fashion-trends' },
                        { name: 'Care Tips', slug: 'care-tips' },
                        { name: 'Health & Fit', slug: 'health-fit' },
                        { name: 'Styling Tips', slug: 'styling-tips' },
                        { name: 'Shopping Guide', slug: 'shopping-guide' },
                        { name: 'Sustainability', slug: 'sustainability' }
                      ].map((category) => (
                        <li key={category.slug} role="listitem">
                          <Link
                            href={`/blog?category=${category.slug}`}
                            className="block text-gray-700 hover:text-pink-600 transition-colors py-2 px-3 -mx-3 rounded-lg hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            aria-label={`Browse ${category.name} articles`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                </div>
              </aside>

            </div>
          </main>
        </div>
      </div>
    </>
  )
}
