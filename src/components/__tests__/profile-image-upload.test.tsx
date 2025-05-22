import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ProfileImageUpload } from "../profile-image-upload";

describe("ProfileImageUpload", () => {
  it("renders the component", () => {
    const mockOnImageChange = vi.fn();
    
    render(
      <ProfileImageUpload
        name="Test User"
        onImageChange={mockOnImageChange}
        testId="test-profile-image-upload"
      />
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-profile-image-upload")).toBeInTheDocument();
    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-fallback")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("T");
    expect(screen.getByTestId("file-input")).toBeInTheDocument();
  });
});
