'use client'

import { useState, useEffect, useCallback } from 'react'
import { ApiResponse, PaginatedApiResponse } from '@/types/api'
import { apiClient } from '@/lib/api-client'

interface UseApiOptions {
  immediate?: boolean
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

/**
 * Hook for making API requests with loading and error states
 */
export function useApi<T>(
  url: string,
  options: UseApiOptions = {}
): UseApiState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, onSuccess, onError } = options
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await apiClient.get<T>(url)
      
      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null
        })
        onSuccess?.(response.data)
      } else {
        const errorMessage = response.error || 'Failed to fetch data'
        setState({
          data: null,
          loading: false,
          error: errorMessage
        })
        onError?.(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      setState({
        data: null,
        loading: false,
        error: errorMessage
      })
      onError?.(errorMessage)
    }
  }, [url, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [immediate, fetchData])

  return {
    ...state,
    refetch: fetchData
  }
}

/**
 * Hook for paginated API requests
 */
export function usePaginatedApi<T>(
  url: string,
  initialParams: Record<string, any> = {}
) {
  const [params, setParams] = useState(initialParams)
  const [state, setState] = useState<{
    data: T[]
    pagination: any
    loading: boolean
    error: string | null
  }>({
    data: [],
    pagination: null,
    loading: false,
    error: null
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await apiClient.get<PaginatedApiResponse<T>>(url, params)
      
      if (response.success && response.data) {
        setState({
          data: response.data.data,
          pagination: response.data.pagination,
          loading: false,
          error: null
        })
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.error || 'Failed to fetch data'
        }))
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Network error'
      }))
    }
  }, [url, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateParams = useCallback((newParams: Record<string, any>) => {
    setParams(prev => ({ ...prev, ...newParams }))
  }, [])

  const nextPage = useCallback(() => {
    if (state.pagination?.hasNext) {
      updateParams({ page: state.pagination.page + 1 })
    }
  }, [state.pagination, updateParams])

  const prevPage = useCallback(() => {
    if (state.pagination?.hasPrev) {
      updateParams({ page: state.pagination.page - 1 })
    }
  }, [state.pagination, updateParams])

  const goToPage = useCallback((page: number) => {
    updateParams({ page })
  }, [updateParams])

  return {
    ...state,
    params,
    updateParams,
    refetch: fetchData,
    nextPage,
    prevPage,
    goToPage
  }
}

/**
 * Hook for making POST/PUT/DELETE requests
 */
export function useMutation<TData, TVariables = any>() {
  const [state, setState] = useState<{
    loading: boolean
    error: string | null
  }>({
    loading: false,
    error: null
  })

  const mutate = useCallback(async (
    url: string,
    method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    variables?: TVariables
  ): Promise<TData | null> => {
    setState({ loading: true, error: null })
    
    try {
      let response: ApiResponse<TData>
      
      switch (method) {
        case 'POST':
          response = await apiClient.post<TData>(url, variables)
          break
        case 'PUT':
          response = await apiClient.put<TData>(url, variables)
          break
        case 'PATCH':
          response = await apiClient.patch<TData>(url, variables)
          break
        case 'DELETE':
          response = await apiClient.delete<TData>(url)
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
      
      if (response.success) {
        setState({ loading: false, error: null })
        return response.data || null
      } else {
        const errorMessage = response.error || 'Request failed'
        setState({ loading: false, error: errorMessage })
        throw new Error(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      setState({ loading: false, error: errorMessage })
      throw error
    }
  }, [])

  const post = useCallback((url: string, variables?: TVariables) => {
    return mutate(url, 'POST', variables)
  }, [mutate])

  const put = useCallback((url: string, variables?: TVariables) => {
    return mutate(url, 'PUT', variables)
  }, [mutate])

  const patch = useCallback((url: string, variables?: TVariables) => {
    return mutate(url, 'PATCH', variables)
  }, [mutate])

  const remove = useCallback((url: string) => {
    return mutate(url, 'DELETE')
  }, [mutate])

  return {
    ...state,
    post,
    put,
    patch,
    delete: remove,
    mutate
  }
}

/**
 * Hook for debounced API calls (useful for search)
 */
export function useDebouncedApi<T>(
  url: string,
  params: Record<string, any>,
  delay: number = 300
) {
  const [debouncedParams, setDebouncedParams] = useState(params)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(params)
    }, delay)

    return () => clearTimeout(timer)
  }, [params, delay])

  return useApi<T>(url + '?' + new URLSearchParams(debouncedParams).toString())
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticUpdate<T>(
  initialData: T[],
  idField: keyof T = 'id' as keyof T
) {
  const [data, setData] = useState<T[]>(initialData)
  const [optimisticUpdates, setOptimisticUpdates] = useState<Map<any, T>>(new Map())

  const addOptimistic = useCallback((item: T) => {
    const id = item[idField]
    setOptimisticUpdates(prev => new Map(prev).set(id, item))
    setData(prev => [...prev, item])
  }, [idField])

  const updateOptimistic = useCallback((id: any, updates: Partial<T>) => {
    setData(prev => prev.map(item => 
      item[idField] === id ? { ...item, ...updates } : item
    ))
  }, [idField])

  const removeOptimistic = useCallback((id: any) => {
    setData(prev => prev.filter(item => item[idField] !== id))
  }, [idField])

  const confirmUpdate = useCallback((id: any) => {
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }, [])

  const revertUpdate = useCallback((id: any) => {
    setOptimisticUpdates(prev => {
      const newMap = new Map(prev)
      const optimisticItem = newMap.get(id)
      newMap.delete(id)
      
      if (optimisticItem) {
        setData(prevData => prevData.filter(item => item[idField] !== id))
      }
      
      return newMap
    })
  }, [idField])

  return {
    data,
    addOptimistic,
    updateOptimistic,
    removeOptimistic,
    confirmUpdate,
    revertUpdate,
    hasOptimisticUpdates: optimisticUpdates.size > 0
  }
}
