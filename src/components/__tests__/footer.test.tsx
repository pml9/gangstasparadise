import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("Footer", () => {
  it("renders the component with navigation links and social media icons", () => {
    render(<Footer />);
    
    // Check if the footer is rendered
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    
    // Check for main sections
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    
    // Check for social media icons
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
  });
});
