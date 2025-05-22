import { render, screen } from '@testing-library/react';
import SessionCalendar from '../session-calendar';

describe('SessionCalendar', () => {
  it('renders the component', () => {
    render(
      <SessionCalendar 
        sessions={[]} 
        currentUserId="user-1"
        onSelectDate={() => {}}
      />
    );
    
    expect(screen.getByTestId('session-calendar')).toBeInTheDocument();
  });
});
