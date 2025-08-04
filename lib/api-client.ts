import { ApiResponse, PaginatedApiResponse, ApiRequestConfig, HttpMethod } from '@/types/api'
import { HTTP_STATUS } from './constants'

/**
 * Generic API client utility with proper error handling and type safety
 */
class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = '', headers: Record<string, string> = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  /**
   * Generic request method
   */
  private async request<T>(
    url: string,
    config: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const fullUrl = this.baseURL + url
      const headers = { ...this.defaultHeaders, ...config.headers }

      const fetchConfig: RequestInit = {
        method: config.method,
        headers,
        ...(config.body && { body: JSON.stringify(config.body) })
      }

      const response = await fetch(fullUrl, fetchConfig)
      
      let data: T | undefined
      let errorMessage: string | undefined

      // Try to parse response as JSON
      try {
        const responseData = await response.json()
        if (response.ok) {
          data = responseData
        } else {
          errorMessage = responseData.error || responseData.message || 'Request failed'
        }
      } catch (parseError) {
        if (!response.ok) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`
        }
      }

      return {
        success: response.ok,
        data,
        error: errorMessage,
        statusCode: response.status
      }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
        statusCode: 0
      }
    }
  }

  /**
   * GET request
   */
  async get<T>(url: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    let fullUrl = url
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      fullUrl += `?${searchParams.toString()}`
    }

    return this.request<T>(fullUrl, { method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'POST', body: data })
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'PUT', body: data })
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'PATCH', body: data })
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'DELETE' })
  }
}

// Create default API client instance
export const apiClient = new ApiClient()

/**
 * Utility function to handle API responses with error handling
 */
export function handleApiResponse<T>(
  response: ApiResponse<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: string) => void
): boolean {
  if (response.success && response.data) {
    onSuccess?.(response.data)
    return true
  } else {
    const errorMessage = response.error || 'An unexpected error occurred'
    onError?.(errorMessage)
    console.error('API Error:', errorMessage)
    return false
  }
}

/**
 * Utility to create standardized API responses
 */
export function createApiResponse<T>(
  success: boolean,
  data?: T,
  error?: string,
  statusCode?: number
): ApiResponse<T> {
  return {
    success,
    data,
    error,
    statusCode
  }
}

/**
 * Utility to create standardized paginated API responses
 */
export function createPaginatedApiResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  error?: string
): PaginatedApiResponse<T> {
  const totalPages = Math.ceil(total / limit)
  
  return {
    success: !error,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    },
    error
  }
}

/**
 * Validation utility for common API parameters
 */
export function validatePaginationParams(
  page?: number,
  limit?: number
): { page: number; limit: number; errors: string[] } {
  const errors: string[] = []
  
  // Validate page
  const validPage = page && page > 0 ? page : 1
  if (page !== undefined && page <= 0) {
    errors.push('Page must be greater than 0')
  }

  // Validate limit
  const validLimit = limit && limit > 0 && limit <= 100 ? limit : 12
  if (limit !== undefined && (limit <= 0 || limit > 100)) {
    errors.push('Limit must be between 1 and 100')
  }

  return { page: validPage, limit: validLimit, errors }
}

/**
 * URL builder utility for API endpoints
 */
export function buildApiUrl(
  baseUrl: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params) return baseUrl

  const validParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => [key, String(value)])

  if (validParams.length === 0) return baseUrl

  const searchParams = new URLSearchParams(validParams)
  return `${baseUrl}?${searchParams.toString()}`
}

/**
 * Rate limiting utility
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    if (!this.requests.has(key)) {
      this.requests.set(key, [])
    }

    const requests = this.requests.get(key)!
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => time > windowStart)
    this.requests.set(key, validRequests)

    // Check if under limit
    if (validRequests.length < this.maxRequests) {
      validRequests.push(now)
      return true
    }

    return false
  }
}

// Create default rate limiter
export const defaultRateLimiter = new RateLimiter()

/**
 * Cache utility for API responses
 */
class ResponseCache {
  private cache: Map<string, { data: unknown; timestamp: number; ttl: number }> = new Map()

  set<T>(key: string, data: T, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    const now = Date.now()
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false

    const now = Date.now()
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return false
    }

    return true
  }
}

// Create default cache instance
export const apiCache = new ResponseCache()

/**
 * Utility for retrying failed requests
 */
export async function retryRequest<T>(
  requestFn: () => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<ApiResponse<T>> {
  let lastError: ApiResponse<T> = {
    success: false,
    error: 'Max retries exceeded'
  }

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await requestFn()
      if (result.success) {
        return result
      }
      lastError = result
    } catch (error) {
      lastError = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }

    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)))
    }
  }

  return lastError
}
