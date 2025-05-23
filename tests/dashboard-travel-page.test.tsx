import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TravelPage from '@/app/dashboard/travel/page'

describe('TravelPage', () => {
  it('renders the page title', () => {
    render(<TravelPage />)
    
    expect(screen.getByRole('heading', { name: /corporate travel/i })).toBeInTheDocument()
  })

  it('renders the back to dashboard button', () => {
    render(<TravelPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/dashboard')
  })

  it('renders the page content', () => {
    render(<TravelPage />)
    
    expect(screen.getByText(/this is the corporate travel page/i)).toBeInTheDocument()
    expect(screen.getByText(/where you can plan and book business trips/i)).toBeInTheDocument()
    expect(screen.getByText(/feature implementation coming soon/i)).toBeInTheDocument()
  })

  it('has correct container structure', () => {
    const { container } = render(<TravelPage />)
    
    const rootContainer = container.querySelector('.container.mx-auto.px-4.py-8')
    expect(rootContainer).toBeInTheDocument()
  })

  it('renders content in a card-like structure', () => {
    render(<TravelPage />)
    
    const contentContainer = screen.getByText(/this is the corporate travel page/i).closest('div')
    expect(contentContainer).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow')
  })

  it('button has correct styling', () => {
    render(<TravelPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toHaveClass('inline-flex')
  })
}) 