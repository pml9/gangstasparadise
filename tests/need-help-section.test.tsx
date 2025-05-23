import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NeedHelpSection } from '@/components/need-help-section'
import type { HelpContact } from '@/components/need-help-section'
import { Zap, AlertTriangle } from 'lucide-react'

describe('NeedHelpSection', () => {
  it('renders the component', () => {
    render(<NeedHelpSection />)
    
    expect(screen.getByText('Need Help?')).toBeInTheDocument()
    expect(screen.getByText('Support Team')).toBeInTheDocument()
    expect(screen.getByText('support@opendesk.com')).toBeInTheDocument()
    expect(screen.getByText('Help Desk')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
  })

  it('error state', () => {
    // Test with empty custom contacts array
    const emptyContacts: HelpContact[] = []
    
    render(<NeedHelpSection customContacts={emptyContacts} />)
    
    // Should still render the title
    expect(screen.getByText('Need Help?')).toBeInTheDocument()
    
    // But no contact items should be present
    expect(screen.queryByText('Support Team')).not.toBeInTheDocument()
    expect(screen.queryByText('Help Desk')).not.toBeInTheDocument()
  })

  it('edge case', () => {
    // Test with custom contacts including special characters, long text, and links
    const customContacts: HelpContact[] = [
      {
        icon: <Zap data-testid="zap-icon" className="h-5 w-5 text-yellow-600" />,
        title: 'Emergency Contact with Very Long Title That Should Not Break Layout',
        value: 'emergency@company.com',
        link: 'mailto:emergency@company.com?subject=Emergency%20Request&body=Please%20describe%20your%20emergency'
      },
      {
        icon: <AlertTriangle data-testid="alert-icon" className="h-5 w-5 text-red-600" />,
        title: 'Special Characters & Numbers 123!@#$%',
        value: 'Multi-line contact information\nwith special formatting\nand symbols !@#$%^&*()',
      }
    ]
    
    render(<NeedHelpSection customContacts={customContacts} />)
    
    expect(screen.getByText('Need Help?')).toBeInTheDocument()
    expect(screen.getByTestId('zap-icon')).toBeInTheDocument()
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
    
    expect(screen.getByText('Emergency Contact with Very Long Title That Should Not Break Layout')).toBeInTheDocument()
    expect(screen.getByText('Special Characters & Numbers 123!@#$%')).toBeInTheDocument()
    
    // Test the link
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', 'mailto:emergency@company.com?subject=Emergency%20Request&body=Please%20describe%20your%20emergency')
    expect(linkElement).toHaveClass('text-blue-600', 'hover:underline')
    
    // Test non-link text
    expect(screen.getByText(/Multi-line contact information/)).toBeInTheDocument()
  })
}) 