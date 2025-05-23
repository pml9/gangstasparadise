import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventsPage from '@/app/dashboard/events/page'

describe('EventsPage', () => {
  it('renders the page title', () => {
    render(<EventsPage />)
    
    expect(screen.getByRole('heading', { name: /education & social events/i })).toBeInTheDocument()
  })

  it('renders the back to dashboard button', () => {
    render(<EventsPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/dashboard')
  })

  it('renders the page content', () => {
    render(<EventsPage />)
    
    expect(screen.getByText(/this is the education & social events page/i)).toBeInTheDocument()
    expect(screen.getByText(/where you can browse and register for upcoming events/i)).toBeInTheDocument()
    expect(screen.getByText(/feature implementation coming soon/i)).toBeInTheDocument()
  })

  it('has correct container structure', () => {
    const { container } = render(<EventsPage />)
    
    const rootContainer = container.querySelector('.container.mx-auto.px-4.py-8')
    expect(rootContainer).toBeInTheDocument()
  })

  it('renders content in a card-like structure', () => {
    render(<EventsPage />)
    
    const contentContainer = screen.getByText(/this is the education & social events page/i).closest('div')
    expect(contentContainer).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow')
  })

  it('button has correct styling', () => {
    render(<EventsPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toHaveClass('inline-flex')
  })
}) 