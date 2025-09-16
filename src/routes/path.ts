export const RouterPath = {
  HOME: {
    DEFAULT: '/',
    VIEW: '/:view/:date',
  },
  // 개인 캘린더
  // PERSONAL_CALENDAR: '/personal-calendar',
  // PERSONAL_CALENDAR_VIEW: '/personal-calendar/:view/:date',
  TEAM_CALENDAR: {
    DEFAULT: '/team-calendar/:id',
    VIEW: '/team-calendar/:id/:view/:date',
  },
  TEAM: '/team',
  LOGIN: '/login',
  SIGNUP: '/signup',
  MEMBERS: '/members',
};

export const createPersonalCalendarPath = (view: string, date: string) =>
  `/personal-calendar/${view}/${date}`;
export const PersonalCalendarPaths = {
  day: (date: string) => createPersonalCalendarPath('day', date),
  week: (date: string) => createPersonalCalendarPath('week', date),
  month: (date: string) => createPersonalCalendarPath('month', date),
};
