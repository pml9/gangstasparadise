import { render, screen } from '@testing-library/react';
import CategoryTabs from '../category-tabs';

describe('CategoryTabs', () => {
  const mockCategories = [
    'All Categories',
    'Arts & Crafts',
    'Cooking',
  ] as const;

  it('renders the component', () => {
    render(
      <CategoryTabs
        value={mockCategories[0]}
        onCategorySelect={vi.fn()}
      />
    );
    
    expect(screen.getByRole('tab', { name: /all categories/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /arts & crafts/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /cooking/i })).toBeInTheDocument();
  });
});
