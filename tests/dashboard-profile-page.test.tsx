import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfilePage from '@/app/dashboard/profile/page'

describe('ProfilePage', () => {
  it('renders the page title', () => {
    render(<ProfilePage />)
    
    expect(screen.getByRole('heading', { name: /user profile/i })).toBeInTheDocument()
  })

  it('renders the back to dashboard button', () => {
    render(<ProfilePage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/dashboard')
  })

  it('renders the page content', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText(/this is the user profile page/i)).toBeInTheDocument()
    expect(screen.getByText(/where you can view and update your personal information/i)).toBeInTheDocument()
    expect(screen.getByText(/feature implementation coming soon/i)).toBeInTheDocument()
  })

  it('has correct container structure', () => {
    const { container } = render(<ProfilePage />)
    
    const rootContainer = container.querySelector('.container.mx-auto.px-4.py-8')
    expect(rootContainer).toBeInTheDocument()
  })

  it('renders content in a card-like structure', () => {
    render(<ProfilePage />)
    
    const contentContainer = screen.getByText(/this is the user profile page/i).closest('div')
    expect(contentContainer).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow')
  })

  it('button has correct styling', () => {
    render(<ProfilePage />)
    
    const backButton = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backButton).toHaveClass('inline-flex')
  })
}) 