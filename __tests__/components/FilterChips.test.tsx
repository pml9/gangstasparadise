import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FilterChips from '../../src/components/filter-chips';

describe('FilterChips', () => {
  const mockFilters = [
    { id: '1', label: 'Cooking', category: 'Skill' },
    { id: '2', label: 'Beginner', category: 'Level' },
  ];

  const mockOnRemove = vi.fn();
  const mockOnClearAll = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders filter chips and handles interactions', () => {
    render(
      <FilterChips
        filters={mockFilters}
        onRemove={mockOnRemove}
        onClearAll={mockOnClearAll}
        resultCount={15}
      />
    );

    // Check if all filter chips are rendered
    expect(screen.getByText('Skill:')).toBeInTheDocument();
    expect(screen.getByText('Cooking')).toBeInTheDocument();
    expect(screen.getByText('Level:')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();

    // Check result count (text is split across multiple elements)
    const resultCount = screen.getByTestId('result-count');
    expect(resultCount).toHaveTextContent('Showing 15 results');

    // Test remove button
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemove).toHaveBeenCalledWith('1');

    // Test clear all button
    const clearAllButton = screen.getByText('Clear all');
    fireEvent.click(clearAllButton);
    expect(mockOnClearAll).toHaveBeenCalledTimes(1);
  });

  it('does not render when no filters are provided', () => {
    const { container } = render(
      <FilterChips
        filters={[]}
        onRemove={mockOnRemove}
        onClearAll={mockOnClearAll}
        resultCount={0}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
