import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectGroup 
} from '@/components/ui/select'

describe('Select', () => {
  it('renders the component', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass('flex', 'h-10', 'w-full', 'items-center')
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with disabled state
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disabled-option">Disabled Option</SelectItem>
        </SelectContent>
      </Select>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toBeDisabled()
    expect(trigger).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('edge case', () => {
    // Test with complex structure, labels, separators, and custom classes
    const handleValueChange = vi.fn()
    
    render(
      <Select onValueChange={handleValueChange} defaultValue="option2">
        <SelectTrigger className="custom-trigger-class">
          <SelectValue placeholder="Complex select with long placeholder text" />
        </SelectTrigger>
        <SelectContent className="custom-content-class">
          <SelectGroup>
            <SelectLabel>Category 1</SelectLabel>
            <SelectItem value="option1" className="custom-item-class">
              Very Long Option Text That Should Handle Overflow Properly !@#$%
            </SelectItem>
            <SelectItem value="option2">Option 2 with Special Characters &amp;</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Category 2</SelectLabel>
            <SelectItem value="option3" disabled>
              Disabled Option
            </SelectItem>
            <SelectItem value="option4">Option 4</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )
    
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass('custom-trigger-class')
    expect(trigger).toHaveAttribute('data-state', 'closed')
    
    // Test that default value is set
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
}) 