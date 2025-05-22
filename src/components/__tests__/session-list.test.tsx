import { render, screen } from '@testing-library/react';
import { SessionList } from '../session-list';
import { vi } from 'vitest';
import React from 'react';

// Mock the session-card component
vi.mock('@/components/session-card', () => {
  const SessionCard = ({ session }: { session: any }) => (
    <div data-testid="mock-session-card">{session.title}</div>
  );
  return { SessionCard };
});

describe('SessionList', () => {
  it('renders the empty state when no sessions are provided', () => {
    const onEmptyAction = vi.fn();
    render(
      <SessionList 
        sessions={[]} 
        currentUserId="user-1"
        type="upcoming"
        onEmptyAction={onEmptyAction}
      />
    );
    
    expect(screen.getByTestId('empty-session-state')).toBeInTheDocument();
    expect(screen.getByText('No upcoming sessions')).toBeInTheDocument();
  });

  it('renders a list of sessions when sessions are provided', () => {
    const mockSessions = [
      { 
        id: '1', 
        title: 'Test Session 1', 
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        status: 'SCHEDULED',
        skill: { 
          id: '1', 
          name: 'Test Skill',
          category: { id: '1', name: 'Technology', icon: null }
        },
        teacher: { id: '1', name: 'Test Teacher' },
        learner: { id: '2', name: 'Test Learner' },
        format: 'VIRTUAL'
      },
      { 
        id: '2', 
        title: 'Test Session 2', 
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        status: 'SCHEDULED',
        skill: { 
          id: '2', 
          name: 'Another Skill',
          category: { id: '2', name: 'Art', icon: null }
        },
        teacher: { id: '1', name: 'Test Teacher' },
        learner: { id: '2', name: 'Test Learner' },
        format: 'IN_PERSON'
      },
    ] as any[];
    
    render(
      <SessionList 
        sessions={mockSessions} 
        currentUserId="user-1"
        type="upcoming"
        onEmptyAction={() => {}}
      />
    );
    
    const sessionCards = screen.getAllByTestId('mock-session-card');
    expect(sessionCards).toHaveLength(2);
    expect(sessionCards[0]).toHaveTextContent('Test Session 1');
    expect(sessionCards[1]).toHaveTextContent('Test Session 2');
  });
});
