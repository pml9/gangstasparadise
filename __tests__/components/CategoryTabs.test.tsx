import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CategoryTabs from '../../src/components/category-tabs';

// Mock the scrollTo method
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('CategoryTabs', () => {
  const mockOnCategorySelect = vi.fn();
  
  const defaultProps = {
    value: 'All Categories' as const,
    onCategorySelect: mockOnCategorySelect,
    testId: 'category-tabs',
    'aria-label': 'Skill categories',
  };

  it('renders all categories and allows selection', () => {
    render(<CategoryTabs {...defaultProps} />);
    
    // Check if all categories are rendered
    const categories = [
      'All Categories',
      'Arts & Crafts',
      'Cooking',
      'Technology',
      'Music',
      'Languages',
      'DIY & Home',
      'Gardening',
    ];
    
    // Check if the tabs container is rendered
    const tabsList = screen.getByRole('tablist');
    expect(tabsList).toBeInTheDocument();
    
    // Check if each category is present in the document
    categories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
    
    // Test category selection by clicking on a tab
    const cookingButton = screen.getByText('Cooking').closest('button');
    if (cookingButton) {
      fireEvent.click(cookingButton);
      expect(mockOnCategorySelect).toHaveBeenCalledWith('Cooking');
    } else {
      throw new Error('Cooking button not found');
    }
  });
});
