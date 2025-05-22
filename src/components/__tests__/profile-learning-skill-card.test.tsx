import { render, screen } from "@testing-library/react";
import ProfileLearningSkillCard from "../profile-learning-skill-card";
import { SkillLevel } from "@/types/common";

describe("ProfileLearningSkillCard", () => {
  it("renders the component", () => {
    const mockSkill = {
      id: "1",
      name: "JavaScript",
      description: "Modern web development language",
      level: "INTERMEDIATE" as SkillLevel,
      category: {
        id: "1",
        name: "Programming",
        description: "Programming languages and frameworks"
      },
      userId: "user1",
      isTeaching: false
    };
    
    render(
      <ProfileLearningSkillCard
        skill={mockSkill}
        testId="test-learning-skill"
      />
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-learning-skill-1")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getByText("Modern web development language")).toBeInTheDocument();
    expect(screen.getByTestId("continue-learning-button")).toBeInTheDocument();
  });
});
