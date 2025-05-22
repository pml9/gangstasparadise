import { render, screen } from "@testing-library/react"
import { SessionList } from "@/components/session-list"
import { EmptySessionState } from "@/components/empty-session-state"
import { Session } from "@/types/session"
import { AgeGroup, SessionStatus, SessionFormat } from "@/types/common"
import { vi } from 'vitest';

// Mock the EmptySessionState component
vi.mock("@/components/empty-session-state", () => ({
  EmptySessionState: vi.fn(() => <div data-testid="empty-state">Empty State</div>)
}))

// Mock the SessionCard component
vi.mock("@/components/session-card", () => ({
  SessionCard: vi.fn(({ session }) => (
    <div data-testid="session-card">
      <h3>{session.title}</h3>
      <p>{session.description}</p>
    </div>
  ))
}));

describe("SessionList", () => {
  const mockSession: Session = {
    id: "1",
    title: "Test Session",
    description: "Test Description",
    skill: {
      id: "skill-1",
      name: "Test Skill",
      category: { 
        id: "cat-1", 
        name: "test",
        description: "Test category description" 
      }
    },
    teacher: {
      id: "mentor-1",
      name: "Test Mentor",
      image: "/avatar.jpg",
      ageGroup: AgeGroup.ESTABLISHED_ADULTS
    },
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    status: SessionStatus.SCHEDULED,
    meetingLink: "https://example.com/meeting",
    learner: {
      id: "learner-1",
      name: "Test Learner",
      image: "/learner.jpg",
      ageGroup: AgeGroup.ESTABLISHED_ADULTS
    },
    format: SessionFormat.VIRTUAL,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  it("renders empty state when no sessions are provided", () => {
    const onEmptyAction = vi.fn();
    
    // Create a spy to track the mock implementation
    const mockEmptyState = vi.fn().mockReturnValue(
      <div data-testid="empty-state">No sessions</div>
    );
    
    // Mock the EmptySessionState component
    vi.mocked(EmptySessionState).mockImplementation((props) => {
      // Call the spy with the props for assertion
      mockEmptyState(props);
      return <div data-testid="empty-state">No sessions</div>;
    });
    
    render(
      <SessionList
        sessions={[]}
        currentUserId="user-1"
        type="upcoming"
        onEmptyAction={onEmptyAction}
      />
    );
    
    // Verify the empty state is rendered
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    
    // Verify the mock was called with the correct props
    expect(mockEmptyState).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "upcoming"
      })
    );
  })

  it("renders list of sessions when sessions are provided", () => {
    render(
      <SessionList
        sessions={[mockSession]}
        currentUserId="user-1"
        type="upcoming"
        onEmptyAction={vi.fn()}
      />
    )

    expect(screen.getByTestId("session-list")).toBeInTheDocument()
    expect(screen.getByTestId("session-card")).toBeInTheDocument()
    expect(screen.getByText("Test Session")).toBeInTheDocument()
  })
})
