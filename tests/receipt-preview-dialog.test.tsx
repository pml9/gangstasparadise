import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReceiptPreviewDialog } from '@/components/receipt-preview-dialog'

describe('ReceiptPreviewDialog', () => {
  const defaultProps = {
    receiptUrl: 'https://example.com/receipt.jpg',
    expenseDescription: 'Coffee meeting with client'
  }

  it('renders the component', () => {
    render(<ReceiptPreviewDialog {...defaultProps} />)
    
    // Should render the trigger button
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-8', 'w-8')
    
    // Should have accessible screen reader text
    expect(screen.getByText('View Receipt')).toBeInTheDocument()
    
    // Dialog should not be open initially
    expect(screen.queryByText('Receipt: Coffee meeting with client')).not.toBeInTheDocument()
  })

  it('error state', () => {
    // Test with missing/invalid receiptUrl
    const errorProps = {
      receiptUrl: '',
      expenseDescription: 'Expense without receipt'
    }
    
    render(<ReceiptPreviewDialog {...errorProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('View Receipt')).toBeInTheDocument()
    
    // Component should still render even with empty receiptUrl
    // The image will fallback to placeholder.svg in the actual component
  })

  it('edge case', async () => {
    const user = userEvent.setup()
    
    // Test with very long description and complex URL
    const edgeCaseProps = {
      receiptUrl: 'https://very-long-domain-name.example.com/path/to/receipt/with/very/long/filename-containing-special-characters-!@#$%^&*()_+.jpg?version=1&timestamp=1234567890&token=abcdef123456',
      expenseDescription: 'Very long expense description that contains special characters !@#$%^&*() and numbers 123456 and should not break the dialog layout or functionality'
    }
    
    render(<ReceiptPreviewDialog {...edgeCaseProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    // Open the dialog
    await user.click(button)
    
    // Dialog should be open with the long title
    expect(screen.getByText(`Receipt: ${edgeCaseProps.expenseDescription}`)).toBeInTheDocument()
    
    // Image should have the correct alt text and src
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', `Receipt for ${edgeCaseProps.expenseDescription}`)
    expect(image).toHaveAttribute('src', expect.stringContaining('very-long-domain-name.example.com'))
  })
}) 