'use client'

import { useState, useEffect, useCallback } from 'react'
import { storage } from '@/lib/utils'

/**
 * Hook for managing localStorage with React state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = storage.get<T>(key)
      // Parse stored json or if none return initialValue
      return item ?? initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      storage.set(key, valueToStore)
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Function to remove the key from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook for session storage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue
      
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook for detecting if data in localStorage has changed (useful for cross-tab communication)
 */
export function useLocalStorageListener<T>(
  key: string,
  initialValue: T
): T {
  const [value, setValue] = useState<T>(() => {
    const item = storage.get<T>(key)
    return item ?? initialValue
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return value
}

/**
 * Hook for managing multiple localStorage keys as an object
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  prefix: string,
  initialValues: T
): [T, (key: keyof T, value: T[keyof T]) => void, (key: keyof T) => void, () => void] {
  const [values, setValues] = useState<T>(() => {
    const stored: Partial<T> = {}
    
    Object.keys(initialValues).forEach(key => {
      const storageKey = `${prefix}.${key}`
      const item = storage.get(storageKey)
      if (item !== null) {
        stored[key as keyof T] = item as T[keyof T]
      }
    })
    
    return { ...initialValues, ...stored }
  })

  const setValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [key]: value }))
    storage.set(`${prefix}.${String(key)}`, value)
  }, [prefix])

  const removeValue = useCallback((key: keyof T) => {
    setValues(prev => ({ ...prev, [key]: initialValues[key] }))
    localStorage.removeItem(`${prefix}.${String(key)}`)
  }, [prefix, initialValues])

  const clearAll = useCallback(() => {
    setValues(initialValues)
    Object.keys(initialValues).forEach(key => {
      localStorage.removeItem(`${prefix}.${key}`)
    })
  }, [prefix, initialValues])

  return [values, setValue, removeValue, clearAll]
}

/**
 * Hook with expiring localStorage entries
 */
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  expiryMinutes: number = 60
): [T, (value: T) => void, () => void, boolean] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return initialValue

      const parsed = JSON.parse(item)
      const now = new Date().getTime()
      
      if (parsed.expiry && now > parsed.expiry) {
        localStorage.removeItem(key)
        return initialValue
      }
      
      return parsed.value ?? initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const [isExpired, setIsExpired] = useState(false)

  const setValueWithExpiry = useCallback((newValue: T) => {
    try {
      const expiry = new Date().getTime() + (expiryMinutes * 60 * 1000)
      const item = {
        value: newValue,
        expiry
      }
      localStorage.setItem(key, JSON.stringify(item))
      setValue(newValue)
      setIsExpired(false)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, expiryMinutes])

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setValue(initialValue)
      setIsExpired(false)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  useEffect(() => {
    const checkExpiry = () => {
      try {
        const item = localStorage.getItem(key)
        if (!item) return

        const parsed = JSON.parse(item)
        const now = new Date().getTime()
        
        if (parsed.expiry && now > parsed.expiry) {
          localStorage.removeItem(key)
          setValue(initialValue)
          setIsExpired(true)
        }
      } catch (error) {
        console.error(`Error checking expiry for localStorage key "${key}":`, error)
      }
    }

    // Check expiry on mount and then every minute
    checkExpiry()
    const interval = setInterval(checkExpiry, 60000)
    
    return () => clearInterval(interval)
  }, [key, initialValue])

  return [value, setValueWithExpiry, removeValue, isExpired]
}
