export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

export interface WhatsAppConfig {
  number: string
  storeName: string
  messageTemplate: {
    greeting: string
    closing: string
  }
}

export interface ProductCardProps {
  product: Product
  className?: string
}

export interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

// Import Product from product types
import { Product } from './product'
