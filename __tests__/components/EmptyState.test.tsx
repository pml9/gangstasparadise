import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EmptyState from '../../src/components/empty-state';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

describe('EmptyState', () => {
  const defaultProps = {
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  };

  it('renders with default props', () => {
    render(<EmptyState {...defaultProps} />);
    
    // Check if the default icon is rendered
    const icon = screen.getByTestId('empty-state').querySelector('.bg-secondary-gold-pale');
    expect(icon).toBeInTheDocument();
    
    // Check title and description
    expect(screen.getByRole('heading', { level: 3, name: defaultProps.title })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    
    // Check default reset button
    const resetButton = screen.getByTestId('empty-state-reset-button');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveTextContent('Reset all filters');
    
    // Check popular searches section
    expect(screen.getByText('Popular searches:')).toBeInTheDocument();
    
    // Check popular search terms
    const popularSearches = ['Cooking', 'Gardening', 'Technology', 'Music', 'Languages'];
    popularSearches.forEach(term => {
      expect(screen.getByText(term)).toBeInTheDocument();
    });
  });

  it('calls onReset when reset button is clicked', () => {
    const handleReset = vi.fn();
    render(<EmptyState {...defaultProps} onReset={handleReset} />);
    
    const resetButton = screen.getByTestId('empty-state-reset-button');
    fireEvent.click(resetButton);
    
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('renders with custom icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    render(<EmptyState {...defaultProps} icon={<CustomIcon />} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with default reset button when onReset is provided', () => {
    const handleReset = vi.fn();
    render(<EmptyState {...defaultProps} onReset={handleReset} />);
    
    const resetButton = screen.getByRole('button', { name: /reset all filters/i });
    expect(resetButton).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<EmptyState {...defaultProps} className={customClass} />);
    
    const emptyState = screen.getByTestId('empty-state');
    expect(emptyState).toHaveClass(customClass);
  });

  it('uses custom testId', () => {
    const customTestId = 'custom-test-id';
    render(<EmptyState {...defaultProps} testId={customTestId} />);
    
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-reset-button`)).toBeInTheDocument();
  });

  it('respects accessibility props', () => {
    const ariaProps = {
      role: 'alert',
      'aria-label': 'Custom empty state',
      'aria-live': 'assertive' as const
    };
    
    render(<EmptyState {...defaultProps} ally={ariaProps} />);
    
    const emptyState = screen.getByTestId('empty-state');
    expect(emptyState).toHaveAttribute('role', ariaProps.role);
    expect(emptyState).toHaveAttribute('aria-label', ariaProps['aria-label']);
    expect(emptyState).toHaveAttribute('aria-live', ariaProps['aria-live']);
  });

  it('renders with custom icon when provided', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    render(<EmptyState {...defaultProps} icon={<CustomIcon />} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    
    // Default search icon should not be rendered when custom icon is provided
    const defaultIcon = screen.queryByTestId('empty-state-default-icon');
    expect(defaultIcon).not.toBeInTheDocument();
  });
  
  it('renders with default search icon when no icon is provided', () => {
    render(<EmptyState {...defaultProps} />);
    
    const searchIcon = screen.getByTestId('empty-state-default-icon');
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon).toHaveClass('lucide-search');
  });
});
