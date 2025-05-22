import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionRequestModal from '../../src/components/session-request-modal';
import { SessionFormat, AgeGroup } from '@/types/common';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('SessionRequestModal', () => {
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
      image: undefined,
      averageRating: 4.5,
      totalSessions: 10,
    },
    image: '/knitting.jpg',
    averageRating: 4.5,
    reviews: [],
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal with basic elements', () => {
    render(
      <SessionRequestModal
        skill={mockSkill}
        isOpen={true}
        onClose={mockOnClose}
        testId="session-request-modal"
      />
    );

    // Check if modal is rendered
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    
    // Check for the main title
    const title = screen.getByRole('heading', { name: /request a session/i });
    expect(title).toBeInTheDocument();
    
    // Check for step indicators (at least one step should be visible)
    const stepIndicators = screen.getAllByRole('presentation');
    expect(stepIndicators.length).toBeGreaterThan(0);
    
    // Check for navigation buttons (at least one button should be present)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Check if there's a next button (it might be disabled or enabled)
    const nextButton = screen.queryByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    
    // Check for close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    
    // Check for modal content
    const modalTitle = screen.getByTestId('session-request-modal-title');
    expect(modalTitle).toHaveTextContent('Request a Session');
    
    const modalDescription = screen.getByTestId('session-request-modal-description');
    expect(modalDescription).toHaveTextContent('Schedule a session with');
  });

  it('handles modal close', () => {
    render(
      <SessionRequestModal
        skill={mockSkill}
        isOpen={true}
        onClose={mockOnClose}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
