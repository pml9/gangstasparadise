import { render, screen } from "@testing-library/react";
import EmptyState from "../empty-state";

describe("EmptyState", () => {
  it("renders the component", () => {
    render(
      <EmptyState
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        testId="empty-state"
      />
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try adjusting your search or filter to find what you're looking for."
      )
    ).toBeInTheDocument();
  });
});
