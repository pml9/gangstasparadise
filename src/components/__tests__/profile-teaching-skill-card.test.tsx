import { render, screen } from "@testing-library/react";
import ProfileTeachingSkillCard from "../profile-teaching-skill-card";
import { SkillLevel } from "@/types/common";

describe("ProfileTeachingSkillCard", () => {
  it("renders the component", () => {
    const mockSkill = {
      id: "1",
      name: "JavaScript",
      description: "Modern web development language",
      level: "EXPERT" as SkillLevel,
      experienceYears: 5,
      category: {
        id: "1",
        name: "Programming",
        description: "Programming languages and frameworks"
      },
      userId: "user1",
      isTeaching: true
    };
    
    render(
      <ProfileTeachingSkillCard
        skill={mockSkill}
        testId="test-teaching-skill"
      />
    );
    
    // Check if the component renders
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getByText("Expert")).toBeInTheDocument();
    expect(screen.getByText("5 years experience")).toBeInTheDocument();
    expect(screen.getByText("Modern web development language")).toBeInTheDocument();
    expect(screen.getByText("Manage")).toBeInTheDocument();
  });
});
