import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewSickLeaveDialog } from '@/components/new-sick-leave-dialog'

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock the DateRangePicker component
vi.mock('@/components/date-range-picker', () => ({
  DateRangePicker: ({ onChange, value, placeholder, 'data-testid': testId, 'aria-required': ariaRequired, 'aria-invalid': ariaInvalid }: any) => (
    <div data-testid={testId}>
      <button 
        onClick={() => onChange?.({ from: new Date('2024-01-01'), to: new Date('2024-01-02') })}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
      >
        {value?.from && value?.to ? `${value.from.toDateString()} - ${value.to.toDateString()}` : placeholder}
      </button>
    </div>
  )
}))

// Mock fetch
global.fetch = vi.fn()

describe('NewSickLeaveDialog', () => {
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
    render(<NewSickLeaveDialog onSuccess={mockOnSuccess} />)
    
    // Should render the trigger button
    const button = screen.getByTestId('new-sick-leave-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('+ New Request')
    expect(button).toHaveAttribute('aria-label', 'Create new sick leave request')
    
    // Dialog should not be open initially
    expect(screen.queryByTestId('sick-leave-dialog')).not.toBeInTheDocument()
  })

  it('error state', async () => {
    const user = userEvent.setup()
    
    // Mock fetch failure
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))
    
    render(<NewSickLeaveDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByTestId('new-sick-leave-button'))
    
    // Wait for dialog to open
    await waitFor(() => {
      expect(screen.getByTestId('sick-leave-dialog')).toBeInTheDocument()
    })
    
    // Should show dialog content
    expect(screen.getByText('New Sick Leave Request')).toBeInTheDocument()
    expect(screen.getByText('Please select the dates for your sick leave and provide a reason. All fields are required.')).toBeInTheDocument()
    
    // Form should be present
    expect(screen.getByTestId('sick-leave-form')).toBeInTheDocument()
    expect(screen.getByTestId('sick-leave-date-range')).toBeInTheDocument()
    expect(screen.getByTestId('sick-leave-reason')).toBeInTheDocument()
    
    // Submit button should be disabled initially (no form data)
    const submitButton = screen.getByTestId('sick-leave-submit')
    expect(submitButton).toBeDisabled()
    
    // Error messages should be visible for empty fields
    expect(screen.getByText('Please select a date range')).toBeInTheDocument()
    expect(screen.getByText('Please provide a reason')).toBeInTheDocument()
  })

  it('edge case', async () => {
    const user = userEvent.setup()
    
    render(<NewSickLeaveDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByTestId('new-sick-leave-button'))
    
    await waitFor(() => {
      expect(screen.getByTestId('sick-leave-dialog')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Fill form with edge case data - special characters
    const edgeCaseReason = 'Reason with special characters !@#$%^&*()'
    
    // Fill the date range (using mocked component)
    const dateRangePicker = screen.getByTestId('sick-leave-date-range')
    const dateButton = dateRangePicker.querySelector('button')
    if (dateButton) {
      await user.click(dateButton)
    }
    
    // Fill the reason textarea
    const reasonTextarea = screen.getByTestId('sick-leave-reason')
    await user.clear(reasonTextarea)
    await user.type(reasonTextarea, edgeCaseReason)
    
    // Verify the reason field contains the edge case text
    expect(reasonTextarea).toHaveValue(edgeCaseReason)
    
    // The form should handle the complex input without errors
    expect(screen.getByTestId('sick-leave-form')).toBeInTheDocument()
  }, 10000)
}) 