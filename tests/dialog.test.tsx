import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog'

describe('Dialog', () => {
  it('renders the component', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>This is a test dialog description</DialogDescription>
          </DialogHeader>
          <div>Dialog content</div>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByRole('button', { name: 'Open dialog' })
    expect(trigger).toBeInTheDocument()
    
    // Content should not be visible initially
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument()
  })

  it('error state', () => {
    // Test dialog with minimal/empty content
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button disabled>Disabled trigger</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    
    const trigger = screen.getByRole('button', { name: 'Disabled trigger' })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toBeDisabled()
  })

  it('edge case', () => {
    // Test with complex content, custom classes, and all components
    render(
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <button className="custom-trigger">
            Complex trigger with special chars !@#$%
          </button>
        </DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">
              Very Long Dialog Title That Should Handle Overflow Properly
            </DialogTitle>
            <DialogDescription className="custom-description">
              This is a complex dialog description with special characters &amp; symbols.
              It tests how the dialog handles extensive content and maintains proper layout.
            </DialogDescription>
          </DialogHeader>
          <div className="dialog-body">
            <p>Complex dialog content with multiple elements</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
          <DialogFooter className="custom-footer">
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    
    // Since defaultOpen is true, content should be visible
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('custom-content')
    
    expect(screen.getByText(/Very Long Dialog Title/)).toBeInTheDocument()
    expect(screen.getByText(/This is a complex dialog description/)).toBeInTheDocument()
    expect(screen.getByText('Complex dialog content with multiple elements')).toBeInTheDocument()
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })
}) 