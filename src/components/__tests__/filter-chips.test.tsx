import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FilterChips from "../filter-chips";

describe("FilterChips", () => {
  it("renders the component with filters", () => {
    const mockFilters = [
      { id: "1", label: "Cooking", category: "Culinary" },
      { id: "2", label: "Beginner", category: "Level" },
    ];
    const mockOnRemove = vi.fn();
    const mockOnClearAll = vi.fn();

    render(
      <FilterChips
        filters={mockFilters}
        onRemove={mockOnRemove}
        onClearAll={mockOnClearAll}
        resultCount={5}
        testId="filter-chips"
      />
    );

    expect(screen.getByTestId("filter-chips")).toBeInTheDocument();
    expect(screen.getByTestId("result-count")).toBeInTheDocument();
    expect(screen.getByText("Cooking")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });
});
