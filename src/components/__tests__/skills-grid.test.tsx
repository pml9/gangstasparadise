import { render, screen } from '@testing-library/react';
import SkillsGrid from '../skills-grid';

describe('SkillsGrid', () => {
  it('renders the component', () => {
    render(
      <SkillsGrid 
        skills={[]}
        testId="skills-grid"
      />
    );
    
    expect(screen.getByTestId('skills-grid')).toBeInTheDocument();
  });
});
