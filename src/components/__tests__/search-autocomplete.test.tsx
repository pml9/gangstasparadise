import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchAutocomplete from "../search-autocomplete";

// Mock the useOnClickOutside hook
vi.mock("@/hooks/use-on-click-outside", () => ({
  useOnClickOutside: vi.fn()
}));

describe("SearchAutocomplete", () => {
  it("renders the component", () => {
    const mockOnSearch = vi.fn();
    
    render(
      <SearchAutocomplete
        onSearch={mockOnSearch}
        testId="test-search"
      />
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-search-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search for skills, teachers, or keywords")).toBeInTheDocument();
  });
});
