import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardCard } from '@/components/dashboard-card'
import { Heart } from 'lucide-react'

describe('DashboardCard', () => {
  const defaultProps = {
    title: 'Test Card',
    description: 'Test description for the card',
    icon: <Heart data-testid="card-icon" />,
    category: 'Test Category',
    accentColor: 'blue',
    buttonText: 'Test Button',
    href: '/test-link'
  }

  it('renders the component', () => {
    render(<DashboardCard {...defaultProps} />)
    
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Test description for the card')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByTestId('card-icon')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-link')
  })

  it('error state', () => {
    // Test component with invalid/missing required props
    const invalidProps = {
      ...defaultProps,
      title: '',
      description: '',
      href: ''
    }
    
    render(<DashboardCard {...invalidProps} />)
    
    // Should still render but with empty content
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
    expect(screen.getByTestId('card-icon')).toBeInTheDocument()
    
    // Link should still be present but with empty href - search by element tag
    const linkElement = document.querySelector('a')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '')
  })

  it('edge case', () => {
    // Test with extremely long text and special characters
    const edgeCaseProps = {
      ...defaultProps,
      title: 'Very Long Title That Should Not Break The Layout And Contains Special Characters !@#$%^&*()',
      description: 'This is an extremely long description that tests how the component handles overflow and wrapping of text content. It should maintain proper spacing and layout even with extensive content.',
      category: 'Category With Spaces & Special Characters',
      accentColor: 'purple',
      buttonText: 'Button With Very Long Text That May Overflow',
      href: '/very/long/path/with/multiple/segments/and/query?param=value&another=test#fragment'
    }
    
    render(<DashboardCard {...edgeCaseProps} />)
    
    expect(screen.getByText(edgeCaseProps.title)).toBeInTheDocument()
    expect(screen.getByText(edgeCaseProps.description)).toBeInTheDocument()
    expect(screen.getByText(edgeCaseProps.category)).toBeInTheDocument()
    expect(screen.getByText(edgeCaseProps.buttonText)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', edgeCaseProps.href)
  })
}) 