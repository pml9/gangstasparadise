import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('renders the component', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('error state', () => {
    // Test with peer-disabled state classes
    render(
      <Label 
        htmlFor="disabled-input" 
        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Disabled Input Label
      </Label>
    )
    
    const label = screen.getByText('Disabled Input Label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70')
  })

  it('edge case', () => {
    // Test with custom classes and special characters
    render(
      <Label 
        htmlFor="special-input"
        className="custom-label-class text-lg"
      >
        Label with Special Characters !@#$% & Numbers 123
      </Label>
    )
    
    const label = screen.getByText('Label with Special Characters !@#$% & Numbers 123')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('custom-label-class', 'text-lg')
    expect(label).toHaveAttribute('for', 'special-input')
  })
}) 