import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpensesPage from '@/app/dashboard/expenses/page'

// Mock the fetch function
global.fetch = vi.fn()

// Mock the components that are imported
vi.mock('@/components/new-expense-dialog', () => ({
  NewExpenseDialog: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess} data-testid="new-expense-dialog">
      New Expense
    </button>
  )
}))

vi.mock('@/components/receipt-preview-dialog', () => ({
  ReceiptPreviewDialog: ({ receiptUrl, expenseDescription }: { receiptUrl: string; expenseDescription: string }) => (
    <button data-testid="receipt-preview" data-receipt-url={receiptUrl}>
      View Receipt
    </button>
  )
}))

vi.mock('@/components/need-help-section', () => ({
  NeedHelpSection: () => <div data-testid="need-help-section">Need Help</div>
}))

const mockExpenses = [
  {
    id: '1',
    created_at: '2024-01-15T10:00:00Z',
    category: 'Travel',
    description: 'Flight to conference',
    amount: 500,
    currency: 'USD',
    status: 'pending' as const,
    receipt_url: 'https://example.com/receipt1.pdf'
  },
  {
    id: '2', 
    created_at: '2024-01-10T15:30:00Z',
    category: 'Meals',
    description: 'Client dinner',
    amount: 85,
    currency: 'USD',
    status: 'approved' as const,
    receipt_url: 'https://example.com/receipt2.pdf'
  },
  {
    id: '3',
    created_at: '2024-01-08T12:00:00Z',
    category: 'Office Supplies',
    description: 'Laptop purchase',
    amount: 1200,
    currency: 'USD',
    status: 'rejected' as const,
    receipt_url: null
  }
]

describe('ExpensesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    // Mock fetch to never resolve
    const mockFetch = vi.fn().mockImplementation(() => new Promise(() => {}))
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    expect(screen.getByText('Loading your expenses...')).toBeInTheDocument()
    // Check for loading spinner by class instead of test ID
    const loadingSpinner = document.querySelector('.animate-spin')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('renders page title and description', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /expense management/i })).toBeInTheDocument()
    })
    
    expect(screen.getByText(/upload, track, and manage your work-related expenses/i)).toBeInTheDocument()
  })

  it('renders all filter buttons', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    })
    
    expect(screen.getByRole('button', { name: /pending/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /approved/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rejected/i })).toBeInTheDocument()
  })

  it('renders expense table with correct headers', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Date')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Receipt')).toBeInTheDocument()
  })

  it('displays expenses data correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Flight to conference')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('$500.00')).toBeInTheDocument()
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    
    expect(screen.getByText('Client dinner')).toBeInTheDocument()
    expect(screen.getByText('Meals')).toBeInTheDocument()
    expect(screen.getByText('$85.00')).toBeInTheDocument()
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
  })

  it('filters expenses correctly when clicking filter buttons', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Flight to conference')).toBeInTheDocument()
    })
    
    // Click pending filter
    await user.click(screen.getByRole('button', { name: /pending/i }))
    
    expect(screen.getByText('Flight to conference')).toBeInTheDocument()
    expect(screen.queryByText('Client dinner')).not.toBeInTheDocument()
    
    // Click approved filter
    await user.click(screen.getByRole('button', { name: /approved/i }))
    
    expect(screen.queryByText('Flight to conference')).not.toBeInTheDocument()
    expect(screen.getByText('Client dinner')).toBeInTheDocument()
  })

  it('displays empty state when no expenses', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('No expenses found.')).toBeInTheDocument()
    })
  })

  it('formats currency correctly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('$500.00')).toBeInTheDocument()
    })
    
    expect(screen.getByText('$85.00')).toBeInTheDocument()
    expect(screen.getByText('$1,200.00')).toBeInTheDocument()
  })

  it('renders status badges with correct styling', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      const pendingElements = screen.getAllByText('Pending')
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

  it('renders new expense dialog and need help section', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockExpenses
    })
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByTestId('new-expense-dialog')).toBeInTheDocument()
    })
    
    expect(screen.getByTestId('need-help-section')).toBeInTheDocument()
  })

  it('handles fetch error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
    global.fetch = mockFetch

    render(<ExpensesPage />)
    
    await waitFor(() => {
      expect(screen.getByText('No expenses found.')).toBeInTheDocument()
    })
    
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch expenses:', expect.any(Error))
    consoleSpy.mockRestore()
  })
}) 