// Admin specific types
export interface AdminUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'super_admin'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Master data types
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    products: number
  }
}

export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    products: number
  }
}

export interface Color {
  id: number
  name: string
  hexCode?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    productInventories: number
  }
}

export interface Size {
  id: number
  value: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    productInventories: number
  }
}

export interface SizeTemplate {
  id: number
  name: string
  description?: string
  category?: string
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
  sizeTemplateItems?: SizeTemplateItem[]
}

export interface SizeTemplateItem {
  id: number
  centimeters: number
  sizeTemplateId: number
  sizeId: number
  sizeTemplate?: SizeTemplate
  size?: Size
}

// Product related types for admin
export interface AdminProduct {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  originalPrice?: number
  thumbnailUrl?: string
  isNew: boolean
  isOnSale: boolean
  isActive: boolean
  weight?: number
  dimensions?: string
  material?: string
  createdAt: string
  updatedAt: string
  categoryId: number
  brandId?: number
  category: Category
  brand?: Brand
  galleryImages: ProductImage[]
  productInventories: ProductInventory[]
  sizeGuides: SizeGuide[]
  _count?: {
    reviews: number
    orderItems: number
  }
}

export interface ProductImage {
  id: number
  url: string
  altText?: string
  caption?: string
  displayOrder: number
  createdAt: string
  productId: number
}

export interface ProductInventory {
  id: number
  stock: number
  productId: number
  colorId: number
  sizeId: number
  product?: AdminProduct
  color: Color
  size: Size
}

export interface SizeGuide {
  id: number
  centimeters: number
  productId: number
  sizeId: number
  product?: AdminProduct
  size: Size
}

// Form data types
export interface CategoryFormData {
  name: string
  slug: string
  description?: string
  isActive: boolean
}

export interface BrandFormData {
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  isActive: boolean
}

export interface ColorFormData {
  name: string
  hexCode?: string
  isActive: boolean
}

export interface SizeFormData {
  value: number
  isActive: boolean
}

export interface SizeTemplateFormData {
  name: string
  description?: string
  category?: string
  isActive: boolean
  isDefault: boolean
  sizeTemplateItems: Array<{
    sizeId: number
    centimeters: number
  }>
}

export interface ProductFormData {
  name: string
  slug: string
  description?: string
  price: number
  originalPrice?: number
  thumbnailUrl?: string
  isNew: boolean
  isOnSale: boolean
  isActive: boolean
  weight?: number
  dimensions?: string
  material?: string
  categoryId: number
  brandId?: number
  galleryImages: Array<{
    url: string
    altText?: string
    caption?: string
    displayOrder: number
  }>
  productInventories: Array<{
    colorId: number
    sizeId: number
    stock: number
  }>
  sizeGuides: Array<{
    sizeId: number
    centimeters: number
  }>
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
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

// Dashboard stats
export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalCustomers: number
  totalRevenue: number
  monthlyStats: {
    products: number
    orders: number
    customers: number
    revenue: number
  }
  recentProducts: AdminProduct[]
  recentOrders: AdminOrder[]
}

// Order related types for admin
export interface AdminCustomer {
  id: number
  email: string
  name: string
  phone?: string
  createdAt: string
  updatedAt: string
  _count?: {
    orders: number
    reviews: number
  }
}

export interface AdminOrder {
  id: number
  orderNumber: string
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  totalAmount: number
  shippingCost: number
  notes?: string
  shippingAddress?: string
  createdAt: string
  updatedAt: string
  customerId: number
  customer: AdminCustomer
  orderItems: AdminOrderItem[]
}

export interface AdminOrderItem {
  id: number
  quantity: number
  price: number
  size: number
  color: string
  orderId: number
  productId: number
  order?: AdminOrder
  product: AdminProduct
}

// Filter and search types
export interface ProductFilters {
  category?: string
  brand?: string
  color?: string
  size?: number
  minPrice?: number
  maxPrice?: number
  isNew?: boolean
  isOnSale?: boolean
  isActive?: boolean
  search?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Table column types
export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  className?: string
}

// File upload types
export interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

export interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  className?: string
  multiple?: boolean
}
