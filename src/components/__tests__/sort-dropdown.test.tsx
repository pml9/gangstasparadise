import { render, screen } from '@testing-library/react';
import SortDropdown from '../sort-dropdown';

describe('SortDropdown', () => {
  it('renders the component', () => {
    render(<SortDropdown />);
    
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
