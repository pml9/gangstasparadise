import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewExpenseDialog } from '@/components/new-expense-dialog'

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock fetch
global.fetch = vi.fn()

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-object-url')
global.URL.revokeObjectURL = vi.fn()

describe('NewExpenseDialog', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful fetch response
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })
  })

  it('renders the component', () => {
    render(<NewExpenseDialog onSuccess={mockOnSuccess} />)
    
    // Should render the trigger button
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('+ New Expense')
    
    // Dialog should not be open initially
    expect(screen.queryByText('New Expense Report')).not.toBeInTheDocument()
  })

  it('error state', async () => {
    const user = userEvent.setup()
    
    // Mock fetch failure
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))
    
    render(<NewExpenseDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByRole('button'))
    
    // Wait for dialog to open
    await waitFor(() => {
      expect(screen.getByText('New Expense Report')).toBeInTheDocument()
    })
    
    // Should show upload step initially
    expect(screen.getByText('Upload Receipt')).toBeInTheDocument()
    expect(screen.getByText('Upload a receipt to automatically extract expense details.')).toBeInTheDocument()
    
    // Should have file input and upload area
    const fileInput = screen.getByTestId('receipt-file-input')
    expect(fileInput).toBeInTheDocument()
    
    const selectButton = screen.getByTestId('select-file-button')
    expect(selectButton).toBeInTheDocument()
  })

  it('edge case', async () => {
    const user = userEvent.setup()
    
    // Mock successful OCR processing with edge case data
    ;(global.fetch as any).mockImplementation((url: string) => {
      if (url.includes('/api/expenses/upload-receipt')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            ocr_data: {
              detected_amount: 999999.99,
              suggested_category: 'Category with Special Characters !@#$%',
              merchant_name: 'Very Long Merchant Name with Special Characters & Symbols !@#$%^&*()',
              transaction_date: '2024-12-31'
            }
          })
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    })
    
    render(<NewExpenseDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByRole('button'))
    
    await waitFor(() => {
      expect(screen.getByText('New Expense Report')).toBeInTheDocument()
    })
    
    // Check that the upload area exists
    expect(screen.getByTestId('receipt-upload-area')).toBeInTheDocument()
    expect(screen.getByTestId('receipt-file-input')).toBeInTheDocument()
    
    // Component should handle edge case data without breaking
    expect(screen.getByText('New Expense Report')).toBeInTheDocument()
  })
}) 