import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Header from "../header";

// Mock the useUserData hook
vi.mock("@/lib/hooks/useUserData", () => ({
  useUserData: vi.fn().mockReturnValue({
    userData: { name: "Test User", email: "test@example.com" },
    isLoading: false,
  }),
}));

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/dashboard"),
}));

describe("Header", () => {
  it("renders the header with navigation and user profile", () => {
    render(<Header />);
    
    // Check if the header is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    
    // Check for navigation items
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Browse Skills")).toBeInTheDocument();
    expect(screen.getByText("My Sessions")).toBeInTheDocument();
    
    // Check for user profile
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });
});
