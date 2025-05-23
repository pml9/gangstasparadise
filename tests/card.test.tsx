import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card'

describe('Card', () => {
  it('renders the component', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )
    
    const card = screen.getByTestId('test-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card')
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with empty content and minimal structure
    render(
      <Card data-testid="empty-card">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    )
    
    const card = screen.getByTestId('empty-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card')
  })

  it('edge case', () => {
    // Test with custom classes and complex nested content
    render(
      <Card className="custom-card-class" data-testid="complex-card">
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">
            Very Long Title That Should Handle Overflow And Wrapping Properly With Special Characters !@#$%
          </CardTitle>
          <CardDescription className="custom-description">
            This is a very long description that tests how the card handles extensive content and maintains proper layout and spacing.
          </CardDescription>
        </CardHeader>
        <CardContent className="custom-content">
          <div>Nested complex content with multiple elements</div>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </CardContent>
        <CardFooter className="custom-footer">
          <button>Action Button</button>
          <span>Additional footer content</span>
        </CardFooter>
      </Card>
    )
    
    const card = screen.getByTestId('complex-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('custom-card-class', 'rounded-lg', 'border')
    expect(screen.getByText(/Very Long Title/)).toHaveClass('custom-title', 'text-2xl', 'font-semibold')
    expect(screen.getByText(/This is a very long description/)).toHaveClass('custom-description', 'text-sm')
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument()
  })
}) 