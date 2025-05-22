import { render, screen } from '@testing-library/react';
import StarRating from '../star-rating';

describe('StarRating', () => {
  it('renders the component', () => {
    render(
      <StarRating 
        rating={4.5}
        showValue={true}
      />
    );
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
