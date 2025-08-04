// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: number) => `/api/products/${id}`,
  FEATURED_PRODUCTS: '/api/products?featured=true',
  SEARCH_PRODUCTS: '/api/products/search',
  PRODUCT_COUNT: '/api/products/count',
  
  // Admin Products
  ADMIN_PRODUCTS: '/api/admin/products',
  ADMIN_PRODUCT_BY_ID: (id: number) => `/api/admin/products/${id}`,
  
  // Categories
  CATEGORIES: '/api/categories',
  ADMIN_CATEGORIES: '/api/admin/categories',
  ADMIN_CATEGORY_BY_ID: (id: number) => `/api/admin/categories/${id}`,
  
  // Brands
  BRANDS: '/api/brands',
  ADMIN_BRANDS: '/api/admin/brands',
  ADMIN_BRAND_BY_ID: (id: number) => `/api/admin/brands/${id}`,
  
  // Colors
  ADMIN_COLORS: '/api/admin/colors',
  ADMIN_COLOR_BY_ID: (id: number) => `/api/admin/colors/${id}`,
  
  // Sizes
  ADMIN_SIZES: '/api/admin/sizes',
  ADMIN_SIZE_BY_ID: (id: number) => `/api/admin/sizes/${id}`,
  
  // Size Templates
  ADMIN_SIZE_TEMPLATES: '/api/admin/size-templates',
  ADMIN_SIZE_TEMPLATE_BY_ID: (id: number) => `/api/admin/size-templates/${id}`,
  
  // Blog
  BLOG_POSTS: '/api/blogs',
  BLOG_POST_BY_SLUG: (slug: string) => `/api/blogs/${slug}`,
  BLOG_CATEGORIES: '/api/blog-categories',
  
  // Admin Blog
  ADMIN_BLOG_POSTS: '/api/admin/blogs',
  ADMIN_BLOG_POST_BY_ID: (id: number) => `/api/admin/blogs/${id}`,
  ADMIN_BLOG_CATEGORIES: '/api/admin/blog-categories',
  ADMIN_AUTHORS: '/api/admin/authors',
  
  // Upload
  UPLOAD_IMAGE: '/api/admin/upload',
  VALIDATE_IMAGE: '/api/admin/validate-image',
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

// Order Status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const

export type OrderStatus = keyof typeof ORDER_STATUS

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  ADMIN_DEFAULT_LIMIT: 20,
} as const

// Image upload constraints
export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  MAX_WIDTH: 2000,
  MAX_HEIGHT: 2000,
  THUMBNAIL_SIZE: 300,
} as const

// Validation constraints
export const VALIDATION = {
  // Product
  PRODUCT_NAME_MIN: 3,
  PRODUCT_NAME_MAX: 100,
  PRODUCT_DESCRIPTION_MAX: 2000,
  PRODUCT_PRICE_MIN: 0,
  PRODUCT_PRICE_MAX: 99999999,
  
  // Category
  CATEGORY_NAME_MIN: 2,
  CATEGORY_NAME_MAX: 50,
  CATEGORY_DESCRIPTION_MAX: 500,
  
  // Brand
  BRAND_NAME_MIN: 2,
  BRAND_NAME_MAX: 50,
  BRAND_DESCRIPTION_MAX: 500,
  
  // Color
  COLOR_NAME_MIN: 2,
  COLOR_NAME_MAX: 30,
  
  // Size
  SIZE_MIN: 30,
  SIZE_MAX: 50,
  
  // Blog
  BLOG_TITLE_MIN: 10,
  BLOG_TITLE_MAX: 100,
  BLOG_EXCERPT_MAX: 300,
  BLOG_CONTENT_MIN: 100,
  
  // Customer
  CUSTOMER_NAME_MIN: 2,
  CUSTOMER_NAME_MAX: 100,
  
  // Order
  ORDER_NOTES_MAX: 500,
  SHIPPING_ADDRESS_MAX: 500,
} as const

// Cache keys
export const CACHE_KEYS = {
  PRODUCTS: 'products',
  FEATURED_PRODUCTS: 'featured_products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  COLORS: 'colors',
  SIZES: 'sizes',
  SIZE_TEMPLATES: 'size_templates',
  BLOG_POSTS: 'blog_posts',
  BLOG_CATEGORIES: 'blog_categories',
  DASHBOARD_STATS: 'dashboard_stats',
} as const

// Cache TTL (Time To Live) in milliseconds
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const

// Default color mapping for backward compatibility
export const COLOR_MAP: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  pink: '#ec4899',
  'rose gold': '#e11d48',
  nude: '#d4a574',
  coral: '#f97316',
  silver: '#9ca3af',
  gold: '#fbbf24',
  brown: '#92400e',
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  yellow: '#eab308',
  orange: '#f97316',
  navy: '#001f3f',
  gray: '#6b7280',
  grey: '#6b7280',
  beige: '#f5f5dc',
  cream: '#fffdd0',
} as const

// Sort options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW_HIGH: 'price_asc',
  PRICE_HIGH_LOW: 'price_desc',
  NAME_A_Z: 'name_asc',
  NAME_Z_A: 'name_desc',
  POPULAR: 'popular',
  FEATURED: 'featured',
} as const

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  NEW: 'new',
  ON_SALE: 'on_sale',
  FEATURED: 'featured',
} as const

// UI Constants
export const UI = {
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
  
  // Toast duration
  TOAST_DURATION: 3000,
  ERROR_TOAST_DURATION: 5000,
  
  // Animation durations (in ms)
  ANIMATION_FAST: 150,
  ANIMATION_NORMAL: 300,
  ANIMATION_SLOW: 500,
  
  // Debounce delays
  SEARCH_DEBOUNCE: 300,
  INPUT_DEBOUNCE: 500,
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
  UPLOAD: 'Failed to upload file. Please try again.',
  IMAGE_SIZE: 'Image size is too large. Maximum size is 5MB.',
  IMAGE_TYPE: 'Invalid image type. Only JPEG, PNG, and WebP are allowed.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully!',
  UPDATED: 'Updated successfully!',
  DELETED: 'Deleted successfully!',
  UPLOADED: 'Uploaded successfully!',
  SAVED: 'Saved successfully!',
  SENT: 'Sent successfully!',
} as const

// SEO Constants
export const SEO = {
  DEFAULT_TITLE: 'NAA Shoes - Premium Women\'s Footwear',
  DEFAULT_DESCRIPTION: 'Discover our collection of premium women\'s shoes. High-quality footwear for every occasion.',
  DEFAULT_KEYWORDS: ['women shoes', 'footwear', 'heels', 'sneakers', 'sandals', 'boots'],
  SITE_NAME: 'NAA Shoes',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://naa-shoes.com',
  LOGO_URL: '/logo.png',
  DEFAULT_IMAGE: '/default-og-image.jpg',
} as const

// Social Media
export const SOCIAL_MEDIA = {
  WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+6281234567890',
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/naashoes',
  FACEBOOK: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/naashoes',
  TIKTOK: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@naashoes',
} as const

// Email templates
export const EMAIL_TEMPLATES = {
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  PASSWORD_RESET: 'password_reset',
  WELCOME: 'welcome',
} as const

// Date formats
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  DISPLAY: 'MMMM dd, yyyy',
} as const

// Environment types
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const

// Feature flags
export const FEATURES = {
  BLOG_ENABLED: process.env.NEXT_PUBLIC_BLOG_ENABLED === 'true',
  REVIEWS_ENABLED: process.env.NEXT_PUBLIC_REVIEWS_ENABLED !== 'false',
  WISHLIST_ENABLED: process.env.NEXT_PUBLIC_WISHLIST_ENABLED === 'true',
  ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
} as const
