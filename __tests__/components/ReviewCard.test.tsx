import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReviewCard from '../../src/components/review-card';

// Mock the Avatar component
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, className, 'data-testid': testId, role, 'aria-label': ariaLabel }: any) => (
    <div 
      className={className} 
      data-testid={testId}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  ),
  AvatarImage: ({ src, alt, 'data-testid': testId, 'aria-hidden': ariaHidden }: any) => (
    <img 
      src={src} 
      alt={alt} 
      data-testid={testId}
      aria-hidden={ariaHidden}
    />
  ),
  AvatarFallback: ({ children, className, 'data-testid': testId }: any) => (
    <div className={className} data-testid={testId}>
      {children}
    </div>
  ),
}));

// Mock the StarRating component
vi.mock('@/components/star-rating', () => ({
  default: ({ rating, size, 'data-testid': testId }: any) => (
    <div data-testid={testId}>
      {`${rating} stars`}
    </div>
  ),
}));

describe('ReviewCard', () => {
  const mockReview = {
    id: '1',
    userName: 'John Doe',
    userImage: '/john-doe.jpg',
    rating: 4,
    comment: 'Great experience learning knitting! The teacher was very patient and knowledgeable.',
    date: '2023-05-15T10:30:00.000Z',
  };

  it('renders the review card with all information', () => {
    render(
      <ReviewCard 
        review={mockReview} 
        testId="review-card"
        ally={{
          'aria-label': 'Review by John Doe',
          'aria-live': 'polite'
        }}
      />
    );

    // Check if the review content is rendered
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Great experience learning knitting/)).toBeInTheDocument();
    
    // Check if the avatar is rendered with the correct image
    const avatarImage = screen.getByAltText('');
    expect(avatarImage).toHaveAttribute('src', '/john-doe.jpg');
    
    // Check if the star rating is rendered
    expect(screen.getByText('4 stars')).toBeInTheDocument();
    
    // Check ARIA attributes
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'review-card-1-title');
    expect(article).toHaveAttribute('aria-describedby', 'review-card-1-date review-card-1-rating review-card-1-comment');
  });

  it('renders loading state when isLoading is true', () => {
    render(
      <ReviewCard 
        review={mockReview} 
        isLoading={true}
        testId="review-card"
      />
    );

    // Check if loading elements are present
    expect(screen.getByTestId('review-card-loading')).toBeInTheDocument();
    expect(screen.getByTestId('review-card-loading-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('review-card-loading-name')).toBeInTheDocument();
    expect(screen.getByTestId('review-card-loading-rating')).toBeInTheDocument();
    expect(screen.getByTestId('review-card-loading-comment-1')).toBeInTheDocument();
    expect(screen.getByTestId('review-card-loading-comment-2')).toBeInTheDocument();
    
    // Check ARIA attributes for loading state
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading review...');
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });
});
