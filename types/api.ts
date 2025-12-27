// Generic API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode?: number
}

export interface PaginatedApiResponse<T = any> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
  error?: string
  message?: string
  statusCode?: number
}

export interface ApiError {
  message: string
  statusCode: number
  details?: any
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Request configuration
export interface ApiRequestConfig {
  method: HttpMethod
  headers?: Record<string, string>
  body?: any
  timeout?: number
  retries?: number
}

// Pagination parameters
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Search parameters
export interface SearchParams {
  q?: string
  search?: string
  query?: string
}

// Filter parameters (generic)
export interface FilterParams {
  [key: string]: string | number | boolean | undefined
}

// Complete query parameters
export interface QueryParams extends PaginationParams, SearchParams, FilterParams {}

// API endpoints
export interface ApiEndpoints {
  // Products
  products: string
  productById: (id: number) => string
  featuredProducts: string
  searchProducts: string
  
  // Categories
  categories: string
  categoryById: (id: number) => string
  
  // Brands
  brands: string
  brandById: (id: number) => string
  
  // Colors
  colors: string
  colorById: (id: number) => string
  
  // Sizes
  sizes: string
  sizeById: (id: number) => string
  
  // Size Templates
  sizeTemplates: string
  sizeTemplateById: (id: number) => string
  
  // Orders
  orders: string
  orderById: (id: number) => string
  
  // Customers
  customers: string
  customerById: (id: number) => string
  
  // Blog
  blogPosts: string
  blogPostById: (id: number) => string
  blogPostBySlug: (slug: string) => string
  blogCategories: string
  blogAuthors: string
  blogTags: string
  
  // Admin
  adminDashboard: string
  adminStats: string
  
  // Upload
  uploadImage: string
  validateImage: string
}

// API client configuration
export interface ApiClientConfig {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
}

// Request/Response interceptors
export interface RequestInterceptor {
  onRequest?: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>
  onRequestError?: (error: any) => any | Promise<any>
}

export interface ResponseInterceptor {
  onResponse?: (response: any) => any | Promise<any>
  onResponseError?: (error: any) => any | Promise<any>
}

// Cache configuration
export interface CacheConfig {
  enabled: boolean
  ttl: number // Time to live in milliseconds
  maxSize: number // Maximum cache size
  storage: 'memory' | 'localStorage' | 'sessionStorage'
}

// API client interface
export interface ApiClient {
  get<T = any>(url: string, params?: QueryParams): Promise<ApiResponse<T>>
  post<T = any>(url: string, data?: any): Promise<ApiResponse<T>>
  put<T = any>(url: string, data?: any): Promise<ApiResponse<T>>
  delete<T = any>(url: string): Promise<ApiResponse<T>>
  patch<T = any>(url: string, data?: any): Promise<ApiResponse<T>>
}

// Validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface ValidationSchema {
  [key: string]: ValidationRule
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Form types
export interface FormField {
  name: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file'
  label: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: any; label: string }>
  validation?: ValidationRule
  defaultValue?: any
}

export interface FormConfig {
  fields: FormField[]
  submitUrl: string
  method: HttpMethod
  onSuccess?: (response: ApiResponse) => void
  onError?: (error: ApiError) => void
}

// File upload types
export interface UploadConfig {
  maxSize: number // in bytes
  allowedTypes: string[]
  multiple: boolean
  destination: string
}

export interface UploadResponse {
  success: boolean
  url?: string
  urls?: string[]
  error?: string
}

export interface FileUploadRequest {
  file: File
  destination?: string
  filename?: string
}

// WebSocket types (for real-time features)
export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: number
}

export interface WebSocketConfig {
  url: string
  protocols?: string[]
  reconnect: boolean
  maxReconnectAttempts: number
  reconnectInterval: number
}

// Analytics and tracking
export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  customProperties?: Record<string, any>
}

export interface TrackingConfig {
  enabled: boolean
  googleAnalyticsId?: string
  facebookPixelId?: string
  customEvents: AnalyticsEvent[]
}

// Rate limiting
export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  message?: string
  skipSuccessfulRequests?: boolean
}

// Health check
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy' | 'degraded'
  timestamp: string
  uptime: number
  version: string
  services: {
    database: 'up' | 'down'
    cache: 'up' | 'down'
    storage: 'up' | 'down'
  }
}
