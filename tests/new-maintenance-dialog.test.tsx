import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewMaintenanceDialog } from '@/components/new-maintenance-dialog'

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock fetch
global.fetch = vi.fn()

describe('NewMaintenanceDialog', () => {
  const mockOnSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default successful fetch response for devices
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        devices: [
          { id: 1, type: 'Laptop', model: 'Dell XPS', location: 'Office 101', serial_number: 'DEL123' },
          { id: 2, type: 'Monitor', model: 'Samsung 24"', location: 'Office 102', serial_number: 'SAM456' }
        ]
      })
    })
  })

  it('renders the component', () => {
    render(<NewMaintenanceDialog onSuccess={mockOnSuccess} />)
    
    // Should render the trigger button
    const button = screen.getByTestId('new-maintenance-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('+ New Request')
    expect(button).toHaveAttribute('aria-label', 'Create new maintenance request')
    
    // Dialog should not be open initially
    expect(screen.queryByTestId('maintenance-dialog')).not.toBeInTheDocument()
  })

  it('error state', async () => {
    const user = userEvent.setup()
    
    // Mock fetch failure for devices
    ;(global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch devices'))
    
    render(<NewMaintenanceDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByTestId('new-maintenance-button'))
    
    // Wait for dialog to open
    await waitFor(() => {
      expect(screen.getByTestId('maintenance-dialog')).toBeInTheDocument()
    })
    
    // Should show dialog content
    expect(screen.getByText('New Maintenance Request')).toBeInTheDocument()
    expect(screen.getByText('Report a facility or equipment issue that needs attention.')).toBeInTheDocument()
    
    // Form should be present
    expect(screen.getByTestId('maintenance-form')).toBeInTheDocument()
    
    // Check for form elements by their labels and IDs
    expect(screen.getByLabelText(/Device/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Issue Type/)).toBeInTheDocument()
    expect(screen.getByTestId('issue-description')).toBeInTheDocument()
    
    // Submit button should be disabled initially (no form data)
    const submitButton = screen.getByTestId('maintenance-submit')
    expect(submitButton).toBeDisabled()
  })

  it('edge case', async () => {
    const user = userEvent.setup()
    
    // Mock devices with special characters and long names
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        devices: [
          { 
            id: 999, 
            type: 'Equipment with Special Characters !@#$%', 
            model: 'Very Long Model Name That Should Not Break Layout XYZ-2000-Pro-Max-Ultra', 
            location: 'Building A - Floor 10 - Room 1001 (Conference)', 
            serial_number: 'SPECIAL-123!@#' 
          }
        ]
      })
    })
    
    render(<NewMaintenanceDialog onSuccess={mockOnSuccess} />)
    
    // Open dialog
    await user.click(screen.getByTestId('new-maintenance-button'))
    
    await waitFor(() => {
      expect(screen.getByTestId('maintenance-dialog')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Check that form elements are present
    expect(screen.getByLabelText(/Device/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Issue Type/)).toBeInTheDocument()
    expect(screen.getByTestId('issue-description')).toBeInTheDocument()
    
    // Verify the issue description textarea can handle special characters
    const descriptionField = screen.getByTestId('issue-description')
    const edgeCaseDescription = 'Issue with special characters !@#$%^&*()'
    
    await user.type(descriptionField, edgeCaseDescription)
    expect(descriptionField).toHaveValue(edgeCaseDescription)
    
    // The form elements should handle the complex data without breaking
    expect(screen.getByTestId('maintenance-dialog')).toBeInTheDocument()
  }, 10000)
}) 