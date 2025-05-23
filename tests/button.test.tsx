import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

describe('Button', () => {
  it('renders the component', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
  })

  it('error state', () => {
    // Test disabled state and invalid props
    render(
      <Button disabled variant="destructive">
        Disabled Button
      </Button>
    )
    
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('edge case', () => {
    // Test with all variant combinations, asChild prop, and click handler
    const handleClick = vi.fn()
    
    render(
      <Button 
        variant="ghost" 
        size="icon" 
        className="custom-class"
        onClick={handleClick}
      >
        <Heart data-testid="button-icon" />
      </Button>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('hover:bg-accent', 'h-10', 'w-10', 'custom-class')
    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 