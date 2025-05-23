import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

// Mock document methods
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(document, 'addEventListener', {
  value: mockAddEventListener,
  writable: true
})

Object.defineProperty(document, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true
})

describe('useOnClickOutside', () => {
  const mockHandler = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockAddEventListener.mockClear()
    mockRemoveEventListener.mockClear()
    mockHandler.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should add event listeners on mount', () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    expect(mockAddEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(mockAddEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function))
    
    // Check that both mousedown and touchstart listeners were added
    const mousedownCalls = mockAddEventListener.mock.calls.filter(call => call[0] === 'mousedown')
    const touchstartCalls = mockAddEventListener.mock.calls.filter(call => call[0] === 'touchstart')
    
    expect(mousedownCalls).toHaveLength(1)
    expect(touchstartCalls).toHaveLength(1)
  })

  it('should remove event listeners on unmount', () => {
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledTimes(2)
    expect(mockRemoveEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(mockRemoveEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function))
  })

  it('should call handler when clicking outside element', () => {
    const mockElement = document.createElement('div')
    const outsideElement = document.createElement('div')
    
    // Mock contains method to return false (clicking outside)
    mockElement.contains = vi.fn().mockReturnValue(false)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockElement)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    // Get the event listener that was registered
    const mousedownListener = mockAddEventListener.mock.calls.find(
      call => call[0] === 'mousedown'
    )?.[1]

    expect(mousedownListener).toBeDefined()

    // Simulate mousedown event outside the element
    const mockEvent = {
      target: outsideElement
    } as MouseEvent

    mousedownListener(mockEvent)

    expect(mockElement.contains).toHaveBeenCalledWith(outsideElement)
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(mockEvent)
  })

  it('should not call handler when clicking inside element', () => {
    const mockElement = document.createElement('div')
    const insideElement = document.createElement('span')
    
    // Mock contains method to return true (clicking inside)
    mockElement.contains = vi.fn().mockReturnValue(true)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockElement)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    // Get the event listener that was registered
    const mousedownListener = mockAddEventListener.mock.calls.find(
      call => call[0] === 'mousedown'
    )?.[1]

    expect(mousedownListener).toBeDefined()

    // Simulate mousedown event inside the element
    const mockEvent = {
      target: insideElement
    } as MouseEvent

    mousedownListener(mockEvent)

    expect(mockElement.contains).toHaveBeenCalledWith(insideElement)
    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('should not call handler when ref.current is null', () => {
    const outsideElement = document.createElement('div')

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    // Get the event listener that was registered
    const mousedownListener = mockAddEventListener.mock.calls.find(
      call => call[0] === 'mousedown'
    )?.[1]

    expect(mousedownListener).toBeDefined()

    // Simulate mousedown event
    const mockEvent = {
      target: outsideElement
    } as MouseEvent

    mousedownListener(mockEvent)

    expect(mockHandler).not.toHaveBeenCalled()
  })

  it('should handle touchstart events', () => {
    const mockElement = document.createElement('div')
    const outsideElement = document.createElement('div')
    
    // Mock contains method to return false (touching outside)
    mockElement.contains = vi.fn().mockReturnValue(false)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockElement)
      useOnClickOutside(ref, mockHandler)
      return ref
    })

    // Get the touchstart event listener that was registered
    const touchstartListener = mockAddEventListener.mock.calls.find(
      call => call[0] === 'touchstart'
    )?.[1]

    expect(touchstartListener).toBeDefined()

    // Simulate touchstart event outside the element
    const mockEvent = {
      target: outsideElement
    } as TouchEvent

    touchstartListener(mockEvent)

    expect(mockElement.contains).toHaveBeenCalledWith(outsideElement)
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith(mockEvent)
  })

  it('should handle handler changes', () => {
    const newHandler = vi.fn()
    const mockElement = document.createElement('div')
    const outsideElement = document.createElement('div')
    
    mockElement.contains = vi.fn().mockReturnValue(false)

    const { rerender } = renderHook(
      ({ handler }) => {
        const ref = useRef<HTMLDivElement>(mockElement)
        useOnClickOutside(ref, handler)
        return ref
      },
      { initialProps: { handler: mockHandler } }
    )

    // Get the initial event listener
    const initialListener = mockAddEventListener.mock.calls.find(
      call => call[0] === 'mousedown'
    )?.[1]

    // Trigger initial handler
    const mockEvent = { target: outsideElement } as MouseEvent
    initialListener(mockEvent)
    
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(newHandler).not.toHaveBeenCalled()

    // Update the handler
    rerender({ handler: newHandler })

    // The event listeners should be re-registered
    expect(mockRemoveEventListener).toHaveBeenCalledTimes(2)
    expect(mockAddEventListener).toHaveBeenCalledTimes(4) // 2 initial + 2 after rerender

    // Get the new event listener
    const newListener = mockAddEventListener.mock.calls
      .slice(-2)
      .find(call => call[0] === 'mousedown')?.[1]

    // Trigger new handler
    newListener(mockEvent)
    
    expect(newHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledTimes(1) // Still only called once from before
  })

  describe('edge cases', () => {
    it('should handle event with null target', () => {
      const mockElement = document.createElement('div')
      mockElement.contains = vi.fn()

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(mockElement)
        useOnClickOutside(ref, mockHandler)
        return ref
      })

      const listener = mockAddEventListener.mock.calls.find(
        call => call[0] === 'mousedown'
      )?.[1]

      // Simulate event with null target
      const mockEvent = { target: null } as unknown as MouseEvent
      
      expect(() => listener(mockEvent)).not.toThrow()
      // With null target, contains() returns false, so handler should be called
      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler).toHaveBeenCalledWith(mockEvent)
    })

    it('should handle multiple hook instances', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const mockElement1 = document.createElement('div')
      const mockElement2 = document.createElement('div')
      const outsideElement = document.createElement('div')
      
      mockElement1.contains = vi.fn().mockReturnValue(false)
      mockElement2.contains = vi.fn().mockReturnValue(false)

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(mockElement1)
        useOnClickOutside(ref, handler1)
        return ref
      })

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(mockElement2)
        useOnClickOutside(ref, handler2)
        return ref
      })

      // Both should register their own listeners
      expect(mockAddEventListener).toHaveBeenCalledTimes(4) // 2 per hook

      // Get the listeners
      const listeners = mockAddEventListener.mock.calls
        .filter(call => call[0] === 'mousedown')
        .map(call => call[1])

      const mockEvent = { target: outsideElement } as MouseEvent

      // Trigger both listeners
      listeners.forEach(listener => listener(mockEvent))

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })
}) 