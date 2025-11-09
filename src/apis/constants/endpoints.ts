export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//웹소켓
export const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL?.replace('http://', 'ws://')?.replace('https://', 'wss://') ||
  import.meta.env.VITE_WS_BASE_URL;

export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/members/signup',
  LOGIN: '/api/members/login',
  REFRESH: '/api/members/refresh',
  USER_INFO: '/api/members/me',

  SEND_VERIFICATION_CODE: '/api/auth/email/send', // 이메일 인증 코드 발송
  VERITY_VERIFICATION_CODE: '/api/auth/email/verify', // 이메일 인증 코드 검증

  SIGNOUT: '/api/members/me',

  GOOGLE_CALENDAR_SYNC: '/api/google/calendar/sync', //구글 캘린더 연동
} as const;

export const PERSONAL_CALENDAR_ENDPOINTS = {
  GET_LECTURES: '/api/lectures',
  GET_EVENTS: '/api/events',
  GET_TODAY_EVENTS: '/api/events/today',

  GET_UPCOMMING_EVENTS: '/api/events/upcomming',
  ADD_EVENT: '/api/events/add',
  MODIFY_EVENT: (eventId: number) => `/api/events/modify/${eventId}`,
  DELETE_EVENT: (eventId: number) => `/api/events/${eventId}`,
  ADD_RECURRING_EVENT: '/api/events/recurring/add',
  MODIFY_RECURRING_ALL_EVENT: (eventId: number) => `/api/events/recurring/modify/${eventId}`,
  MODIFY_RECURRING_ONE_EVENT: (eventId: number) => `/api/events/recurring/instance/${eventId}`,
  DELETE_RECURRING_ALL_EVENT: (eventId: number) => `/api/events/recurring/${eventId}`,
  DELETE_RECURRING_ONE_EVENT: (eventId: number) => `/api/events/recurring/instance/${eventId}`,
} as const;

export const TEAM_CALENDAR_ENDPOINTS = {
  GET_EVENTS: (teamId: number) => `/api/events/team/${teamId}`,
  ADD_EVENT: '/api/events/team/add',
  MODIFY_EVENT: (eventId: number) => `/api/events/team/modify/${eventId}`,
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
  SAVE_LECTURES: '/api/lectures',
} as const;

export const TEAM_ENDPOINTS = {
  GET_TEAMS: '/api/teams',
  JOIN_TEAM: '/api/teams/join',
  CREATE_TEAM: '/api/teams',
  LEAVE_TEAM: (teamId: number) => `/api/teams/${teamId}/member`, // 팀 탈퇴
  DELETE_TEAM: (teamId: number) => `/api/teams/${teamId}/team`, // 팀 삭제

  GET_MY_TEAM_INFO: (teamId: number) => `/api/teams/${teamId}`, // 내 팀 정보 조회
  GET_TEAM_MEMBERS: (teamId: number) => `/api/teams/${teamId}/members`, // 팀원 정보 조회

  GET_AVAILABILITY: (teamId: number) => `/api/teams/${teamId}/when-to-meet`,

  DELETE_TEAM_MEMBER: (teamId: number, memberId: number) =>
    `/api/teams/${teamId}/members/${memberId}`, // 팀원 제거 (팀장 권한)

  // 팀 채팅
  CHAT_WEBSOCKET: (teamId: number, token: string) => `/ws/teams/${teamId}/chat?token=${token}`,
  CHAT_MESSAGES: (teamId: number) => `/api/teams/${teamId}/chat/messages`,

  GET_TEAM_UPCOMING_SCHEDULE: (teamId: number) => `/api/events/team/${teamId}/upcomming`,
  GET_TEAM_TODAY_SCHEDULE: (teamId: number) => `/api/events/team/${teamId}/today`,
  GET_TEAM_RECOMMEND_TIMES: (
    teamId: number,
    N: number,
    start_time: string,
    end_time: string,
    required_time: string,
  ) =>
    `/api/teams/${teamId}/when-to-meet/recommend?N=${N}&start_time=${start_time}&end_time=${end_time}&required_time=${required_time}`,
};
