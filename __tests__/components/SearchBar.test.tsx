import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from '../../src/components/search-bar';

// Mock next/navigation
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => '/',
}));

describe('SearchBar', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the search input with a placeholder', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox', { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('placeholder', 'Search for skills, teachers, or keywords');
  });

  it('updates the search query when typing', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'baking' } });
    
    expect(input).toHaveValue('baking');
  });

  it('submits the search query and navigates to the search results page', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox', { name: /search/i });
    const form = screen.getByRole('search');
    
    fireEvent.change(input, { target: { value: 'baking' } });
    fireEvent.submit(form);
    
    expect(mockPush).toHaveBeenCalledWith('/browse?q=baking');
  });

  it('shows a clear button when there is text in the search input', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox', { name: /search/i });
    fireEvent.change(input, { target: { value: 'baking' } });
    
    // The clear button is an X icon with aria-label="Clear search"
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
    
    // Click the clear button
    fireEvent.click(clearButton);
    
    // Input should be cleared
    expect(input).toHaveValue('');
    // Clear button should be removed
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });

  it('updates aria-expanded when input has text and is focused', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('searchbox', { name: /search/i });
    
    // Initially, aria-expanded should be false
    expect(input).toHaveAttribute('aria-expanded', 'false');
    
    // Focus the input and add text
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'bak' } });
    
    // aria-expanded should be true when input has text and is focused
    expect(input).toHaveAttribute('aria-expanded', 'true');
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // aria-expanded should be false when input is empty
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
});
