import { VALIDATION } from './constants'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: unknown) => boolean | string
  email?: boolean
  url?: boolean
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

/**
 * Validate a single field value against rules
 */
export function validateField(
  field: string,
  value: unknown,
  rules: ValidationRule
): ValidationError[] {
  const errors: ValidationError[] = []

  // Required validation
  if (rules.required && (value === null || value === undefined || value === '')) {
    errors.push({ field, message: `${field} is required` })
    return errors // Skip other validations if required field is empty
  }

  // Skip other validations if value is empty and not required
  if (value === null || value === undefined || value === '') {
    return errors
  }

  const stringValue = String(value)
  const numericValue = Number(value)

  // String length validations
  if (rules.minLength && stringValue.length < rules.minLength) {
    errors.push({
      field,
      message: `${field} must be at least ${rules.minLength} characters long`
    })
  }

  if (rules.maxLength && stringValue.length > rules.maxLength) {
    errors.push({
      field,
      message: `${field} must be no more than ${rules.maxLength} characters long`
    })
  }

  // Numeric validations
  if (rules.min !== undefined && numericValue < rules.min) {
    errors.push({
      field,
      message: `${field} must be at least ${rules.min}`
    })
  }

  if (rules.max !== undefined && numericValue > rules.max) {
    errors.push({
      field,
      message: `${field} must be no more than ${rules.max}`
    })
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    errors.push({
      field,
      message: `${field} format is invalid`
    })
  }

  // Email validation
  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(stringValue)) {
      errors.push({
        field,
        message: `${field} must be a valid email address`
      })
    }
  }

  // URL validation
  if (rules.url) {
    try {
      new URL(stringValue)
    } catch {
      errors.push({
        field,
        message: `${field} must be a valid URL`
      })
    }
  }

  // Custom validation
  if (rules.custom) {
    const customResult = rules.custom(value)
    if (typeof customResult === 'string') {
      errors.push({ field, message: customResult })
    } else if (!customResult) {
      errors.push({ field, message: `${field} is invalid` })
    }
  }

  return errors
}

/**
 * Validate an object against a schema
 */
export function validateSchema(
  data: Record<string, unknown>,
  schema: Record<string, ValidationRule>
): ValidationResult {
  const errors: ValidationError[] = []

  Object.entries(schema).forEach(([field, rules]) => {
    const fieldErrors = validateField(field, data[field], rules)
    errors.push(...fieldErrors)
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Predefined validation schemas for common use cases
 */
export const validationSchemas = {
  // Product validation
  product: {
    name: {
      required: true,
      minLength: VALIDATION.PRODUCT_NAME_MIN,
      maxLength: VALIDATION.PRODUCT_NAME_MAX
    },
    description: {
      maxLength: VALIDATION.PRODUCT_DESCRIPTION_MAX
    },
    price: {
      required: true,
      min: VALIDATION.PRODUCT_PRICE_MIN,
      max: VALIDATION.PRODUCT_PRICE_MAX
    },
    slug: {
      required: true,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      custom: (value: unknown) => {
        const str = String(value)
        return str.length >= 3 || 'Slug must be at least 3 characters'
      }
    }
  },

  // Category validation
  category: {
    name: {
      required: true,
      minLength: VALIDATION.CATEGORY_NAME_MIN,
      maxLength: VALIDATION.CATEGORY_NAME_MAX
    },
    slug: {
      required: true,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    description: {
      maxLength: VALIDATION.CATEGORY_DESCRIPTION_MAX
    }
  },

  // Brand validation
  brand: {
    name: {
      required: true,
      minLength: VALIDATION.BRAND_NAME_MIN,
      maxLength: VALIDATION.BRAND_NAME_MAX
    },
    slug: {
      required: true,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    description: {
      maxLength: VALIDATION.BRAND_DESCRIPTION_MAX
    },
    website: {
      url: true
    }
  },

  // Color validation
  color: {
    name: {
      required: true,
      minLength: VALIDATION.COLOR_NAME_MIN,
      maxLength: VALIDATION.COLOR_NAME_MAX
    },
    hexCode: {
      pattern: /^#[0-9A-Fa-f]{6}$/
    }
  },

  // Size validation
  size: {
    value: {
      required: true,
      min: VALIDATION.SIZE_MIN,
      max: VALIDATION.SIZE_MAX
    }
  },

  // Blog post validation
  blogPost: {
    title: {
      required: true,
      minLength: VALIDATION.BLOG_TITLE_MIN,
      maxLength: VALIDATION.BLOG_TITLE_MAX
    },
    slug: {
      required: true,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },
    excerpt: {
      maxLength: VALIDATION.BLOG_EXCERPT_MAX
    },
    content: {
      required: true,
      minLength: VALIDATION.BLOG_CONTENT_MIN
    }
  },

  // Customer validation
  customer: {
    name: {
      required: true,
      minLength: VALIDATION.CUSTOMER_NAME_MIN,
      maxLength: VALIDATION.CUSTOMER_NAME_MAX
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/
    }
  },

  // Order validation
  order: {
    notes: {
      maxLength: VALIDATION.ORDER_NOTES_MAX
    },
    shippingAddress: {
      required: true,
      maxLength: VALIDATION.SHIPPING_ADDRESS_MAX
    }
  }
} as const

/**
 * Helper function to validate common data types
 */
export const validators = {
  isEmail: (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
  },

  isUrl: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  isSlug: (slug: string): boolean => {
    const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    return pattern.test(slug)
  },

  isHexColor: (color: string): boolean => {
    const pattern = /^#[0-9A-Fa-f]{6}$/
    return pattern.test(color)
  },

  isPhoneNumber: (phone: string): boolean => {
    const pattern = /^[\+]?[0-9\s\-\(\)]{10,15}$/
    return pattern.test(phone)
  },

  isPositiveNumber: (value: number): boolean => {
    return !isNaN(value) && value > 0
  },

  isNonNegativeNumber: (value: number): boolean => {
    return !isNaN(value) && value >= 0
  },

  isInteger: (value: number): boolean => {
    return Number.isInteger(value)
  },

  isEmpty: (value: unknown): boolean => {
    return value === null || value === undefined || value === ''
  },

  isValidImageType: (type: string): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    return allowedTypes.includes(type)
  },

  isValidImageSize: (size: number, maxSize: number = 5 * 1024 * 1024): boolean => {
    return size <= maxSize
  }
}

/**
 * Sanitization utilities
 */
export const sanitizers = {
  trimString: (value: string): string => {
    return value.trim()
  },

  normalizeSlug: (value: string): string => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  normalizeEmail: (email: string): string => {
    return email.toLowerCase().trim()
  },

  normalizePhone: (phone: string): string => {
    return phone.replace(/[^\d\+]/g, '')
  },

  stripHtml: (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
  },

  normalizePrice: (price: string | number): number => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return Math.round(numPrice * 100) / 100 // Round to 2 decimal places
  }
}

/**
 * Validation middleware for forms
 */
export function createFormValidator<T extends Record<string, unknown>>(
  schema: Record<keyof T, ValidationRule>
) {
  return (data: T): ValidationResult => {
    return validateSchema(data, schema)
  }
}

/**
 * Real-time validation hook for individual fields
 */
export function validateFieldRealtime(
  value: unknown,
  rules: ValidationRule,
  debounceMs: number = 300
): Promise<ValidationError[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const errors = validateField('field', value, rules)
      resolve(errors)
    }, debounceMs)
  })
}
