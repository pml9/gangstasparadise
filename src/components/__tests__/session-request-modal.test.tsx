import { render, screen } from '@testing-library/react';
import SessionRequestModal from '../session-request-modal';
import { SessionFormat, AgeGroup } from '@/types/common';

// Mock the skill data
const mockSkill = {
  id: 'skill-1',
  name: 'Test Skill',
  description: 'Test Description',
  category: {
    id: 'category-1',
    name: 'Test Category',
    description: 'Test Category Description',
    icon: 'test-icon'
  },
  level: 'beginner',
  sessionFormat: SessionFormat.VIRTUAL,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  teacherId: 'teacher-1',
  teacher: {
    id: 'teacher-1',
    name: 'Test Teacher',
    email: 'teacher@example.com',
    avatar: '/avatar.png',
    bio: 'Test bio',
    location: 'Test Location',
    timezone: 'UTC',
    languages: ['English'],
    rating: 4.5,
    reviewCount: 10,
    ageGroup: AgeGroup.ESTABLISHED_ADULTS,
  },
  image: '/skill-image.jpg',
  price: 50,
  duration: 60,
  reviews: [],
};

describe('SessionRequestModal', () => {
  it('renders the component', () => {
    render(
      <SessionRequestModal 
        skill={mockSkill}
        isOpen={true}
        onClose={() => {}}
        aria-label="Request a session"
      />
    );
    
    // Check for dialog using test ID
    const dialog = screen.getByTestId('session-request-modal');
    expect(dialog).toBeInTheDocument();
    
    // Check for the title
    expect(screen.getByText('Request a Session')).toBeInTheDocument();
    
    // Check for skill name in the modal description
    const description = screen.getByTestId('session-request-modal-description');
    expect(description).toHaveTextContent('Schedule a session with Test Teacher');
  });
});
