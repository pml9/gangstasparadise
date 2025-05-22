export interface CalendarDay {
  day: number;
  month: string;
  current: boolean;
  isToday?: boolean;
  hasSession?: boolean;
}

export const generateCalendarDays = (year: number, month: number, day: number): CalendarDay[] => {
  const calendarDays: CalendarDay[] = [];
  const now = new Date(year, month, 1);
  const firstDayOfMonth = now.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInLastMonth = new Date(year, month, 0).getDate();
  
  // Previous month's days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInLastMonth - i,
      month: new Date(year, month - 1, 1).toLocaleString('default', { month: 'short' }),
      current: false,
    });
  }
  
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === day && month === new Date().getMonth() && year === new Date().getFullYear();
    calendarDays.push({
      day: i,
      month: now.toLocaleString('default', { month: 'short' }),
      current: true,
      isToday,
      hasSession: isToday || Math.random() > 0.9,
    });
  }
  
  // Next month's days (to fill the last row)
  const remainingDays = 42 - calendarDays.length; // 6 rows x 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      month: new Date(year, month + 1, 1).toLocaleString('default', { month: 'short' }),
      current: false,
    });
  }

  return calendarDays;
};
