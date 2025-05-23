import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders the component', () => {
    render(<Badge>Test Badge</Badge>)
    
    const badge = screen.getByText('Test Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full')
  })

  it('error state', () => {
    // Test with destructive variant (error state styling)
    render(<Badge variant="destructive">Error Badge</Badge>)
    
    const badge = screen.getByText('Error Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
  })

  it('edge case', () => {
    // Test with outline variant, custom class, and long text
    render(
      <Badge 
        variant="outline" 
        className="custom-badge-class"
      >
        Very Long Badge Text That Should Handle Overflow Properly
      </Badge>
    )
    
    const badge = screen.getByText('Very Long Badge Text That Should Handle Overflow Properly')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('border', 'text-foreground', 'custom-badge-class')
  })
}) 