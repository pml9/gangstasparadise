import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SkillCard from '../../src/components/skill-card';
import { Skill, SkillTeacher } from '@/types/skill';
import { AgeGroup, SessionFormat } from '@/types/common';

describe('SkillCard', () => {
  let mockSkill: Skill;
  let mockTeacher: SkillTeacher;

  beforeEach(() => {
    mockTeacher = {
      id: 'user1',
      name: 'John Doe',
      image: '/user-avatar.jpg',
      ageGroup: AgeGroup.YOUNG_LEARNERS,
      averageRating: 4.5,
      totalSessions: 10,
    };

    mockSkill = {
      id: '1',
      name: 'Test Skill',
      description: 'This is a test skill description',
      category: {
        id: '1',
        name: 'Cooking',
        description: 'Cooking related skills',
      },
      sessionFormat: SessionFormat.VIRTUAL,
      teacher: mockTeacher,
      image: '/test-image.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviews: [],
      averageRating: 4.5,
    };
  });

  it('renders the skill card with correct information', () => {
    render(<SkillCard skill={mockSkill} testId="test" />);
    
    // Get the card and check it's in the document
    const card = screen.getByTestId('test-1');
    expect(card).toBeInTheDocument();
    
    // Check the link has correct attributes
    const link = card.closest('a');
    expect(link).toHaveAttribute('href', '/skills/1');
    
    // Check the image
    const image = screen.getByRole('img', { hidden: true });
    expect(image).toBeInTheDocument();
    
    // Check the session format badge
    const formatBadge = screen.getByTestId('test-session-format');
    expect(formatBadge).toHaveTextContent('VIRTUAL');
    
    // Check the category
    const category = screen.getByTestId('test-category');
    expect(category).toHaveTextContent('Cooking');
    
    // Check the skill name
    const skillName = screen.getByTestId('test-name');
    expect(skillName).toHaveTextContent('Test Skill');
    
    // Check the description
    const description = screen.getByTestId('test-description');
    expect(description).toHaveTextContent('This is a test skill description');
    
    // Check the rating container
    const ratingContainer = screen.getByTestId('test-rating');
    expect(ratingContainer).toHaveAttribute('aria-label', expect.stringContaining('Rating:'));
    
    // Check the teacher info
    const teacherName = screen.getByTestId('test-teacher-name');
    expect(teacherName).toHaveTextContent('John Doe');
    
    // Check teacher avatar fallback
    const avatarFallback = screen.getByTestId('test-teacher-avatar-fallback');
    expect(avatarFallback).toHaveTextContent('J');
  });

  it('displays the full description', () => {
    const testDescription = 'This is a test description that should be fully displayed';
    render(
      <SkillCard 
        skill={{
          ...mockSkill,
          description: testDescription,
        }}
        testId="test"
      />
    );
    
    // Check if the full description is displayed
    const description = screen.getByTestId('test-description');
    expect(description).toHaveTextContent(testDescription);
  });

  it('renders the teacher\'s name and session format', () => {
    render(<SkillCard skill={mockSkill} testId="test" />);
    
    // Check if the teacher's name is rendered
    const teacherName = screen.getByTestId('test-teacher-name');
    expect(teacherName).toHaveTextContent('John Doe');
    
    // Check if the session format is rendered
    const formatBadge = screen.getByTestId('test-session-format');
    expect(formatBadge).toHaveTextContent('VIRTUAL');
  });
  
  it('uses the first letter of the teacher\'s name as avatar fallback', () => {
    render(<SkillCard skill={mockSkill} testId="test" />);
    
    const avatarFallback = screen.getByTestId('test-teacher-avatar-fallback');
    expect(avatarFallback).toHaveTextContent('J');
  });
});
