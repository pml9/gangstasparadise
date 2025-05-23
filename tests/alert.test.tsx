import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

describe('Alert', () => {
  it('renders the component', () => {
    render(
      <Alert>
        <AlertCircle data-testid="alert-icon" />
        <AlertTitle>Test Alert Title</AlertTitle>
        <AlertDescription>Test alert description content</AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('relative', 'w-full', 'rounded-lg', 'border')
    expect(screen.getByText('Test Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Test alert description content')).toBeInTheDocument()
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with destructive variant (error state)
    render(
      <Alert variant="destructive">
        <AlertCircle data-testid="error-icon" />
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>Something went wrong!</AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('border-destructive/50', 'text-destructive')
    expect(screen.getByText('Error Alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })

  it('edge case', () => {
    // Test with custom classes, no icon, and complex content
    render(
      <Alert className="custom-alert-class" variant="default">
        <AlertTitle className="custom-title-class">
          Very Long Alert Title With Special Characters !@#$% That Should Handle Overflow
        </AlertTitle>
        <AlertDescription className="custom-description-class">
          <p>Complex alert description with multiple paragraphs.</p>
          <p>Second paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
          <ul>
            <li>List item in alert</li>
            <li>Another list item</li>
          </ul>
        </AlertDescription>
      </Alert>
    )
    
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('custom-alert-class', 'bg-background', 'text-foreground')
    expect(screen.getByText(/Very Long Alert Title/)).toHaveClass('custom-title-class', 'mb-1', 'font-medium')
    expect(screen.getByText('Complex alert description with multiple paragraphs.')).toBeInTheDocument()
    expect(screen.getByText('bold text')).toBeInTheDocument()
    expect(screen.getByText('List item in alert')).toBeInTheDocument()
  })
}) 