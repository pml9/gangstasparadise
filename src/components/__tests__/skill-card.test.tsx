import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillCard from '../skill-card';
import type { Skill } from '@/types/skill';

const mockSkill: Skill = {
  id: '1',
  name: 'Test Skill',
  description: 'This is a test skill description',
  category: {
    id: '1',
    name: 'Test Category',
    description: 'Test category description',
    icon: 'test-icon',
    color: 'blue',
  },
  teacher: {
    id: '1',
    name: 'Test Teacher',
    email: 'test@example.com',
    image: '/test-image.jpg',
    bio: 'Test bio',
    level: 'EXPERIENCED GUIDE',
    interests: ['teaching', 'learning'],
    skills: [],
    availability: [],
  },
  sessionFormat: 'ONLINE',
  duration: 60,
  price: 50,
  maxParticipants: 5,
  skillLevel: 'BEGINNER',
  learningOutcomes: ['Learn something', 'Have fun'],
  materials: ['Laptop', 'Internet'],
  averageRating: 4.5,
  totalSessions: 10,
  image: '/test-skill.jpg',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('SkillCard', () => {
  it('renders skill information correctly', () => {
    render(<SkillCard skill={mockSkill} testId="test-skill-card" />);
    
    // Check if the skill name is rendered
    expect(screen.getByText('Test Skill')).toBeInTheDocument();
    
    // Check if the category is rendered
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('This is a test skill description')).toBeInTheDocument();
    
    // Check if the teacher's name is rendered
    expect(screen.getByText('Test Teacher')).toBeInTheDocument();
    
    // Check if the session format is rendered
    expect(screen.getByText('ONLINE')).toBeInTheDocument();
    
    // Check if the rating is rendered (4.5 stars)
    expect(screen.getByLabelText(/Rating: 4.5 out of 5/)).toBeInTheDocument();
    
    // Check if the image has the correct alt text
    const image = screen.getByTestId('test-skill-card-image-container').querySelector('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('test-skill.jpg'));
  });

  it('shows loading skeleton when isLoading is true', () => {
    render(<SkillCard skill={mockSkill} isLoading={true} testId="test-skill-card" />);
    
    // Check if loading skeleton elements are present
    expect(screen.getByTestId('test-skill-card-loading')).toBeInTheDocument();
    expect(screen.getByTestId('test-skill-card-loading-image')).toBeInTheDocument();
    expect(screen.getByTestId('test-skill-card-loading-title')).toBeInTheDocument();
    expect(screen.getByTestId('test-skill-card-loading-description')).toBeInTheDocument();
  });
});
