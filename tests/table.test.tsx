import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter,
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption 
} from '@/components/ui/table'

describe('Table', () => {
  it('renders the component', () => {
    render(
      <Table>
        <TableCaption>Test table caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>25</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table).toHaveClass('w-full', 'caption-bottom', 'text-sm')
    expect(screen.getByText('Test table caption')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with empty table structure
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table).toHaveClass('w-full', 'caption-bottom', 'text-sm')
  })

  it('edge case', () => {
    // Test with complex table structure, custom classes, and footer
    render(
      <Table className="custom-table-class">
        <TableCaption className="custom-caption">
          Complex table with special characters !@#$% and numbers 123
        </TableCaption>
        <TableHeader className="custom-header">
          <TableRow>
            <TableHead className="custom-head">Very Long Header That May Overflow</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="custom-body">
          <TableRow data-state="selected">
            <TableCell className="custom-cell">
              Data with special characters &amp; symbols
            </TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
              <button>Edit</button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Regular data</TableCell>
            <TableCell>Inactive</TableCell>
            <TableCell>
              <button>Delete</button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="custom-footer">
          <TableRow>
            <TableCell colSpan={3}>Total: 2 items</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table).toHaveClass('custom-table-class', 'w-full')
    expect(screen.getByText(/Complex table with special characters/)).toHaveClass('custom-caption')
    expect(screen.getByText('Very Long Header That May Overflow')).toHaveClass('custom-head')
    expect(screen.getByText('Data with special characters & symbols')).toHaveClass('custom-cell')
    expect(screen.getByText('Total: 2 items')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
}) 