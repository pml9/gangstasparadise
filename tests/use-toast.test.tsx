import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast, toast, reducer } from '@/hooks/use-toast'

// Mock timers for testing timeouts
vi.useFakeTimers()

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    // Clear any existing toasts
    act(() => {
      toast({})
    })
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('reducer', () => {
    const initialState = { toasts: [] }

    it('should add a toast', () => {
      const mockToast = {
        id: '1',
        title: 'Test Toast',
        description: 'Test Description',
        open: true
      }

      const action = {
        type: 'ADD_TOAST' as const,
        toast: mockToast
      }

      const newState = reducer(initialState, action)
      
      expect(newState.toasts).toHaveLength(1)
      expect(newState.toasts[0]).toEqual(mockToast)
    })

    it('should limit toasts to TOAST_LIMIT', () => {
      const state = {
        toasts: [{
          id: '1',
          title: 'Existing Toast',
          open: true
        }]
      }

      const newToast = {
        id: '2',
        title: 'New Toast',
        open: true
      }

      const action = {
        type: 'ADD_TOAST' as const,
        toast: newToast
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts).toHaveLength(1)
      expect(newState.toasts[0].id).toBe('2')
    })

    it('should update an existing toast', () => {
      const state = {
        toasts: [{
          id: '1',
          title: 'Original Title',
          description: 'Original Description',
          open: true
        }]
      }

      const action = {
        type: 'UPDATE_TOAST' as const,
        toast: {
          id: '1',
          title: 'Updated Title'
        }
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts[0].title).toBe('Updated Title')
      expect(newState.toasts[0].description).toBe('Original Description')
    })

    it('should dismiss a specific toast', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      }

      const action = {
        type: 'DISMISS_TOAST' as const,
        toastId: '1'
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts[0].open).toBe(false)
      expect(newState.toasts[1].open).toBe(true)
    })

    it('should dismiss all toasts when no toastId provided', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      }

      const action = {
        type: 'DISMISS_TOAST' as const
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts[0].open).toBe(false)
      expect(newState.toasts[1].open).toBe(false)
    })

    it('should remove a specific toast', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      }

      const action = {
        type: 'REMOVE_TOAST' as const,
        toastId: '1'
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts).toHaveLength(1)
      expect(newState.toasts[0].id).toBe('2')
    })

    it('should remove all toasts when no toastId provided', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true }
        ]
      }

      const action = {
        type: 'REMOVE_TOAST' as const
      }

      const newState = reducer(state, action)
      
      expect(newState.toasts).toHaveLength(0)
    })
  })

  describe('toast function', () => {
    it('should create a toast with generated id', () => {
      const toastProps = {
        title: 'Test Toast',
        description: 'Test Description'
      }

      let result
      act(() => {
        result = toast(toastProps)
      })

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('dismiss')
      expect(result).toHaveProperty('update')
      expect(typeof result.id).toBe('string')
      expect(typeof result.dismiss).toBe('function')
      expect(typeof result.update).toBe('function')
    })

    it('should dismiss a toast', () => {
      let toastInstance
      act(() => {
        toastInstance = toast({ title: 'Test' })
      })

      const { result } = renderHook(() => useToast())
      
      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        toastInstance.dismiss()
      })

      expect(result.current.toasts[0].open).toBe(false)
    })

    it('should update a toast', () => {
      let toastInstance
      act(() => {
        toastInstance = toast({ title: 'Original Title' })
      })

      const { result } = renderHook(() => useToast())
      
      expect(result.current.toasts[0].title).toBe('Original Title')

      act(() => {
        toastInstance.update({ title: 'Updated Title' })
      })

      expect(result.current.toasts[0].title).toBe('Updated Title')
    })
  })

  describe('useToast hook', () => {
    it('should return initial state', () => {
      const { result } = renderHook(() => useToast())
      
      expect(result.current).toHaveProperty('toasts')
      expect(result.current).toHaveProperty('toast')
      expect(result.current).toHaveProperty('dismiss')
      expect(Array.isArray(result.current.toasts)).toBe(true)
      expect(typeof result.current.toast).toBe('function')
      expect(typeof result.current.dismiss).toBe('function')
    })

    it('should add toast using hook', () => {
      const { result } = renderHook(() => useToast())
      
      act(() => {
        result.current.toast({
          title: 'Hook Toast',
          description: 'Created via hook'
        })
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Hook Toast')
      expect(result.current.toasts[0].description).toBe('Created via hook')
    })

    it('should dismiss toast using hook', () => {
      const { result } = renderHook(() => useToast())
      
      let toastId
      act(() => {
        const toastResult = result.current.toast({ title: 'Test Toast' })
        toastId = toastResult.id
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        result.current.dismiss(toastId)
      })

      expect(result.current.toasts[0].open).toBe(false)
    })

    it('should handle onOpenChange callback', () => {
      const { result } = renderHook(() => useToast())
      
      act(() => {
        result.current.toast({ title: 'Test Toast' })
      })

      const toastItem = result.current.toasts[0]
      
      act(() => {
        toastItem.onOpenChange?.(false)
      })

      expect(result.current.toasts[0].open).toBe(false)
    })
  })

  describe('edge cases', () => {
    it('should handle empty toast props', () => {
      let toastInstance
      act(() => {
        toastInstance = toast({})
      })

      expect(toastInstance).toHaveProperty('id')
      expect(toastInstance).toHaveProperty('dismiss')
      expect(toastInstance).toHaveProperty('update')
    })

    it('should handle multiple hooks instances', () => {
      const { result: result1 } = renderHook(() => useToast())
      const { result: result2 } = renderHook(() => useToast())
      
      act(() => {
        result1.current.toast({ title: 'Toast 1' })
      })

      // Both hooks should see the same toast
      expect(result1.current.toasts).toHaveLength(1)
      expect(result2.current.toasts).toHaveLength(1)
      expect(result1.current.toasts[0].title).toBe('Toast 1')
      expect(result2.current.toasts[0].title).toBe('Toast 1')
    })
  })
}) 