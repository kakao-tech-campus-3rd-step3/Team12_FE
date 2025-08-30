export const RouterPath = {
  HOME: '/',
  CALENDAR: '/calendar',
  CALENDAR_VIEW: '/calendar/:view/:date',
  TEAM: '/team',
  LOGIN: '/login',
  MEMBERS: '/members',
};

export const createCalendarPath = (view: string, date: string) => `/calendar/${view}/${date}`;
export const CalendarPaths = {
  day: (date: string) => createCalendarPath('day', date),
  week: (date: string) => createCalendarPath('week', date),
  month: (date: string) => createCalendarPath('month', date),
};
