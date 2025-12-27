// Blog related types
export interface Author {
  id: number
  name: string
  email: string
  avatar?: string
  bio?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    blogPosts: number
  }
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    blogPosts: number
  }
}

export interface Tag {
  id: number
  name: string
  slug: string
  createdAt: string
  _count?: {
    blogTags: number
  }
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  isPublished: boolean
  isFeatured: boolean
  readTime?: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
  authorId: number
  blogCategoryId: number
  author: Author
  blogCategory: BlogCategory
  tags: Tag[]
}

export interface BlogTag {
  id: number
  blogPostId: number
  tagId: number
  blogPost: BlogPost
  tag: Tag
}

// Form data types
export interface AuthorFormData {
  name: string
  email: string
  avatar?: string
  bio?: string
  isActive: boolean
}

export interface BlogCategoryFormData {
  name: string
  slug: string
  description?: string
  isActive: boolean
}

export interface TagFormData {
  name: string
  slug: string
}

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  isPublished: boolean
  isFeatured: boolean
  readTime?: number
  publishedAt?: string
  authorId: number
  blogCategoryId: number
  tagIds: number[]
}

// API response types for blog
export interface BlogApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface BlogPaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  error?: string
}

// Frontend blog types (for public blog pages)
export interface PublicBlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  image?: string
  readTime?: number
  publishedAt: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  category: {
    name: string
    slug: string
  }
  tags: Array<{
    name: string
    slug: string
  }>
}

export interface BlogListProps {
  posts: PublicBlogPost[]
  categories: BlogCategory[]
  tags: Tag[]
  currentCategory?: string
  currentTag?: string
  pagination: {
    page: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface BlogPostPageProps {
  post: PublicBlogPost
  relatedPosts: PublicBlogPost[]
  categories: BlogCategory[]
}

// Search and filter types
export interface BlogFilters {
  category?: string
  tag?: string
  author?: string
  search?: string
  isPublished?: boolean
  isFeatured?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface BlogSearchParams {
  q?: string
  category?: string
  tag?: string
  page?: string
}

// RSS and SEO types
export interface BlogSEOData {
  title: string
  description: string
  keywords: string[]
  image?: string
  author: string
  publishedAt: string
  modifiedAt: string
  url: string
  type: 'article' | 'website'
}

export interface RSSFeedItem {
  title: string
  description: string
  link: string
  pubDate: string
  author: string
  categories: string[]
}
