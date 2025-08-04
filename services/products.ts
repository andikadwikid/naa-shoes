import { Product } from '../types/product'

export const categories = [
  'All',
  'Sneakers',
  'High Heels',
  'Flats',
  'Boots',
  'Sandals'
]

// Mock products data - in real app, this would come from API
const productsData = [
  {
    id: 1,
    name: "Elegant Rose Gold Heels",
    slug: "elegant-rose-gold-heels",
    price: 850000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "Sepatu hak tinggi dengan warna rose gold yang elegan, perfect untuk acara formal dan pesta.",
    colors: ["Rose Gold", "Silver", "Black"],
    sizes: [36, 37, 38, 39, 40],
    isNew: false,
    isOnSale: true,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    categoryId: 1,
    productInventories: [],
    galleryImages: [],
    sizeGuides: []
  },
  {
    id: 2,
    name: "Comfortable White Sneakers",
    price: 650000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers putih yang nyaman untuk aktivitas sehari-hari dengan design modern dan trendy.",
    colors: ["White", "Cream", "Light Pink"],
    sizes: [36, 37, 38, 39, 40, 41],
    isNew: true
  },
  {
    id: 3,
    name: "Classic Black Boots",
    price: 950000,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Boot hitam klasik yang cocok untuk cuaca dingin dan memberikan kesan edgy.",
    colors: ["Black", "Brown", "Dark Gray"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 4,
    name: "Minimalist Nude Flats",
    price: 450000,
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Flat shoes dengan warna nude yang minimalis, cocok untuk outfit apapun.",
    colors: ["Nude", "Beige", "Light Brown"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 5,
    name: "Summer Coral Sandals",
    price: 380000,
    originalPrice: 500000,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Sandal dengan warna coral yang cerah, perfect untuk musim panas dan liburan.",
    colors: ["Coral", "Pink", "Peach"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  },
  {
    id: 6,
    name: "Sporty Pink Sneakers",
    price: 720000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers pink yang sporty dengan teknologi cushioning untuk kenyamanan maksimal.",
    colors: ["Pink", "White", "Gray"],
    sizes: [36, 37, 38, 39, 40, 41],
    isNew: true
  },
  {
    id: 7,
    name: "Luxury Patent Heels",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "High heels mewah dengan material patent leather yang berkilau dan elegan.",
    colors: ["Black", "Red", "Navy"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 8,
    name: "Bohemian Style Sandals",
    price: 420000,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Sandal dengan style bohemian yang unik, cocok untuk tampilan kasual yang chic.",
    colors: ["Brown", "Tan", "Natural"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 9,
    name: "Office Ready Flats",
    price: 580000,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Flat shoes yang profesional dan nyaman untuk digunakan di kantor sepanjang hari.",
    colors: ["Black", "Navy", "Gray"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 10,
    name: "Trendy Ankle Boots",
    price: 890000,
    originalPrice: 1100000,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Ankle boots trendy dengan detail yang menarik untuk tampilan fashionable.",
    colors: ["Black", "Tan", "Wine"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  },
  {
    id: 11,
    name: "Crystal Platform Heels",
    price: 1450000,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "Platform heels dengan detail crystal yang mewah untuk acara spesial.",
    colors: ["Silver", "Gold", "Clear"],
    sizes: [36, 37, 38, 39, 40],
    isNew: true
  },
  {
    id: 12,
    name: "Urban Street Sneakers",
    price: 780000,
    originalPrice: 950000,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers dengan design urban yang cocok untuk street style.",
    colors: ["Black", "White", "Gray"],
    sizes: [36, 37, 38, 39, 40, 41],
    isOnSale: true
  },
  {
    id: 13,
    name: "Leather Combat Boots",
    price: 1150000,
    image: "https://images.unsplash.com/photo-1608256246200-53e8b47b2579?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Combat boots dari kulit asli dengan design yang tangguh dan stylish.",
    colors: ["Black", "Brown", "Dark Green"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 14,
    name: "Pointed Toe Flats",
    price: 520000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Flat shoes dengan pointed toe yang elegan untuk tampilan profesional.",
    colors: ["Black", "Nude", "Navy"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 15,
    name: "Strappy Block Sandals",
    price: 680000,
    image: "https://images.unsplash.com/photo-1594047792946-30dc0a97d4c9?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Sandal dengan tali-tali stylish dan block heel yang nyaman.",
    colors: ["Nude", "Black", "Tan"],
    sizes: [36, 37, 38, 39, 40],
    isNew: true
  },
  {
    id: 16,
    name: "Retro Running Sneakers",
    price: 850000,
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Sneakers dengan design retro yang nyaman untuk aktivitas running.",
    colors: ["White", "Blue", "Pink"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 17,
    name: "Stiletto Pumps",
    price: 950000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "Stiletto pumps klasik yang timeless untuk berbagai kesempatan.",
    colors: ["Red", "Black", "Nude"],
    sizes: [36, 37, 38, 39, 40],
    isOnSale: true
  },
  {
    id: 18,
    name: "Chelsea Boots",
    price: 1050000,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Chelsea boots klasik dengan elastic sides yang mudah digunakan.",
    colors: ["Black", "Brown", "Burgundy"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 19,
    name: "Ballet Flats",
    price: 420000,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Ballet flats yang feminin dan nyaman untuk penggunaan sehari-hari.",
    colors: ["Pink", "Black", "Beige"],
    sizes: [36, 37, 38, 39, 40, 41],
    isNew: true
  },
  {
    id: 20,
    name: "Platform Sandals",
    price: 750000,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    category: "Sandals",
    description: "Platform sandals yang memberikan tinggi ekstra dengan kenyamanan maksimal.",
    colors: ["Beige", "White", "Black"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 21,
    name: "High-Top Canvas Sneakers",
    price: 580000,
    originalPrice: 720000,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "High-top sneakers dari canvas dengan design kasual yang trendy.",
    colors: ["White", "Black", "Navy"],
    sizes: [36, 37, 38, 39, 40, 41],
    isOnSale: true
  },
  {
    id: 22,
    name: "Wedge Heel Pumps",
    price: 820000,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&h=400&fit=crop",
    category: "High Heels",
    description: "Wedge pumps yang memberikan kenyamanan lebih dibanding stiletto.",
    colors: ["Tan", "Black", "Navy"],
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 23,
    name: "Hiking Boots",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=400&h=400&fit=crop",
    category: "Boots",
    description: "Hiking boots yang tahan lama untuk petualangan outdoor.",
    colors: ["Brown", "Black", "Olive"],
    sizes: [36, 37, 38, 39, 40],
    isNew: true
  },
  {
    id: 24,
    name: "Slip-on Sneakers",
    price: 650000,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    category: "Sneakers",
    description: "Slip-on sneakers yang praktis dan nyaman untuk aktivitas santai.",
    colors: ["Gray", "White", "Black"],
    sizes: [36, 37, 38, 39, 40, 41]
  },
  {
    id: 25,
    name: "Mary Jane Flats",
    price: 480000,
    originalPrice: 620000,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    category: "Flats",
    description: "Mary Jane flats dengan strap yang cute dan feminine.",
    colors: ["Black", "Red", "Nude"],
    sizes: [36, 37, 38, 39, 40, 41],
    isOnSale: true
  }
]

// Pagination interface
export interface PaginationParams {
  page: number
  limit: number
  category?: string
  search?: string
  sortBy?: string
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

// Simulate API calls with async functions
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData as Product[]
}

// Get paginated products
export const getPaginatedProducts = async (params: PaginationParams): Promise<PaginatedResponse<Product>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150))

  const { page = 1, limit = 12, category, search, sortBy } = params

  let filtered = productsData

  // Filter by category
  if (category && category !== 'All') {
    filtered = filtered.filter(product => product.category === category)
  }

  // Filter by search
  if (search) {
    const lowercaseQuery = search.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Sort products
  if (sortBy) {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          // Sort by isNew first, then by id (assuming newer products have higher IDs)
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return b.id - a.id
        default:
          return 0
      }
    })
  }

  // Calculate pagination
  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  // Get page data
  const data = filtered.slice(startIndex, endIndex)

  return {
    data: data as Product[],
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      limit
    }
  }
}

export const getProductById = async (id: number): Promise<Product | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))

  // Validate ID
  if (!id || isNaN(id) || id <= 0) {
    return null
  }

  const product = productsData.find(product => product.id === id)
  return (product as Product) || null
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  if (category === 'All') return productsData as Product[]
  return productsData.filter(product => product.category === category) as Product[]
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData.filter(product => product.isNew || product.isOnSale).slice(0, 6) as Product[]
}

export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  const lowercaseQuery = query.toLowerCase()
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  ) as Product[]
}

// Categories helper
export const getCategories = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 50))
  return categories
}

// Export products data for backward compatibility
export const products = productsData
export const featuredProducts = productsData.filter(product => product.isNew || product.isOnSale).slice(0, 6)
