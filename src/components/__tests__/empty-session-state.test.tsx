import { render, screen } from '@testing-library/react';
import { EmptySessionState } from '../empty-session-state';

describe('EmptySessionState', () => {
  it('renders the component', () => {
    render(
      <EmptySessionState 
        type="upcoming"
        testId="empty-session-state"
      />
    );
    
    expect(screen.getByTestId('empty-session-state')).toBeInTheDocument();
  });
});
