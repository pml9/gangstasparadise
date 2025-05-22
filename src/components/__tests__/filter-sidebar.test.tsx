import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FilterSidebar from "../filter-sidebar";

describe("FilterSidebar", () => {
  it("renders the component with filter categories", () => {
    render(<FilterSidebar />);
    
    // Check if the main elements are rendered
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Reset all")).toBeInTheDocument();
    expect(screen.getByText("CATEGORIES")).toBeInTheDocument();
  });

  it("has a working reset button", async () => {
    const handleFilterChange = vi.fn();
    render(<FilterSidebar onFilterChange={handleFilterChange} />);
    
    const resetButton = screen.getByText("Reset all");
    await userEvent.click(resetButton);
    
    expect(handleFilterChange).toHaveBeenCalledWith({});
  });
});
