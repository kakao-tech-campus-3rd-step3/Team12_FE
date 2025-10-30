export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//웹소켓
export const WS_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace('http://', 'ws://')?.replace('https://', 'wss://') ||
  import.meta.env.VITE_WS_FALLBACK_URL;

export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/members/signup',
  LOGIN: '/api/members/login',
  REFRESH: '/api/members/refresh',
  USER_INFO: '/api/members/me',
} as const;

export const PERSONAL_CALENDAR_ENDPOINTS = {
  GET_EVENTS: '/api/events',
  ADD_EVENT: '/api/events/add',
  MODIFY_EVENT: '/api/events/modify',
  DELETE_EVENT: (eventId: number) => `/api/events/${eventId}`,
} as const;

export const TEAM_CALENDAR_ENDPOINTS = {
  GET_EVENTS: (teamId: number) => `/api/events/team/${teamId}`,
  ADD_EVENT: '/api/events/team/add',
  MODIFY_EVENT: '/api/events/team/modify',
  DELETE_EVENT: (eventId: number) => `/api/events/team/${eventId}`,
  ADD_RECURRING_EVENT: (teamId: number) => `/api/events/team/recurring/add/${teamId}`,
  MODIFY_RECURRING_ALL_EVENT: (eventId: number) => `/api/events/team/recurring/modify/${eventId}`,
  MODIFY_RECURRING_ONE_EVENT: (eventId: number) => `/api/events/team/recurring/instance/${eventId}`,
  DELETE_RECURRING_ALL_EVENT: (eventId: number) => `/api/events/team/recurring/${eventId}`,
  DELETE_RECURRING_ONE_EVENT: (eventId: number) => `/api/events/team/recurring/instance/${eventId}`,
} as const;

export const EVERYTIME_ENDPOINTS = {
  TIMETABLES: '/api/everytime/timetables',
  TIMETABLE_DETAIL: '/api/everytime/timetable',
  TIMETABLE_IMAGE: '/api/everytime/timetable',
} as const;

export const TEAM_ENDPOINTS = {
  GET_TEAMS: '/api/teams',
  GET_TEAM_MEMBERS: (teamId: number) => `/api/teams/${teamId}/members`,
  JOIN_TEAM: '/api/teams/join',
  CREATE_TEAM: '/api/teams',
  GET_MY_TEAM_INFO: (teamId: number) => `/api/teams/${teamId}`,
  LEAVE_TEAM: (teamId: number) => `/api/teams/${teamId}/member`, // 팀 탈퇴
  DELETE_TEAM: (teamId: number) => `/api/teams/${teamId}/team`, // 팀 삭제

  //팀원 제거 (팀장 권한)
  DELETE_TEAM_MEMBER: (teamId: number, memberId: number) =>
    `/api/teams/${teamId}/members/${memberId}`,

  //팀 채팅
  CHAT_WEBSOCKET: (teamId: number, token: string) => `/ws/teams/${teamId}/chat?token=${token}`,
  CHAT_MESSAGES: (teamId: number) => `/api/teams/${teamId}/chat/messages`,
};
