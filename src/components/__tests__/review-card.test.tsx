import { render, screen } from "@testing-library/react";
import ReviewCard from "../review-card";

describe("ReviewCard", () => {
  it("renders the component", () => {
    const mockReview = {
      id: "1",
      userName: "John Doe",
      userImage: "/images/user.jpg",
      rating: 4.5,
      comment: "Great experience learning JavaScript!",
      date: "2025-05-01"
    };
    
    render(
      <ReviewCard
        review={mockReview}
        testId="test-review"
      />
    );
    
    // Check if the component renders
    expect(screen.getByTestId("test-review-1")).toBeInTheDocument();
    expect(screen.getByTestId("test-review-name")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("test-review-comment")).toHaveTextContent("Great experience learning JavaScript!");
    expect(screen.getByTestId("test-review-date")).toHaveTextContent("2025-05-01");
  });
});
