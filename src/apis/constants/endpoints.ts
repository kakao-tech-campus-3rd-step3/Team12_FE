export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/members/signup',
  LOGIN: '/api/members/login',
  REFRESH: '/api/members/refresh',
} as const;

export const CALENDAR_ENDPOINTS = {
  GET_EVENTS: '/api/events',
  ADD_EVENT: '/api/events/add',
  MODIFY_EVENT: '/api/events/modify',
  DELETE_EVENT: (eventId: number) => `/api/events/${eventId}`,
} as const;

export const EVERYTIME_ENDPOINTS = {
  TIMETABLES: '/api/everytime/timetables',
  TIMETABLE_DETAIL: '/api/everytime/timetable',
  TIMETABLE_IMAGE: '/api/everytime/timetable',
} as const;

export const TEAM_ENDPOINTS = {
  GET_TEAMS: '/api/teams',
  JOIN_TEAM: '/api/teams/join',
  CREATE_TEAM: '/api/teams',
  LEAVE_TEAM: (teamId: number) => `/api/teams/${teamId}/member`, // 팀 탈퇴
  DELETE_TEAM: (teamId: number) => `/api/teams/${teamId}/team`, // 팀 삭제
};
