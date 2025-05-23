import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateRangePicker } from '@/components/date-range-picker'
import type { DateRange } from 'react-day-picker'

describe('DateRangePicker', () => {
  const mockOnChange = vi.fn()

  const defaultProps = {
    onChange: mockOnChange,
    placeholder: 'Pick a date range'
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders the component', () => {
    render(<DateRangePicker {...defaultProps} />)
    
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Pick a date range')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog')
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('error state', () => {
    // Test with aria-invalid to simulate error state
    const errorProps = {
      ...defaultProps,
      'aria-invalid': 'true' as const,
      'aria-required': 'true' as const
    }
    
    render(<DateRangePicker {...errorProps} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-invalid', 'true')
    expect(button).toHaveAttribute('aria-required', 'true')
    expect(button).toHaveClass('border-red-500')
  })

  it('edge case', async () => {
    const user = userEvent.setup()
    
    // Test with pre-selected date range and custom testid
    const initialDate: DateRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31')
    }
    
    const edgeCaseProps = {
      ...defaultProps,
      value: initialDate,
      placeholder: 'Custom placeholder with special chars !@#$%',
      'data-testid': 'custom-date-picker',
      className: 'custom-class'
    }
    
    render(<DateRangePicker {...edgeCaseProps} />)
    
    const button = screen.getByTestId('custom-date-picker')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-testid', 'custom-date-picker')
    
    // Should display formatted date range instead of placeholder
    expect(screen.getByText(/Jan 01, 2024 - Jan 31, 2024/)).toBeInTheDocument()
    
    // Test opening the popover
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    
    // Calendar should be visible
    expect(screen.getByTestId('date-range-calendar')).toBeInTheDocument()
  })
}) 