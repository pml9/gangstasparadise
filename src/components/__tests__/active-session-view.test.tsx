import { render, screen } from '@testing-library/react';
import ActiveSessionView from '../active-session-view';

describe('ActiveSessionView', () => {
  const mockProps = {
    sessionTitle: 'Test Session',
    participantName: 'John Doe',
    participantImage: '/placeholder.jpg',
    onEndSession: vi.fn(),
    onMute: vi.fn(),
    onVideoToggle: vi.fn(),
    onChatToggle: vi.fn(),
    isMuted: false,
    isVideoOn: true,
    isChatOpen: false,
    timeElapsed: '00:10:30',
  };

  it('renders the component', () => {
    render(<ActiveSessionView {...mockProps} />);
    // Check for the presence of the session container
    expect(screen.getByRole('button', { name: /end session/i })).toBeInTheDocument();
  });
});
