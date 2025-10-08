import { type CalendarEvent } from '@/types/calendar';

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

//팀 일정 수정
export interface modifyTeamCalendarEventRequest {
  team_id: number;
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  is_private?: boolean;
}
export interface modifyTeamCalendarEventResponse {
  event_id: number;
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  is_private?: boolean;
}
