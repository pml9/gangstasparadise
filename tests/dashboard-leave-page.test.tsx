import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SickLeavePage from '@/app/dashboard/leave/page'

// Mock the fetch function
global.fetch = vi.fn()

// Mock the components that are imported
vi.mock('@/components/new-sick-leave-dialog', () => ({
  NewSickLeaveDialog: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess} data-testid="new-sick-leave-dialog">
      New Sick Leave
    </button>
  )
}))

vi.mock('@/components/need-help-section', () => ({
  NeedHelpSection: () => <div data-testid="need-help-section">Need Help</div>
}))

const mockSickLeaveRequests = [
  {
    id: '1',
    created_at: '2024-01-15T10:00:00Z',
    start_date: '2024-01-20',
    end_date: '2024-01-22',
    status: 'pending' as const,
    manager_comments: null
  },
  {
    id: '2',
    created_at: '2024-01-10T15:30:00Z',
    start_date: '2024-01-12',
    end_date: '2024-01-12',
    status: 'approved' as const,
    manager_comments: 'Hope you feel better soon!'
  },
  {
    id: '3',
    created_at: '2024-01-08T12:00:00Z',
    start_date: '2024-01-15',
    end_date: '2024-01-17',
    status: 'rejected' as const,
    manager_comments: 'Please provide medical certificate for extended leave'
  }
]

describe('SickLeavePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    // Mock fetch to never resolve
    const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {}))
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    expect(screen.getByText('Loading your sick leave requests...')).toBeInTheDocument()
    // Check for loading spinner by class instead of test ID
    const loadingSpinner = document.querySelector('.animate-spin')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('renders page title and description', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sick leave management/i })).toBeInTheDocument()
    })
    
    expect(screen.getByText(/submit and track your sick leave requests in one place/i)).toBeInTheDocument()
  })

  it('renders all filter buttons', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    })
    
    expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /approved/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rejected/i })).toBeInTheDocument()
  })

  it('renders sick leave table with correct headers', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Request Date')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Leave Period')).toBeInTheDocument()
    expect(screen.getByText('Duration')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('displays sick leave requests data correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      const threeDaysElements = screen.getAllByText('3 days')
      expect(threeDaysElements.length).toBe(2) // Two 3-day requests in mock data
    })
    
    expect(screen.getByText('1 day')).toBeInTheDocument()
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    const rejectedElements = screen.getAllByText('Rejected')
    expect(rejectedElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Hope you feel better soon!')).toBeInTheDocument()
    expect(screen.getByText('Please provide medical certificate for extended leave')).toBeInTheDocument()
  })

  it('formats date ranges correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Jan 20 - Jan 22, 2024')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Jan 12, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 15 - Jan 17, 2024')).toBeInTheDocument()
  })

  it('calculates duration correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      const threeDaysElements = screen.getAllByText('3 days')
      expect(threeDaysElements.length).toBe(2) // Two 3-day requests in mock data
    })
    
    expect(screen.getByText('1 day')).toBeInTheDocument()
  })

  it('filters requests correctly when clicking filter buttons', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      const pendingElements = screen.getAllByText('Pending')
      expect(pendingElements.length).toBeGreaterThan(0)
    })
    
    // Initially should show all requests
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    const rejectedElements = screen.getAllByText('Rejected')
    expect(rejectedElements.length).toBeGreaterThan(0)
    
    // Click pending filter
    await user.click(screen.getByRole('button', { name: /pending/i }))
    
    await waitFor(() => {
      const pendingBadges = screen.getAllByText('Pending').filter(el => el.className.includes('rounded-full'))
      expect(pendingBadges.length).toBeGreaterThan(0)
    })
    const approvedBadges = screen.queryAllByText('Approved').filter(el => el.className.includes('rounded-full'))
    expect(approvedBadges).toHaveLength(0)
    const rejectedBadges = screen.queryAllByText('Rejected').filter(el => el.className.includes('rounded-full'))
    expect(rejectedBadges).toHaveLength(0)
    
    // Click approved filter
    await user.click(screen.getByRole('button', { name: /approved/i }))
    
    await waitFor(() => {
      const approvedBadgesAfterFilter = screen.getAllByText('Approved').filter(el => el.className.includes('rounded-full'))
      expect(approvedBadgesAfterFilter.length).toBeGreaterThan(0)
    })
    const pendingBadgesAfterFilter = screen.queryAllByText('Pending').filter(el => el.className.includes('rounded-full'))
    expect(pendingBadgesAfterFilter).toHaveLength(0)
    const rejectedBadgesAfterFilter = screen.queryAllByText('Rejected').filter(el => el.className.includes('rounded-full'))
    expect(rejectedBadgesAfterFilter).toHaveLength(0)
  })

  it('displays empty state when no requests', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByText('No sick leave requests found.')).toBeInTheDocument()
    })
  })

  it('renders status badges with correct styling', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      const pendingElements = screen.getAllByText('Pending')
      // Find the badge element (should have rounded-full class)
      const pendingBadge = pendingElements.find(el => el.className.includes('rounded-full')) || pendingElements[0]
      expect(pendingBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
    })
    
    const approvedElements = screen.getAllByText('Approved')
    const approvedBadge = approvedElements.find(el => el.className.includes('rounded-full')) || approvedElements[0]
    expect(approvedBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
    
    const rejectedElements = screen.getAllByText('Rejected')
    const rejectedBadge = rejectedElements.find(el => el.className.includes('rounded-full')) || rejectedElements[0]
    expect(rejectedBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
  })

  it('displays dash for empty manager comments', async () => {
    const requestWithoutComments = [{
      id: '1',
      created_at: '2024-01-15T10:00:00Z',
      start_date: '2024-01-20',
      end_date: '2024-01-22',
      status: 'pending' as const,
      manager_comments: null
    }]

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => requestWithoutComments
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      const dashElement = screen.getByText('-')
      expect(dashElement).toHaveClass('text-gray-400')
    })
  })

  it('renders new sick leave dialog and need help section', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('new-sick-leave-dialog')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('need-help-section')).toBeInTheDocument()
  })

  it('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByText('No sick leave requests found.')).toBeInTheDocument()
    })
    
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch requests:', expect.any(Error))
    consoleSpy.mockRestore()
  })

  it('shows correct request count', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSickLeaveRequests
    })
    global.fetch = mockFetch

    render(<SickLeavePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Showing 3 of 3 requests')).toBeInTheDocument()
    })
  })
}) 