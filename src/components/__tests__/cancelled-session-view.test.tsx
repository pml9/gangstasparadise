import { render, screen } from '@testing-library/react';
import CancelledSessionView from '../cancelled-session-view';

describe('CancelledSessionView', () => {
  const mockProps = {
    sessionTitle: 'Cancelled Session',
    teacherName: 'John Smith',
    cancellationReason: 'Unexpected circumstances',
    onBackToSessions: vi.fn(),
  };

  it('renders the component', () => {
    render(<CancelledSessionView {...mockProps} />);
    expect(screen.getByText(/session cancelled/i)).toBeInTheDocument();
  });
});
