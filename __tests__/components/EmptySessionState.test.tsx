import { render, screen } from "@testing-library/react"
import { EmptySessionState } from "@/components/empty-session-state"

describe("EmptySessionState", () => {
  it("renders correct content for upcoming sessions", () => {
    const mockOnAction = vi.fn()
    
    render(
      <EmptySessionState 
        type="upcoming" 
        onAction={mockOnAction} 
        testId="empty-upcoming-sessions"
      />
    )

    expect(screen.getByText("No upcoming sessions")).toBeInTheDocument()
    expect(
      screen.getByText("You don't have any upcoming sessions scheduled.")
    ).toBeInTheDocument()
    
    const button = screen.getByRole('button', { name: /browse skills/i })
    expect(button).toBeInTheDocument()
    
    button.click()
    expect(mockOnAction).toHaveBeenCalledTimes(1)
  })

  it("applies custom test ID and accessibility attributes", () => {
    render(
      <EmptySessionState 
        type="past" 
        onAction={vi.fn()}
        testId="custom-test-id"
        ally={{
          'aria-label': 'Custom label',
          role: 'alert',
          'aria-live': 'assertive'
        }}
      />
    )

    const container = screen.getByTestId('custom-test-id')
    expect(container).toBeInTheDocument()
    expect(container).toHaveAttribute('aria-label', 'Custom label')
    expect(container).toHaveAttribute('role', 'alert')
    expect(container).toHaveAttribute('aria-live', 'assertive')
  })
})
