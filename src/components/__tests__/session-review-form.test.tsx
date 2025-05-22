import { render, screen } from '@testing-library/react';
import SessionReviewForm from '../session-review-form';

describe('SessionReviewForm', () => {
  it('renders the component', () => {
    render(
      <SessionReviewForm 
        sessionId="session-1"
        teacherName="John Doe"
        skillName="Test Skill"
        onSubmit={() => {}}
        testId="session-review-form"
        ally={{
          role: 'form',
          'aria-label': 'Session review form'
        }}
      />
    );
    
    expect(screen.getByRole('form', { name: 'Session review form' })).toBeInTheDocument();
  });
});
