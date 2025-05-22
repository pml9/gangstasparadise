import { render, screen } from "@testing-library/react";
import ProfileSkillCard from "../profile-skill-card";
import { AgeGroup, SessionFormat } from "@/types/common";

describe("ProfileSkillCard", () => {
  it("renders the component", () => {
    const mockSkill = {
      id: "1",
      name: "JavaScript",
      description: "Modern web development language",
      category: {
        id: "1",
        name: "Programming",
        description: "Programming languages and frameworks"
      },
      sessionFormat: SessionFormat.BOTH,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
      teacher: {
        id: "teacher1",
        name: "John Doe",
        ageGroup: AgeGroup.ESTABLISHED_ADULTS,
        averageRating: 4.5,
        totalSessions: 10
      },
      averageRating: 4.5,
      totalSessions: 10,
      image: "/images/javascript.jpg",
      reviews: []
    };
    
    render(
      <ProfileSkillCard
        skill={mockSkill}
        isTeaching={true}
        testId="test-skill-card"
      />
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-skill-card-1")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Programming")).toBeInTheDocument();
    expect(screen.getByText("Teaching")).toBeInTheDocument();
    expect(screen.getByText("Modern web development language")).toBeInTheDocument();
    expect(screen.getByText("Manage Sessions")).toBeInTheDocument();
  });
});
