import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SessionCalendar from '../../src/components/session-calendar';
import { format } from 'date-fns';

describe('SessionCalendar', () => {
  const mockOnSelectDate = vi.fn();
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  
  const mockSessions = [
    {
      id: '1',
      title: 'Morning Yoga',
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0).toISOString(),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0).toISOString(),
      status: 'SCHEDULED',
      teacher: { id: 'teacher-1', name: 'John Doe' },
      student: { id: 'student-1', name: 'Jane Smith' },
    },
  ];

  const defaultProps = {
    sessions: mockSessions,
    currentUserId: 'user-1',
    onSelectDate: mockOnSelectDate,
    testId: 'session-calendar',
    'aria-label': 'Session Calendar',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the calendar with current month and year', () => {
    render(<SessionCalendar {...defaultProps} />);
    
    // Check if the current month and year are displayed
    const currentMonthYear = format(today, 'MMMM yyyy');
    expect(screen.getByRole('heading', { name: currentMonthYear })).toBeInTheDocument();
    
    // Check if navigation buttons are present
    expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next month/i })).toBeInTheDocument();
    
    // Check if today's date is marked with the correct class
    const todayCell = screen.getByTestId(`day-${format(today, 'yyyy-MM-dd')}`);
    expect(todayCell.className).toContain('bg-secondary-gold-pale');
    
    // Check if session is displayed on the correct date
    const sessionDate = new Date(mockSessions[0].startTime);
    const sessionDay = sessionDate.getDate();
    const sessionMonth = sessionDate.getMonth();
    const sessionYear = sessionDate.getFullYear();
    
    // Check if the calendar shows the current month and year
    const monthYear = screen.getByText('May 2025');
    expect(monthYear).toBeInTheDocument();
    
    // Check if the calendar navigation is rendered
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
    
    // Check if weekday headers are present
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });
});
