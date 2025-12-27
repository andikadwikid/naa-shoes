import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, PaginatedApiResponse, PaginationParams } from '@/types/api'
import { HTTP_STATUS } from './constants'
import { validatePaginationParams } from './api-client'

/**
 * Standard success response wrapper
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK
): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    statusCode
  }
  
  return NextResponse.json(response, { status: statusCode })
}

/**
 * Standard error response wrapper
 */
export function createErrorResponse(
  error: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: unknown
): NextResponse {
  const response: ApiResponse = {
    success: false,
    error,
    statusCode
  }

  // Only include details in development mode
  if (process.env.NODE_ENV === 'development' && details) {
    console.error('API Error Details:', details)
  }

  return NextResponse.json(response, { status: statusCode })
}

/**
 * Standard paginated response wrapper
 */
export function createPaginatedResponse<T>(
  data: T[],
  pagination: {
    page: number
    limit: number
    total: number
  },
  message?: string
): NextResponse {
  const totalPages = Math.ceil(pagination.total / pagination.limit)
  
  const response: PaginatedApiResponse<T> = {
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      pages: totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1
    },
    message,
    statusCode: HTTP_STATUS.OK
  }

  return NextResponse.json(response, { status: HTTP_STATUS.OK })
}

/**
 * Extract and validate pagination parameters from request
 */
export function extractPaginationParams(request: NextRequest): {
  page: number
  limit: number
  offset: number
  errors: string[]
} {
  const { searchParams } = new URL(request.url)
  
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')
  
  const pageNum = page ? parseInt(page, 10) : 1
  const limitNum = limit ? parseInt(limit, 10) : 12
  
  const { page: validPage, limit: validLimit, errors } = validatePaginationParams(pageNum, limitNum)
  
  return {
    page: validPage,
    limit: validLimit,
    offset: (validPage - 1) * validLimit,
    errors
  }
}

/**
 * Extract search parameters with type safety
 */
export function extractSearchParams(
  request: NextRequest,
  allowedParams: string[]
): Record<string, string | null> {
  const { searchParams } = new URL(request.url)
  const params: Record<string, string | null> = {}
  
  allowedParams.forEach(param => {
    params[param] = searchParams.get(param)
  })
  
  return params
}

/**
 * Standardized error handler for API routes
 */
export function handleApiError(error: unknown, context?: string): NextResponse {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error)
  
  if (error instanceof Error) {
    // Handle known error types
    if (error.message.includes('not found')) {
      return createErrorResponse('Resource not found', HTTP_STATUS.NOT_FOUND)
    }
    
    if (error.message.includes('validation')) {
      return createErrorResponse('Validation error', HTTP_STATUS.BAD_REQUEST, error.message)
    }
    
    if (error.message.includes('unauthorized')) {
      return createErrorResponse('Unauthorized', HTTP_STATUS.UNAUTHORIZED)
    }
    
    if (error.message.includes('forbidden')) {
      return createErrorResponse('Forbidden', HTTP_STATUS.FORBIDDEN)
    }
    
    // Generic error handling
    return createErrorResponse(
      process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error
    )
  }
  
  return createErrorResponse('Internal server error', HTTP_STATUS.INTERNAL_SERVER_ERROR)
}

/**
 * Middleware wrapper for API routes with error handling
 */
export function withErrorHandling(
  handler: (request: NextRequest, params?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, params?: any): Promise<NextResponse> => {
    try {
      return await handler(request, params)
    } catch (error) {
      return handleApiError(error, `${request.method} ${request.url}`)
    }
  }
}

/**
 * Method validation middleware
 */
export function validateMethod(
  request: NextRequest,
  allowedMethods: string[]
): NextResponse | null {
  if (!allowedMethods.includes(request.method)) {
    return createErrorResponse(
      `Method ${request.method} not allowed`,
      HTTP_STATUS.METHOD_NOT_ALLOWED
    )
  }
  return null
}

/**
 * Request body validation
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  validator: (data: unknown) => { isValid: boolean; errors: string[] }
): Promise<{ data: T | null; errors: string[] }> {
  try {
    const body = await request.json()
    const validation = validator(body)
    
    if (!validation.isValid) {
      return { data: null, errors: validation.errors }
    }
    
    return { data: body as T, errors: [] }
  } catch (error) {
    return { data: null, errors: ['Invalid JSON in request body'] }
  }
}

/**
 * Rate limiting check (simplified version)
 */
export function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  // In a real application, you'd use a proper rate limiting solution
  // like Redis or a rate limiting service
  
  // For now, return allowed always (implement based on your needs)
  return { allowed: true, remaining: maxRequests }
}

/**
 * CORS headers helper
 */
export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

/**
 * Cache headers helper
 */
export function addCacheHeaders(
  response: NextResponse,
  maxAge: number = 300, // 5 minutes default
  isPublic: boolean = true
): NextResponse {
  const cacheControl = isPublic
    ? `public, max-age=${maxAge}`
    : `private, max-age=${maxAge}`
  
  response.headers.set('Cache-Control', cacheControl)
  response.headers.set('ETag', `"${Date.now()}"`) // Simple ETag implementation
  
  return response
}

/**
 * Helper to build Prisma where clause from search parameters
 */
export function buildWhereClause(params: Record<string, string | null>): Record<string, any> {
  const where: Record<string, any> = {}
  
  // Add active filter by default
  where.isActive = true
  
  // Category filter
  if (params.category && params.category !== 'All') {
    where.category = {
      name: {
        equals: params.category,
        mode: 'insensitive'
      }
    }
  }
  
  // Search filter
  if (params.search) {
    where.OR = [
      {
        name: {
          contains: params.search,
          mode: 'insensitive'
        }
      },
      {
        description: {
          contains: params.search,
          mode: 'insensitive'
        }
      }
    ]
  }
  
  // Featured filter
  if (params.featured === 'true') {
    where.OR = [
      { isNew: true },
      { isOnSale: true }
    ]
  }
  
  return where
}

/**
 * Helper to build Prisma orderBy clause from search parameters
 */
export function buildOrderByClause(params: Record<string, string | null>): Record<string, any> {
  const sortBy = params.sortBy || params.orderBy || 'createdAt'
  const order = params.order || getOrderFromSort(params.sortBy) || 'desc'
  
  return { [getOrderByFromSort(sortBy)]: order }
}

function getOrderByFromSort(sortBy: string | null): string {
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

function getOrderFromSort(sortBy: string | null): string {
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

/**
 * Standard include objects for Prisma queries
 */
export const PRISMA_INCLUDES = {
  product: {
    category: true,
    brand: true,
    galleryImages: {
      orderBy: { displayOrder: 'asc' }
    },
    productInventories: {
      include: {
        color: true,
        size: true
      }
    },
    sizeGuides: {
      include: {
        size: true
      },
      orderBy: { size: { value: 'asc' } }
    }
  },
  
  productList: {
    category: true,
    brand: true,
    galleryImages: {
      take: 1,
      orderBy: { displayOrder: 'asc' }
    },
    productInventories: {
      include: {
        color: true,
        size: true
      }
    },
    _count: {
      select: {
        reviews: true,
        orderItems: true
      }
    }
  },
  
  order: {
    customer: true,
    orderItems: {
      include: {
        product: {
          include: {
            category: true,
            brand: true
          }
        }
      }
    }
  },
  
  blogPost: {
    author: true,
    blogCategory: true,
    tags: {
      include: {
        tag: true
      }
    }
  }
} as const
