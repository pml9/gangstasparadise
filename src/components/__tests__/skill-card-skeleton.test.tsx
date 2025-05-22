import { render, screen } from '@testing-library/react';
import SkillCardSkeleton from '../skill-card-skeleton';

describe('SkillCardSkeleton', () => {
  it('renders the component', () => {
    render(
      <SkillCardSkeleton 
        testId="skill-card-skeleton"
      />
    );
    
    expect(screen.getByTestId('skill-card-skeleton')).toBeInTheDocument();
  });
});
