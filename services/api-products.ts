// API-based product service
export interface APIProduct {
  id: number
  name: string
  description?: string | null
  price: number
  originalPrice?: number | null
  categoryId: number
  isNew: boolean
  isOnSale: boolean
  isActive: boolean
  material?: string | null
  weight?: number | null
  createdAt: string
  updatedAt: string
  category: {
    id: number
    name: string
    slug: string
  }
  images: {
    id: number
    url: string
    altText?: string | null
    isPrimary: boolean
    order: number
  }[]
  colors: {
    colorId: number
    color: {
      id: number
      name: string
      hexCode: string
    }
  }[]
  sizes: {
    sizeId: number
    stock: number
    size: {
      id: number
      value: number
    }
  }[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  isActive: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: string
  orderBy?: string
  order?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  }
}

// Convert API product to frontend product format
function convertAPIProductToProduct(apiProduct: APIProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    description: apiProduct.description || '',
    price: apiProduct.price,
    originalPrice: apiProduct.originalPrice,
    image: apiProduct.images.find(img => img.isPrimary)?.url || apiProduct.images[0]?.url || '/placeholder-product.jpg',
    category: apiProduct.category.name,
    colors: apiProduct.colors.map(c => c.color.name),
    sizes: apiProduct.sizes.map(s => s.size.value).sort((a, b) => a - b),
    isNew: apiProduct.isNew,
    isOnSale: apiProduct.isOnSale,
    isActive: apiProduct.isActive
  }
}

// Get all categories from API
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const categories: Category[] = await response.json()
    const categoryNames = categories.map(cat => cat.name)
    return ['All', ...categoryNames]
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Fallback to default categories
    return ['All', 'Sneakers', 'High Heels', 'Flats', 'Boots', 'Sandals']
  }
}

// Get products from API
export const getProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const apiProducts: APIProduct[] = await response.json()
    return apiProducts.map(convertAPIProductToProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Get paginated products from API
export const getPaginatedProducts = async (params: PaginationParams): Promise<PaginatedResponse<any>> => {
  try {
    const { page = 1, limit = 12, category, search, sortBy } = params
    
    // Build query parameters - send all filters to API
    const queryParams = new URLSearchParams({
      limit: limit.toString()
    })

    // Add category filter to API call
    if (category && category !== 'All') {
      queryParams.append('category', category)
    }

    // Add search filter to API call
    if (search) {
      queryParams.append('search', search)
    }

    // Add sort filter to API call
    if (sortBy) {
      queryParams.append('sortBy', sortBy)
    }

    const response = await fetch(`/api/products?${queryParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const apiProducts: APIProduct[] = await response.json()
    // All filtering and sorting now handled by API

    // Calculate pagination
    const totalItems = apiProducts.length
    const totalPages = Math.ceil(totalItems / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    // Get page data and convert to frontend format
    const data = apiProducts
      .slice(startIndex, endIndex)
      .map(convertAPIProductToProduct)

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit
      }
    }
  } catch (error) {
    console.error('Error fetching paginated products:', error)
    // Return empty result on error
    return {
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 12
      }
    }
  }
}

// Get product by ID from API
export const getProductById = async (id: number): Promise<any | null> => {
  try {
    const response = await fetch(`/api/products/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch product')
    }
    
    const apiProduct: APIProduct = await response.json()
    return convertAPIProductToProduct(apiProduct)
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Get featured products from API
export const getFeaturedProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/products?featured=true&limit=6&orderBy=createdAt&order=desc')
    if (!response.ok) {
      throw new Error('Failed to fetch featured products')
    }
    
    const apiProducts: APIProduct[] = await response.json()
    return apiProducts
      .slice(0, 6)
      .map(convertAPIProductToProduct)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Helper functions for sorting
function getOrderBy(sortBy?: string): string {
  switch (sortBy) {
    case 'price-low':
    case 'price-high':
      return 'price'
    case 'name':
      return 'name'
    case 'newest':
      return 'createdAt'
    default:
      return 'createdAt'
  }
}

function getOrder(sortBy?: string): string {
  switch (sortBy) {
    case 'price-low':
      return 'asc'
    case 'price-high':
      return 'desc'
    case 'name':
      return 'asc'
    case 'newest':
      return 'desc'
    default:
      return 'desc'
  }
}

// Get products by category
export const getProductsByCategory = async (category: string): Promise<any[]> => {
  try {
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const apiProducts: APIProduct[] = await response.json()
    let filteredProducts = apiProducts
    
    if (category !== 'All') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.name === category
      )
    }
    
    return filteredProducts.map(convertAPIProductToProduct)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Search products
export const searchProducts = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch('/api/products')
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const apiProducts: APIProduct[] = await response.json()
    const lowercaseQuery = query.toLowerCase()

    const filteredProducts = apiProducts
      .filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowercaseQuery)) ||
        product.category.name.toLowerCase().includes(lowercaseQuery)
      )
    
    return filteredProducts.map(convertAPIProductToProduct)
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}
