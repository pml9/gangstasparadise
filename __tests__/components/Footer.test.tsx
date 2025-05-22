import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../src/components/footer';

describe('Footer', () => {
  it('renders the footer with all sections', () => {
    render(<Footer />);
    
    // Check if the footer is rendered with the correct role and test ID
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check if the logo and description are rendered
    expect(screen.getByText('SkillBridge')).toBeInTheDocument();
    expect(screen.getByText(/Connecting generations through shared knowledge and skills/i)).toBeInTheDocument();
    
    // Check if social media links are rendered
    const socialLinks = screen.getAllByRole('link', { name: /facebook|twitter|instagram|linkedin/i });
    expect(socialLinks.length).toBeGreaterThanOrEqual(4);
    
    // Check if quick links section is rendered
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    
    // Check if support section is rendered
    expect(screen.getByText('Support')).toBeInTheDocument();
    
    // Check if stay updated section is rendered
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    
    // Check if copyright is rendered
    expect(screen.getByText(/© \d{4} SkillBridge/i)).toBeInTheDocument();
  });

  it('applies custom test ID and accessibility attributes', () => {
    render(
      <Footer 
        testId="custom-footer" 
        ally={{
          role: 'contentinfo',
          'aria-label': 'Custom footer label'
        }} 
      />
    );
    
    const footer = screen.getByRole('contentinfo', { name: 'Custom footer label' });
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute('data-testid', 'custom-footer');
  });
});
