import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SessionCard } from '../../src/components/session-card';
import '@testing-library/jest-dom';
import { format } from 'date-fns';

// Mock the session data
const mockSession = {
  id: '1',
  title: 'Learn to Bake Sourdough',
  description: 'A comprehensive guide to baking perfect sourdough bread at home.',
  startTime: '2023-06-15T14:00:00.000Z',
  endTime: '2023-06-15T16:00:00.000Z',
  duration: 120,
  status: 'SCHEDULED',
  skill: {
    id: 'skill-1',
    name: 'Sourdough Baking',
    title: 'Sourdough Baking',
    category: 'cooking',
    level: 'beginner',
    description: 'Learn to make delicious sourdough bread from scratch.',
    rating: 4.7,
    reviewCount: 15,
    image: '/bread.jpg',
    sessionFormat: 'in-person',
    teacherId: 'teacher-1',
    status: 'UPCOMING',
  },
  teacher: {
    id: 'teacher-1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    image: '/jane.jpg',
    avatar: '/jane.jpg',
    bio: 'Professional baker with 10+ years of experience',
    ageGroup: '30-49',
  },
  learner: {
    id: 'student-1',
    name: 'John Doe',
    email: 'john@example.com',
    image: '/john.jpg',
    avatar: '/john.jpg',
    bio: 'Aspiring baker',
    ageGroup: '25-29',
  },
  student: {
    id: 'student-1',
    name: 'John Doe',
    email: 'john@example.com',
    image: '/john.jpg',
    avatar: '/john.jpg',
    bio: 'Aspiring baker',
    ageGroup: '25-29',
  },
  meetingLink: 'https://meet.example.com/session-1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const currentUserId = 'student-1';

describe('SessionCard', () => {

  it('renders session card with correct information', () => {
    render(<SessionCard 
      session={mockSession} 
      currentUserId={currentUserId}
      onJoin={() => {}}
      onMessage={() => {}}
    />);
    
    // Check session title
    expect(screen.getByText('Learn to Bake Sourdough')).toBeInTheDocument();
    
    // Check participant name and role
    const participantNames = screen.getAllByTestId('session-card-participant-name');
    // The first one is the session title, the second one is the participant name
    expect(participantNames[1]).toHaveTextContent('Jane Smith');
    
    const participantRole = screen.getByText('Learner');
    expect(participantRole).toBeInTheDocument();
    
    // Check description
    expect(screen.getByText('A comprehensive guide to baking perfect sourdough bread at home.')).toBeInTheDocument();
    
    // Check date and time
    const dateTimeText = screen.getByTestId('session-card-datetime-text').textContent;
    expect(dateTimeText).toContain('Jun 15, 2023');
    expect(dateTimeText).toContain('5:00 PM');
    expect(dateTimeText).toContain('7:00 PM');
    
    // Check if status badge is displayed
    expect(screen.getByTestId('status-badge-scheduled')).toBeInTheDocument();
  });

  it('shows student info when current user is teacher', () => {
    render(<SessionCard 
      session={mockSession} 
      currentUserId={mockSession.teacher.id}
      onJoin={() => {}}
      onMessage={() => {}}
    />);
    
    // Check if student info is displayed for teachers
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
  
  it('displays the correct status badge', () => {
    const statuses = ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'PENDING'] as const;
    
    statuses.forEach(status => {
      const { unmount } = render(
        <SessionCard 
          session={{ ...mockSession, status }} 
          currentUserId={currentUserId}
          onJoin={() => {}}
          onMessage={() => {}}
        />
      );
      
      // Check for status badge with the correct test ID format
      const statusBadge = screen.getByTestId(`status-badge-${status.toLowerCase()}`);
      expect(statusBadge).toBeInTheDocument();
      
      // Clean up after each render
      unmount();
    });
  });
  
  it('displays the correct action button based on role and status', () => {
    // Test student role with scheduled session
    const { rerender } = render(
      <SessionCard 
        session={{ 
          ...mockSession, 
          status: 'SCHEDULED',
          skill: {
            ...mockSession.skill,
            status: 'ACTIVE'
          }
        }} 
        currentUserId={currentUserId}
        onJoin={() => {}}
        onMessage={() => {}}
      />
    );
    
    // Check for join button for student
    const joinButton = screen.getByTestId('session-card-join-button');
    expect(joinButton).toBeInTheDocument();
    
    // Test teacher role with scheduled session
    rerender(
      <SessionCard 
        session={{ 
          ...mockSession, 
          status: 'SCHEDULED',
          skill: {
            ...mockSession.skill,
            status: 'ACTIVE'
          }
        }} 
        currentUserId={mockSession.teacher.id}
        onJoin={() => {}}
        onMessage={() => {}}
      />
    );
    
    // Check for start button for teacher
    const startButton = screen.getByTestId('session-card-join-button');
    expect(startButton).toBeInTheDocument();
    
    // Test completed session with review option
    rerender(
      <SessionCard 
        session={{ 
          ...mockSession, 
          status: 'COMPLETED',
          skill: {
            ...mockSession.skill,
            status: 'ACTIVE'
          }
        }} 
        currentUserId={currentUserId}
        onJoin={() => {}}
        onMessage={() => {}}
        onReview={() => {}}
      />
    );
    
    // Check for review button
    const reviewButton = screen.getByTestId('session-card-review-button');
    expect(reviewButton).toBeInTheDocument();
  });

  it('displays the full description without truncation', () => {
    const testDescription = 'A test description that should be fully visible';
    render(
      <SessionCard 
        session={{
          ...mockSession,
          description: testDescription,
        }} 
        currentUserId={currentUserId}
        onJoin={() => {}}
        onMessage={() => {}}
      />
    );
    
    const description = screen.getByText(testDescription);
    expect(description).toBeInTheDocument();
  });
  
  it('calls onJoin when join button is clicked', () => {
    const handleJoin = vi.fn();
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId={currentUserId}
        onJoin={handleJoin}
        onMessage={() => {}}
      />
    );
    
    const joinButton = screen.getByRole('button', { name: /join session/i });
    fireEvent.click(joinButton);
    
    expect(handleJoin).toHaveBeenCalledTimes(1);
  });
  
  it('calls onMessage when message button is clicked', () => {
    const handleMessage = vi.fn();
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId={currentUserId}
        onJoin={() => {}}
        onMessage={handleMessage}
      />
    );
    
    const messageButton = screen.getByRole('button', { name: /message/i });
    fireEvent.click(messageButton);
    
    expect(handleMessage).toHaveBeenCalledTimes(1);
  });
});
