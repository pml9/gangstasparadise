import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SessionCard } from '../session-card';
import { format } from 'date-fns';

const mockSession = {
  id: '1',
  title: 'Test Session',
  description: 'This is a test session description',
  startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(), // 1 hour later
  status: 'SCHEDULED',
  format: 'VIRTUAL',
  skill: {
    id: '1',
    name: 'Test Skill',
    category: {
      id: '1',
      name: 'Test Category',
      icon: '🎨',
    },
  },
  teacher: {
    id: '1',
    name: 'Test Teacher',
    avatar: '/test-teacher.jpg',
  },
  learner: {
    id: '2',
    name: 'Test Learner',
    avatar: '/test-learner.jpg',
  },
  topic: 'Test Topic',
};

describe('SessionCard', () => {
  const mockOnJoin = vi.fn();
  const mockOnMessage = vi.fn();
  const mockOnReview = vi.fn();
  const mockOnReschedule = vi.fn();
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders session information correctly', () => {
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId="2" // Current user is the learner
        onJoin={mockOnJoin}
        onMessage={mockOnMessage}
        onReview={mockOnReview}
        onReschedule={mockOnReschedule}
        onSelect={mockOnSelect}
        testId="test-session-card"
      />
    );

    // Check if the session title is rendered
    expect(screen.getByText('Test Session')).toBeInTheDocument();
    
    // Check if the session description is rendered
    expect(screen.getByText('This is a test session description')).toBeInTheDocument();
    
    // Check if the session date and time are rendered
    const startDate = new Date(mockSession.startTime);
    const endDate = new Date(mockSession.endTime);
    const expectedDateTime = `${format(startDate, 'MMM d, yyyy')} ${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
    expect(screen.getByTestId('test-session-card-datetime-text')).toHaveTextContent(expectedDateTime);
    
    // Check if the session format is rendered
    expect(screen.getByText('Virtual')).toBeInTheDocument();
    
    // Check if the skill category is rendered
    expect(screen.getByText('🎨 Test Category')).toBeInTheDocument();
    
    // Check if the teacher's name is rendered
    expect(screen.getByText('Test Teacher')).toBeInTheDocument();
    
    // Check if the role (Learner) is rendered since current user is the learner
    expect(screen.getByText('Learner')).toBeInTheDocument();
    
    // Check if the status is rendered
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
    
    // Check if action buttons are rendered
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Join Session')).toBeInTheDocument();
  });

  it('calls onJoin when join button is clicked', () => {
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId="2" // Current user is the learner
        onJoin={mockOnJoin}
        testId="test-session-card"
      />
    );

    const joinButton = screen.getByText('Join Session');
    fireEvent.click(joinButton);
    
    expect(mockOnJoin).toHaveBeenCalledTimes(1);
  });

  it('calls onMessage when message button is clicked', () => {
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId="2" // Current user is the learner
        onMessage={mockOnMessage}
        testId="test-session-card"
      />
    );

    const messageButton = screen.getByText('Message');
    fireEvent.click(messageButton);
    
    expect(mockOnMessage).toHaveBeenCalledTimes(1);
  });

  it('shows review button for completed sessions when current user is the learner', () => {
    const completedSession = {
      ...mockSession,
      status: 'COMPLETED',
    };
    
    render(
      <SessionCard 
        session={completedSession} 
        currentUserId="2" // Current user is the learner
        onReview={mockOnReview}
        testId="test-session-card"
      />
    );

    const reviewButton = screen.getByText('Review');
    fireEvent.click(reviewButton);
    
    expect(mockOnReview).toHaveBeenCalledTimes(1);
  });

  it('shows reschedule button for cancelled sessions', () => {
    const cancelledSession = {
      ...mockSession,
      status: 'CANCELLED',
    };
    
    render(
      <SessionCard 
        session={cancelledSession} 
        currentUserId="2"
        onReschedule={mockOnReschedule}
        testId="test-session-card"
      />
    );

    const rescheduleButton = screen.getByText('Reschedule');
    fireEvent.click(rescheduleButton);
    
    expect(mockOnReschedule).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <SessionCard 
        session={mockSession} 
        currentUserId="2"
        isLoading={true}
        testId="test-session-card"
      />
    );

    // Check if loading elements are present
    expect(screen.getByTestId('test-session-card-loading')).toBeInTheDocument();
    expect(screen.getByTestId('loading-title')).toBeInTheDocument();
    expect(screen.getByTestId('loading-description-1')).toBeInTheDocument();
  });
});
