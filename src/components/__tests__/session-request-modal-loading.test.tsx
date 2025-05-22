import { render, screen } from '@testing-library/react';
import SessionRequestModalLoading from '../session-request-modal-loading';

describe('SessionRequestModalLoading', () => {
  it('renders the component', () => {
    render(
      <SessionRequestModalLoading 
        isOpen={true}
      />
    );
    
    // Check for the dialog presence
    const dialog = screen.getByRole('alert', { name: 'Loading session request form' });
    expect(dialog).toBeInTheDocument();
    
    // Check for skeleton placeholders
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
