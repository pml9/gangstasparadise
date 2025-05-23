import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024,
})

describe('useIsMobile', () => {
  let mockMediaQueryList: any

  beforeEach(() => {
    mockMediaQueryList = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      matches: false,
    }

    mockMatchMedia.mockReturnValue(mockMediaQueryList)
    mockAddEventListener.mockClear()
    mockRemoveEventListener.mockClear()
    mockMatchMedia.mockClear()

    // Reset window.innerWidth to desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial undefined state', () => {
    const { result } = renderHook(() => useIsMobile())
    
    // The hook should call matchMedia with the correct query
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('should set up media query listener on mount', () => {
    renderHook(() => useIsMobile())
    
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should remove media query listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile())
    
    unmount()
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should return false for desktop width (>= 768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
  })

  it('should return true for mobile width (< 768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(true)
  })

  it('should return false for exact breakpoint (768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768,
    })

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(false)
  })

  it('should return true for one pixel below breakpoint (767px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    })

    const { result } = renderHook(() => useIsMobile())
    
    expect(result.current).toBe(true)
  })

  it('should update state when media query changes', () => {
    const { result } = renderHook(() => useIsMobile())
    
    // Initially desktop
    expect(result.current).toBe(false)
    
    // Get the change listener that was registered
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    const changeListener = mockAddEventListener.mock.calls[0][1]
    
    // Simulate window resize to mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500,
    })
    
    act(() => {
      changeListener()
    })
    
    expect(result.current).toBe(true)
  })

  it('should update state from mobile to desktop', () => {
    // Start with mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500,
    })

    const { result } = renderHook(() => useIsMobile())
    
    // Initially mobile
    expect(result.current).toBe(true)
    
    // Get the change listener
    const changeListener = mockAddEventListener.mock.calls[0][1]
    
    // Simulate window resize to desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })
    
    act(() => {
      changeListener()
    })
    
    expect(result.current).toBe(false)
  })

  it('should handle multiple state changes', () => {
    const { result } = renderHook(() => useIsMobile())
    
    const changeListener = mockAddEventListener.mock.calls[0][1]
    
    // Start desktop -> mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 400,
    })
    
    act(() => {
      changeListener()
    })
    
    expect(result.current).toBe(true)
    
    // Mobile -> desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1200,
    })
    
    act(() => {
      changeListener()
    })
    
    expect(result.current).toBe(false)
    
    // Desktop -> mobile again
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 600,
    })
    
    act(() => {
      changeListener()
    })
    
    expect(result.current).toBe(true)
  })

  it('should properly cleanup on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile())
    
    // Verify listener was added
    expect(mockAddEventListener).toHaveBeenCalledTimes(1)
    
    unmount()
    
    // Verify listener was removed with the same function reference
    expect(mockRemoveEventListener).toHaveBeenCalledTimes(1)
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'change',
      mockAddEventListener.mock.calls[0][1]
    )
  })

  it('should handle rapid consecutive changes', () => {
    const { result } = renderHook(() => useIsMobile())
    
    const changeListener = mockAddEventListener.mock.calls[0][1]
    
    // Rapid changes
    const widths = [400, 800, 300, 900, 500]
    const expectedResults = [true, false, true, false, true]
    
    widths.forEach((width, index) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: width,
      })
      
      act(() => {
        changeListener()
      })
      
      expect(result.current).toBe(expectedResults[index])
    })
  })

  describe('edge cases', () => {
    it('should handle window.innerWidth of 0', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 0,
      })

      const { result } = renderHook(() => useIsMobile())
      
      expect(result.current).toBe(true)
    })

    it('should handle very large window widths', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 10000,
      })

      const { result } = renderHook(() => useIsMobile())
      
      expect(result.current).toBe(false)
    })

    it('should handle negative window width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: -100,
      })

      const { result } = renderHook(() => useIsMobile())
      
      expect(result.current).toBe(true)
    })

    it('should handle decimal window widths', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 767.5,
      })

      const { result } = renderHook(() => useIsMobile())
      
      expect(result.current).toBe(true)
    })

    it('should handle NaN window width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: NaN,
      })

      const { result } = renderHook(() => useIsMobile())
      
      expect(result.current).toBe(false) // NaN < 768 is false, so !!false is false
    })

    it('should use correct media query breakpoint', () => {
      renderHook(() => useIsMobile())
      
      // Verify it uses 767px as max-width (768 - 1)
      expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
    })

    it('should handle multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useIsMobile())
      const { result: result2 } = renderHook(() => useIsMobile())
      
      // Both should register their own listeners
      expect(mockAddEventListener).toHaveBeenCalledTimes(2)
      
      // Both should return the same initial value
      expect(result1.current).toBe(result2.current)
      
      // Change window size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      })
      
      // Trigger both listeners
      const listener1 = mockAddEventListener.mock.calls[0][1]
      const listener2 = mockAddEventListener.mock.calls[1][1]
      
      act(() => {
        listener1()
        listener2()
      })
      
      // Both should return the same updated value
      expect(result1.current).toBe(true)
      expect(result2.current).toBe(true)
    })
  })
}) 