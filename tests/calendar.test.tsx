import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/components/ui/calendar'

describe('Calendar', () => {
  it('renders the component', () => {
    render(<Calendar data-testid="calendar" />)
    
    // Check for calendar wrapper
    const calendar = screen.getByTestId('calendar')
    expect(calendar).toBeInTheDocument()
    expect(calendar).toHaveClass('p-3')
    
    // Check for navigation buttons
    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const nextButton = screen.getByRole('button', { name: /next month/i })
    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with disabled state and invalid date range
    const pastDate = new Date('2020-01-01')
    const futureDate = new Date('2030-12-31')
    
    render(
      <Calendar 
        disabled
        fromDate={futureDate}
        toDate={pastDate}
        className="disabled-calendar"
        data-testid="disabled-calendar"
      />
    )
    
    const calendar = screen.getByTestId('disabled-calendar')
    expect(calendar).toBeInTheDocument()
    expect(calendar).toHaveClass('disabled-calendar', 'p-3')
  })

  it('edge case', () => {
    // Test with custom props, selected date, and event handlers
    const selectedDate = new Date('2024-06-15')
    const handleSelect = vi.fn()
    
    render(
      <Calendar 
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        showOutsideDays={false}
        className="custom-calendar-class"
        classNames={{
          day_selected: "custom-selected-day",
          nav_button: "custom-nav-button"
        }}
        fromYear={2020}
        toYear={2030}
        fixedWeeks
        data-testid="custom-calendar"
      />
    )
    
    const calendar = screen.getByTestId('custom-calendar')
    expect(calendar).toBeInTheDocument()
    expect(calendar).toHaveClass('custom-calendar-class', 'p-3')
    
    // Check for navigation buttons with custom classes
    const prevButton = screen.getByRole('button', { name: /previous month/i })
    const nextButton = screen.getByRole('button', { name: /next month/i })
    expect(prevButton).toHaveClass('custom-nav-button')
    expect(nextButton).toHaveClass('custom-nav-button')
    
    // Check that calendar has proper structure
    const table = screen.getByRole('grid')
    expect(table).toBeInTheDocument()
  })
}) 