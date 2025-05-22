import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileSkillCard from '../../src/components/profile-skill-card';
import '@testing-library/jest-dom';
import type { SkillCategory } from '../../src/types/skill';
import { SessionFormat, AgeGroup } from '../../src/types/common'; // Import enums

describe('ProfileSkillCard', () => {
  const mockTeacher = {
    id: 'teacher-1',
    name: 'John Doe',
    email: 'john@example.com',
    image: '/john.jpg',
    bio: 'Professional baker with 10+ years of experience',
    ageGroup: AgeGroup.ESTABLISHED_ADULTS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockCategory: SkillCategory = {
    id: 'cat1',
    name: 'Cooking',
    description: 'Culinary skills and recipes',
    icon: '🍳'
  };

  const mockSkill = {
    id: 'skill-1',
    name: 'Sourdough Baking',
    description: 'Learn to make delicious sourdough bread from scratch.',
    category: mockCategory,
    sessionFormat: SessionFormat.IN_PERSON,
    image: '/bread.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    teacher: mockTeacher,
    averageRating: 4.7,
    totalSessions: 15,
    reviews: [
      {
        id: 'review-1',
        userName: 'Test User',
        userImage: '/user.jpg',
        rating: 5,
        comment: 'Great class!',
        date: '2 days ago',
        userId: 'user-1',
        skillId: 'skill-1',
      },
    ],
  };

  it('renders the skill card with correct information', () => {
    render(<ProfileSkillCard skill={mockSkill} isTeaching={true} />);
    
    // Check if skill title is rendered
    expect(screen.getByText('Sourdough Baking')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('Learn to make delicious sourdough bread from scratch.')).toBeInTheDocument();
    
    // Check if rating is displayed
    const ratingText = screen.getByText('4.7');
    expect(ratingText).toBeInTheDocument();
    
    // Check if review count is displayed
    const reviewCount = screen.getByText('(15 reviews)');
    expect(reviewCount).toBeInTheDocument();
    
    // Check if category is displayed
    expect(screen.getByText('Cooking')).toBeInTheDocument();
  });

  it('renders the correct action buttons for teaching mode', () => {
    render(
      <ProfileSkillCard
        skill={mockSkill}
        isTeaching={true}
      />
    )
    expect(screen.getByText('Manage Sessions')).toBeInTheDocument()
    expect(screen.getByText('View Requests')).toBeInTheDocument()
  });

  it('renders the skill title', () => {
    render(
      <ProfileSkillCard
        skill={mockSkill}
        isTeaching={true}
      />
    )
    expect(screen.getByText('Sourdough Baking')).toBeInTheDocument()
  });

  it('renders the skill description', () => {
    render(
      <ProfileSkillCard
        skill={mockSkill}
        isTeaching={true}
      />
    )
    expect(
      screen.getByText('Learn to make delicious sourdough bread from scratch.')
    ).toBeInTheDocument()
  });

  it('displays the provided image when available', () => {
    render(
      <ProfileSkillCard 
        skill={mockSkill} 
        isTeaching={false}
      />
    );
    
    const image = screen.getByAltText('Sourdough Baking');
    expect(image).toHaveAttribute('src', '/bread.jpg');
  });
});
