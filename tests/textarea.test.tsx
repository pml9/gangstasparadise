import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  it('renders the component', () => {
    render(<Textarea placeholder="Enter your message" />)
    
    const textarea = screen.getByPlaceholderText('Enter your message')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('flex', 'min-h-[80px]', 'w-full')
  })

  it('error state', () => {
    // Test disabled state
    render(
      <Textarea 
        disabled 
        placeholder="Disabled textarea"
        value="Some disabled content"
      />
    )
    
    const textarea = screen.getByPlaceholderText('Disabled textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    expect(textarea).toHaveValue('Some disabled content')
  })

  it('edge case', () => {
    // Test with change handler, custom class, and large content
    const handleChange = vi.fn()
    const longText = 'This is a very long text that should wrap properly in the textarea component. '.repeat(10)
    
    render(
      <Textarea 
        className="custom-textarea-class"
        onChange={handleChange}
        rows={10}
        maxLength={1000}
        placeholder="Long content textarea"
        defaultValue={longText}
      />
    )
    
    const textarea = screen.getByPlaceholderText('Long content textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('custom-textarea-class')
    expect(textarea).toHaveAttribute('rows', '10')
    expect(textarea).toHaveAttribute('maxLength', '1000')
    expect(textarea).toHaveValue(longText)
    
    fireEvent.change(textarea, { target: { value: 'New content' } })
    expect(handleChange).toHaveBeenCalled()
  })
}) 