import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "../pagination";

describe("Pagination", () => {
  it("renders pagination with page numbers and navigation buttons", () => {
    const onPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />
    );

    // Check if pagination is rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    
    // Check if page numbers are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    
    // Check if navigation buttons are rendered
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    
    // Test page change
    fireEvent.click(screen.getByText("4"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
