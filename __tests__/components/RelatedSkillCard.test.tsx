import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RelatedSkillCard from '../../src/components/related-skill-card';
import { AgeGroup, SessionFormat } from '@/types/common';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('RelatedSkillCard', () => {
  const mockSkill = {
    id: '1',
    name: 'Knitting',
    description: 'Learn the basics of knitting',
    category: {
      id: '1',
      name: 'Craft',
      description: 'Crafting skills',
      icon: 'needle',
    },
    sessionFormat: SessionFormat.VIRTUAL,
    location: {
      lat: 0,
      lng: 0,
      address: 'Online',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teacher: {
      id: 'user1',
      name: 'Jane Doe',
      ageGroup: AgeGroup.WISDOM_KEEPERS,
      image: '/jane-doe.jpg',
      averageRating: 4.5,
      totalSessions: 10,
    },
    image: '/knitting.jpg',
    averageRating: 4.5,
    reviews: [],
  };

  it('renders the card with correct information', () => {
    render(
      <RelatedSkillCard 
        skill={mockSkill} 
        testId="related-skill-card"
        ally={{
          'aria-label': 'Related skill card',
          linkLabel: 'View knitting skill'
        }}
      />
    );

    // Check if the card is rendered with the correct information
    expect(screen.getByText('Craft')).toBeInTheDocument();
    expect(screen.getByText('Knitting')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    
    // Check if the badge is rendered with the correct age group
    const badge = screen.getByText(AgeGroup.WISDOM_KEEPERS);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-wisdom');

    // Check if the link has the correct href
    const link = screen.getByRole('link', { name: /view knitting skill/i });
    expect(link).toHaveAttribute('href', '/skills/1');
    
    // Check if the image has the correct alt text
    const image = screen.getByAltText('Knitting');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/knitting.jpg');

    // Check if the teacher's name is rendered
    const teacherName = screen.getByText('Jane Doe');
    expect(teacherName).toBeInTheDocument();
    
    // Check for the avatar (either the image or the fallback)
    const avatarFallback = screen.getByText('J');
    expect(avatarFallback).toBeInTheDocument();
  });
});
