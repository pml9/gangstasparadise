import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'

describe('Dashboard Main Page', () => {
  it('renders the dashboard with title and welcome message', () => {
    render(<Dashboard />)
    
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/welcome back, john!/i)).toBeInTheDocument()
    expect(screen.getByText(/here's everything you need to manage your workplace needs/i)).toBeInTheDocument()
  })

  it('renders all dashboard cards with correct titles', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Sick Leave')).toBeInTheDocument()
    expect(screen.getByText('Education & Social')).toBeInTheDocument()
    expect(screen.getByText('Corporate Travel')).toBeInTheDocument()
    expect(screen.getByText('Maintenance Issues')).toBeInTheDocument()
    expect(screen.getByText('Asset Booking')).toBeInTheDocument()
    expect(screen.getByText('Expense Report')).toBeInTheDocument()
  })

  it('renders all dashboard cards with correct descriptions', () => {
    render(<Dashboard />)
    
    expect(screen.getByText(/feeling under the weather/i)).toBeInTheDocument()
    expect(screen.getByText(/want to learn something new/i)).toBeInTheDocument()
    expect(screen.getByText(/got a meeting in another city/i)).toBeInTheDocument()
    expect(screen.getByText(/got a flickering light or a broken pipe/i)).toBeInTheDocument()
    expect(screen.getByText(/need a company car, projector/i)).toBeInTheDocument()
    expect(screen.getByText(/bought something for work/i)).toBeInTheDocument()
  })

  it('renders all navigation links with correct URLs', () => {
    render(<Dashboard />)
    
    expect(screen.getByRole('link', { name: /request leave/i })).toHaveAttribute('href', '/dashboard/leave')
    expect(screen.getByRole('link', { name: /browse events/i })).toHaveAttribute('href', '/dashboard/events')
    expect(screen.getByRole('link', { name: /plan trip/i })).toHaveAttribute('href', '/dashboard/travel')
    expect(screen.getByRole('link', { name: /report issue/i })).toHaveAttribute('href', '/dashboard/maintenance')
    expect(screen.getByRole('link', { name: /book asset/i })).toHaveAttribute('href', '/dashboard/assets')
    expect(screen.getByRole('link', { name: /submit expense/i })).toHaveAttribute('href', '/dashboard/expenses')
  })

  it('renders cards with correct color-coded borders', () => {
    render(<Dashboard />)
    
    // Use class selector to find card elements
    const { container } = render(<Dashboard />)
    const cards = container.querySelectorAll('.border-l-4')
    expect(cards).toHaveLength(6)
    
    // Check for border classes
    expect(cards[0]).toHaveClass('border-l-blue-600')
    expect(cards[1]).toHaveClass('border-l-green-600')
    expect(cards[2]).toHaveClass('border-l-orange-600')
    expect(cards[3]).toHaveClass('border-l-red-600')
    expect(cards[4]).toHaveClass('border-l-blue-600')
    expect(cards[5]).toHaveClass('border-l-orange-600')
  })

  it('renders all category badges', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Essential')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
    expect(screen.getByText('Business')).toBeInTheDocument()
    expect(screen.getByText('Facility')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
  })

  it('renders SVG icons for each card', () => {
    const { container } = render(<Dashboard />)
    
    // Check that SVG elements are present (one for each card)
    const svgElements = container.querySelectorAll('svg')
    expect(svgElements.length).toBeGreaterThanOrEqual(6)
  })
}) 