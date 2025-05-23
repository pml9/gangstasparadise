import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MaintenancePage from '@/app/dashboard/maintenance/page'

// Mock the fetch function
global.fetch = vi.fn()

// Mock the components that are imported
vi.mock('@/components/new-maintenance-dialog', () => ({
  NewMaintenanceDialog: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess} data-testid="new-maintenance-dialog">
      New Maintenance Request
    </button>
  )
}))

vi.mock('@/components/need-help-section', () => ({
  NeedHelpSection: () => <div data-testid="need-help-section">Need Help</div>
}))

const mockMaintenanceIssues = [
  {
    id: '1',
    created_at: '2024-01-15T10:00:00Z',
    issue_type: 'Electrical',
    description: 'Flickering lights in conference room',
    status: 'new' as const,
    device: {
      type: 'Lighting',
      model: 'LED Panel v2'
    }
  },
  {
    id: '2',
    created_at: '2024-01-10T15:30:00Z',
    issue_type: 'Plumbing',
    description: 'Leaky faucet in kitchen',
    status: 'in_progress' as const,
    device: null
  },
  {
    id: '3',
    created_at: '2024-01-08T12:00:00Z',
    issue_type: 'HVAC',
    description: 'Air conditioning not working properly',
    status: 'resolved' as const,
    device: {
      type: 'AC Unit',
      model: 'CoolAir Pro 3000'
    }
  }
]

describe('MaintenancePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    // Mock fetch to never resolve
    const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {}))
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    expect(screen.getByText('Loading your maintenance requests...')).toBeInTheDocument()
    // Check for loading spinner by class instead of test ID
    const loadingSpinner = document.querySelector('.animate-spin')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('renders page title and description', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /maintenance issues management/i })).toBeInTheDocument()
    })
    
    expect(screen.getByText(/report and track facility-related issues across your workspace/i)).toBeInTheDocument()
  })

  it('renders all filter buttons', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    const { container } = render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    })
    
    // Use container to find filter buttons more accurately
    const filterContainer = container.querySelector('.flex.gap-2.mb-6')
    const filterButtons = filterContainer?.querySelectorAll('button')
    expect(filterButtons).toHaveLength(5)
    expect(filterButtons?.[1]?.textContent).toBe('New')
    expect(screen.getByRole('button', { name: /assigned/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /in progress/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /resolved/i })).toBeInTheDocument()
  })

  it('renders maintenance table with correct headers', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('#')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Issue Type')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Device')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  it('displays maintenance issues data correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('#1')).toBeInTheDocument()
    })
    
    expect(screen.getByText('#2')).toBeInTheDocument()
    expect(screen.getByText('#3')).toBeInTheDocument()
    expect(screen.getByText('Electrical')).toBeInTheDocument()
    expect(screen.getByText('Plumbing')).toBeInTheDocument()
    expect(screen.getByText('HVAC')).toBeInTheDocument()
    expect(screen.getByText('Flickering lights in conference room')).toBeInTheDocument()
    expect(screen.getByText('Leaky faucet in kitchen')).toBeInTheDocument()
    expect(screen.getByText('Air conditioning not working properly')).toBeInTheDocument()
  })

  it('displays device information correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Lighting - LED Panel v2')).toBeInTheDocument()
    })
    
    expect(screen.getByText('AC Unit - CoolAir Pro 3000')).toBeInTheDocument()
    
    // Check for dash when no device
    const dashElements = screen.getAllByText('-')
    expect(dashElements.some(el => el.classList.contains('text-gray-400'))).toBe(true)
  })

  it('renders status badges with correct styling and labels', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      const newBadges = screen.getAllByText('New')
      // Find the badge element (not the button)
      const newBadge = newBadges.find(el => el.className.includes('rounded-full'))
      expect(newBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
    })
    
    const inProgressBadges = screen.getAllByText('In Progress')
    const inProgressBadge = inProgressBadges.find(el => el.className.includes('rounded-full'))
    expect(inProgressBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
    
    const resolvedBadges = screen.getAllByText('Resolved')
    const resolvedBadge = resolvedBadges.find(el => el.className.includes('rounded-full'))
    expect(resolvedBadge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
  })

  it('filters issues correctly when clicking filter buttons', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    const { container } = render(<MaintenancePage />)
    
    await waitFor(() => {
      const newElements = screen.getAllByText('New')
      expect(newElements.length).toBeGreaterThan(0)
    })
    
    // Initially should show all issues
    const inProgressElements = screen.getAllByText('In Progress')
    expect(inProgressElements.length).toBeGreaterThan(0)
    const resolvedElements = screen.getAllByText('Resolved')
    expect(resolvedElements.length).toBeGreaterThan(0)
    
    // Click new filter button using container selector
    const filterContainer = container.querySelector('.flex.gap-2.mb-6')
    const filterButtons = filterContainer?.querySelectorAll('button')
    const newFilterButton = filterButtons?.[1] // Second button should be "New"
    if (newFilterButton) {
      await user.click(newFilterButton)
    }
    
    await waitFor(() => {
      expect(screen.getAllByText('New').length).toBeGreaterThan(0)
    })
    // After filtering to "New", "In Progress" status badges should not be visible
    await waitFor(() => {
      const inProgressBadges = screen.queryAllByText('In Progress').filter(el => el.className.includes('rounded-full'))
      expect(inProgressBadges).toHaveLength(0)
    })
    const resolvedBadges = screen.queryAllByText('Resolved').filter(el => el.className.includes('rounded-full'))
    expect(resolvedBadges).toHaveLength(0)
    
    // Click resolved filter
    await user.click(screen.getByRole('button', { name: /resolved/i }))
    
    await waitFor(() => {
      const resolvedElements = screen.getAllByText('Resolved')
      expect(resolvedElements.length).toBeGreaterThan(0)
    })
    // After clicking resolved, New status badge should not be visible
    const newBadges = screen.queryAllByText('New').filter(el => el.className.includes('rounded-full'))
    expect(newBadges).toHaveLength(0)
    const inProgressBadges = screen.queryAllByText('In Progress').filter(el => el.className.includes('rounded-full'))
    expect(inProgressBadges).toHaveLength(0)
  })

  it('displays empty state when no issues', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('No maintenance issues found.')).toBeInTheDocument()
    })
  })

  it('formats dates correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Jan 10, 2024')).toBeInTheDocument()
    expect(screen.getByText('Jan 8, 2024')).toBeInTheDocument()
  })

  it('truncates long descriptions', async () => {
    const issueWithLongDescription = [{
      id: '1',
      created_at: '2024-01-15T10:00:00Z',
      issue_type: 'Electrical',
      description: 'This is a very long description that should be truncated in the table view to maintain proper layout and readability',
      status: 'new' as const,
      device: null
    }]

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => issueWithLongDescription
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      const descriptionCell = screen.getByText(/this is a very long description/i)
      expect(descriptionCell).toHaveClass('truncate')
      expect(descriptionCell).toHaveAttribute('title', issueWithLongDescription[0].description)
    })
  })

  it('renders new maintenance dialog and need help section', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('new-maintenance-dialog')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('need-help-section')).toBeInTheDocument()
  })

  it('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('No maintenance issues found.')).toBeInTheDocument()
    })
    
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch maintenance issues:', expect.any(Error))
    consoleSpy.mockRestore()
  })

  it('shows correct issue count', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMaintenanceIssues
    })
    global.fetch = mockFetch

    render(<MaintenancePage />)
    
    await waitFor(() => {
      expect(screen.getByText('Showing 3 of 3 issues')).toBeInTheDocument()
    })
  })
}) 