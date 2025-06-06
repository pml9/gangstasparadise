import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AssetsPage from '@/app/dashboard/assets/page'

describe('AssetsPage', () => {
  it('renders the page title', () => {
    render(<AssetsPage />)
    
    expect(screen.getByRole('heading', { name: /asset booking/i })).toBeInTheDocument()
  })

  it('renders the back to dashboard button', () => {
    render(<AssetsPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/dashboard')
  })

  it('renders the page content', () => {
    render(<AssetsPage />)
    
    expect(screen.getByText(/this is the asset booking page/i)).toBeInTheDocument()
    expect(screen.getByText(/where you can reserve company resources/i)).toBeInTheDocument()
    expect(screen.getByText(/feature implementation coming soon/i)).toBeInTheDocument()
  })

  it('has correct container structure', () => {
    const { container } = render(<AssetsPage />)
    
    const rootContainer = container.querySelector('.container.mx-auto.px-4.py-8')
    expect(rootContainer).toBeInTheDocument()
  })

  it('renders content in a card-like structure', () => {
    render(<AssetsPage />)
    
    const contentContainer = screen.getByText(/this is the asset booking page/i).closest('div')
    expect(contentContainer).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow')
  })

  it('button has correct styling', () => {
    render(<AssetsPage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toHaveClass('inline-flex')
  })
}) 