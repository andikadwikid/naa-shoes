'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Product, CartItem, CartState, CartAction, CartContextType } from '../types/product'
import { storage } from '../lib/utils'

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, color } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
                item.selectedSize === size && 
                item.selectedColor === color
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        // Item already exists, increase quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item, add to cart
        newItems = [...state.items, {
          product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color
        }]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size, color } = action.payload
      const newItems = state.items.filter(
        item => !(item.product.id === productId && 
                 item.selectedSize === size && 
                 item.selectedColor === color)
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload
      
      if (quantity <= 0) {
        return cartReducer(state, { 
          type: 'REMOVE_FROM_CART', 
          payload: { productId, size, color } 
        })
      }

      const newItems = state.items.map(item =>
        item.product.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

      return {
        items: newItems,
        totalItems,
        totalPrice
      }
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get('naashoes-cart')
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: savedCart })
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('naashoes-cart', state)
  }, [state])

  const addToCart = (product: Product, size: number, color: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, color } })
  }

  const removeFromCart = (productId: number, size: number, color: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size, color } })
  }

  const updateQuantity = (productId: number, size: number, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getItemCount = () => state.totalItems

  const getTotalPrice = () => state.totalPrice

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
