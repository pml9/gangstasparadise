import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders the component', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md')
  })

  it('error state', () => {
    // Test disabled state and invalid type
    render(
      <Input 
        disabled 
        type="email" 
        placeholder="Disabled input"
        value="invalid-email"
      />
    )
    
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:opacity-50')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveValue('invalid-email')
  })

  it('edge case', () => {
    // Test with change handler, ref, and special characters
    const handleChange = vi.fn()
    
    render(
      <Input 
        type="password"
        className="custom-input-class"
        onChange={handleChange}
        maxLength={50}
        placeholder="Password with special chars !@#$%"
      />
    )
    
    const input = screen.getByPlaceholderText('Password with special chars !@#$%')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('custom-input-class')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('maxLength', '50')
    
    fireEvent.change(input, { target: { value: 'Test123!@#' } })
    expect(handleChange).toHaveBeenCalled()
  })
}) 