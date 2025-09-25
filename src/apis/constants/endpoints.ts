export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/members/signup',
  LOGIN: '/api/members/login',
  REFRESH: '/api/members/refresh',
} as const;

export const CALENDAR_ENDPOINTS = {
  GET_EVENTS: '/api/events?startAt=:startAt&endAt=:endAt',
  ADD_EVENT: '/api/events/add',
  MODIFY_EVENT: '/api/events/modify',
  DELETE_EVENT: '/api/events/:eventId',
} as const;
