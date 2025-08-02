export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  colors: string[]
  sizes: number[]
  isNew?: boolean
  isOnSale?: boolean
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
