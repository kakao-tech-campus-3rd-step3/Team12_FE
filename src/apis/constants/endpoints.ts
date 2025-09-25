export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AUTH_ENDPOINTS = {
  SIGNUP: '/api/members/signup',
  LOGIN: '/api/members/login',
  REFRESH: '/api/members/refresh',
} as const;

export const EVERYTIME_ENDPOINTS = {
  TIMETABLES: '/api/everytime/timetables',
} as const;
