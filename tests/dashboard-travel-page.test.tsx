import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import TravelPage from '@/app/dashboard/travel/page'

// Mock the date-fns format function
vi.mock('date-fns', () => ({
  format: vi.fn((date, formatStr) => {
    if (formatStr === 'MMM d') return 'Jan 1'
    if (formatStr === 'MMM d, yyyy') return 'Jan 1, 2024'
    return 'Jan 1, 2024'
  })
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('TravelPage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    // Mock successful fetch response with empty array
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([])
    })
  })

  it('renders the page title', async () => {
    await act(async () => {
      render(<TravelPage />)
    })
    
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /corporate travel management/i })).toBeInTheDocument()
    })
  })

  it('renders the page description', async () => {
    await act(async () => {
      render(<TravelPage />)
    })
    
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByText(/request and track business trips for your work-related travel/i)).toBeInTheDocument()
    })
  })

  it('renders the travel requests card', async () => {
    await act(async () => {
      render(<TravelPage />)
    })
    
    // Wait for loading to complete and check for the card title
    await waitFor(() => {
      expect(screen.getByText('Your Travel Requests')).toBeInTheDocument()
    })
  })

  it('has correct container structure', async () => {
    let container: HTMLElement
    
    await act(async () => {
      const result = render(<TravelPage />)
      container = result.container
    })
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Corporate Travel Management')).toBeInTheDocument()
    })
    
    const rootContainer = container!.querySelector('.container.mx-auto.px-4')
    expect(rootContainer).toBeInTheDocument()
  })

  it('renders filter buttons', async () => {
    await act(async () => {
      render(<TravelPage />)
    })
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Your Travel Requests')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('filter-all')).toBeInTheDocument()
    expect(screen.getByTestId('filter-pending')).toBeInTheDocument()
    expect(screen.getByTestId('filter-approved')).toBeInTheDocument()
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument()
    expect(screen.getByTestId('filter-rejected')).toBeInTheDocument()
  })

  it('renders table headers', async () => {
    await act(async () => {
      render(<TravelPage />)
    })
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Your Travel Requests')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Destination')).toBeInTheDocument()
    expect(screen.getByText('Dates')).toBeInTheDocument()
    expect(screen.getByText('Purpose')).toBeInTheDocument()
    expect(screen.getByText('Est. Cost')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })
}) 