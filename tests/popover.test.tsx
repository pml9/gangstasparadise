import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

describe('Popover', () => {
  it('renders the component', () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover content</div>
        </PopoverContent>
      </Popover>
    )
    
    const trigger = screen.getByRole('button', { name: 'Open popover' })
    expect(trigger).toBeInTheDocument()
    
    // Content should not be visible initially
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('error state', () => {
    // Test popover with empty/minimal content
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button disabled>Disabled trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          <div></div>
        </PopoverContent>
      </Popover>
    )
    
    const trigger = screen.getByRole('button', { name: 'Disabled trigger' })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toBeDisabled()
  })

  it('edge case', () => {
    // Test with custom classes, alignment, and complex content
    render(
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <button className="custom-trigger-class">
            Complex trigger with long text and special chars !@#$%
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="custom-content-class" 
          align="start" 
          sideOffset={10}
        >
          <div>
            <h3>Complex popover content</h3>
            <p>This popover contains multiple elements with special characters &amp; symbols.</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
            <button>Action button</button>
          </div>
        </PopoverContent>
      </Popover>
    )
    
    const trigger = screen.getByRole('button', { name: /Complex trigger/ })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass('custom-trigger-class')
    
    // Since defaultOpen is true, content should be visible
    expect(screen.getByText('Complex popover content')).toBeInTheDocument()
    expect(screen.getByText(/This popover contains multiple elements/)).toBeInTheDocument()
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action button' })).toBeInTheDocument()
  })
}) 