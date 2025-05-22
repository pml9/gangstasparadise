import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Import the actual component
import SearchBar from '../search-bar';

// Mock the next/navigation module
const mockPush = vi.fn();
const mockGet = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
    toString: () => '',
  }),
  usePathname: () => '/browse',
}));

describe('SearchBar', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders the search input with a placeholder', () => {
    // Mock no search query in URL
    mockGet.mockReturnValue('');
    
    render(<SearchBar testId="test-search-bar" />);
    
    // Check if the search input is rendered with the correct placeholder
    const searchInput = screen.getByPlaceholderText('Search for skills, teachers, or keywords');
    expect(searchInput).toBeInTheDocument();
    
    // Check if the search form is rendered
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('initializes with search query from URL', () => {
    // Mock search query in URL
    mockGet.mockImplementation((key: string) => {
      if (key === 'q') return 'initial search';
      return null;
    });
    
    render(<SearchBar testId="test-search-bar" />);
    
    // Input should be pre-filled with the value from URL
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveValue('initial search');
  });
});
