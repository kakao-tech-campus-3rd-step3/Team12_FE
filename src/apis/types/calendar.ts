import type { CalendarEvent } from '@/types/calendar';

// API가 배열을 직접 반환하므로 타입을 배열로 변경
export type getCalendarEventsResponse = CalendarEvent[];

//팀 일정 조회
export type getTeamCalendarEventsResponse = {
  event_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  is_private: boolean;
  is_recurring: boolean;
}[];

//팀 일정 추가
export interface addTeamCalendarEventRequest {
  team_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  is_private: boolean;
}
export interface addTeamCalendarEventResponse {
  event_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  is_private: boolean;
}

//팀 반복 일정 추가
export interface addTeamCalendarRecurringEventRequest {
  title: string;
  description?: string;
  first_start_time: string;
  first_end_time: string;
  is_private: boolean;
  rrule: string;
}
export interface addTeamCalendarRecurringEventResponse {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
}

//팀 일정 수정
export interface modifyTeamCalendarEventRequest {
  event_id: number;
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  is_private?: boolean;
}
export interface modifyTeamCalendarEventResponse {
  event_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
}

//반복 일정 단일 인스턴스 삭제
export interface deleteTeamCalendarRecurringOneEventRequest {
  original_start_time: string;
}
