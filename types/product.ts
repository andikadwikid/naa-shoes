export interface SizeGuide {
  size: number
  centimeters: number
}

export interface ProductInventory {
  colorId: number
  sizeId: number
  stock: number
  color: {
    id: number
    name: string
    hexCode?: string
  }
  size: {
    id: number
    value: number
  }
}

// Legacy interfaces for backward compatibility
export interface ColorStock {
  color: string
  stock: number
}

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  thumbnailUrl?: string | null
  image?: string // Keep for backward compatibility
  category: string
  description: string
  
  // New inventory structure
  productInventories?: ProductInventory[]
  
  // Legacy structure for backward compatibility
  colors: string[]
  sizes: number[]
  colorStock?: ColorStock[]
  sizeGuide?: SizeGuide[]
  
  isNew?: boolean
  isOnSale?: boolean
  galleryImages?: Array<{
    id: number
    url: string
    altText?: string
    caption?: string
    displayOrder: number
  }>
}

// Helper functions to work with new inventory structure
export const getAvailableColors = (product: Product): string[] => {
  if (product.productInventories) {
    return [...new Set(product.productInventories.map(inv => inv.color.name))]
  }
  return product.colors || []
}

export const getAvailableSizes = (product: Product): number[] => {
  if (product.productInventories) {
    return [...new Set(product.productInventories.map(inv => inv.size.value))].sort((a, b) => a - b)
  }
  return product.sizes || []
}

export const getStockForColorSize = (product: Product, colorName: string, size: number): number => {
  if (product.productInventories) {
    const inventory = product.productInventories.find(
      inv => inv.color.name === colorName && inv.size.value === size
    )
    return inventory?.stock || 0
  }
  
  // Fallback to legacy structure
  const colorStock = product.colorStock?.find(cs => cs.color === colorName)
  return colorStock?.stock || 0
}

export const getTotalStockForColor = (product: Product, colorName: string): number => {
  if (product.productInventories) {
    return product.productInventories
      .filter(inv => inv.color.name === colorName)
      .reduce((total, inv) => total + inv.stock, 0)
  }
  
  // Fallback to legacy structure
  const colorStock = product.colorStock?.find(cs => cs.color === colorName)
  return colorStock?.stock || 0
}

export const getColorHexCode = (product: Product, colorName: string): string => {
  if (product.productInventories) {
    const inventory = product.productInventories.find(inv => inv.color.name === colorName)
    return inventory?.color.hexCode || '#9ca3af'
  }
  
  // Fallback to default color mapping
  const colorMap: { [key: string]: string } = {
    'white': '#ffffff',
    'black': '#000000',
    'pink': '#ec4899',
    'rose gold': '#e11d48',
    'nude': '#d4a574',
    'coral': '#f97316',
    'silver': '#9ca3af',
    'gold': '#fbbf24',
    'brown': '#92400e',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'green': '#10b981',
    'purple': '#8b5cf6',
    'yellow': '#eab308',
    'orange': '#f97316',
    'navy': '#001f3f'
  }
  return colorMap[colorName.toLowerCase()] || '#9ca3af'
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: number
  selectedColor: string
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: number; color: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number; size: number; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; size: number; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

export interface CartContextType {
  state: CartState
  addToCart: (product: Product, size: number, color: string) => void
  removeFromCart: (productId: number, size: number, color: string) => void
  updateQuantity: (productId: number, size: number, color: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getTotalPrice: () => number
}
