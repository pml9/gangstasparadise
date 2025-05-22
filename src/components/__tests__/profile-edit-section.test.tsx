import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ProfileEditSection } from "../profile-edit-section";

describe("ProfileEditSection", () => {
  it("renders the component", () => {
    const mockSave = vi.fn().mockResolvedValue(undefined);
    const mockCancel = vi.fn();
    
    render(
      <ProfileEditSection
        title="Test Section"
        onSave={mockSave}
        onCancel={mockCancel}
        isEditing={false}
        testId="test-profile-section"
      >
        <div>Test Content</div>
      </ProfileEditSection>
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-profile-section")).toBeInTheDocument();
    expect(screen.getByTestId("test-profile-section-viewing")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
