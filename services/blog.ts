import { BlogPost, BlogCategory } from '../types/blog'

// Get base URL for API calls
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return ''
  }
  // Server-side
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

// API functions using the new database endpoints
export const getBlogPosts = async (page?: number, limit?: number): Promise<{ blogs: BlogPost[], pagination?: any }> => {
  try {
    const baseUrl = getBaseUrl()
    const params = new URLSearchParams()

    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())

    const url = `${baseUrl}/api/blogs${params.toString() ? `?${params}` : ''}`
    const response = await fetch(url, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }

    const data = await response.json()

    // If pagination info is returned, return the full response
    if (data.pagination) {
      return data
    }

    // Otherwise return in the expected format for backward compatibility
    return { blogs: data.blogs || data }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { blogs: [] }
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export const getFeaturedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs?featured=true`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch featured blog posts')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export const getBlogPostsByCategory = async (category: string, page?: number, limit?: number): Promise<{ blogs: BlogPost[], pagination?: any }> => {
  try {
    const params = new URLSearchParams()
    if (category && category !== 'all') {
      params.append('category', category)
    }
    if (page) params.append('page', page.toString())
    if (limit) params.append('limit', limit.toString())

    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs?${params}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts by category')
    }

    const data = await response.json()

    // If pagination info is returned, return the full response
    if (data.pagination) {
      return data
    }

    // Otherwise return in the expected format for backward compatibility
    return { blogs: data.blogs || data }
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return { blogs: [] }
  }
}

export const getRecentBlogPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/blogs?recent=true&limit=${limit}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recent blog posts')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    return []
  }
}

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/blog-categories`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blog categories')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}
