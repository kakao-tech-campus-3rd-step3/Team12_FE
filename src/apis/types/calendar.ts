import type { CalendarEvent } from '@/types/calendar';

export type Lecture = {
  lectureId: number;
  eventId: number;
  name: string;
  professor?: string;
  credit?: number;
  startDate: string;
  endDate: string;
};

// API가 배열을 직접 반환하므로 타입을 배열로 변경
export type getCalendarEventsResponse = CalendarEvent[];

export type getLecturesResponse = Lecture[];

//팀 일정 조회
export type getTeamCalendarEventsResponse = {
  event_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  is_recurring: boolean;
}[];

//팀 일정 추가
export interface addTeamCalendarEventRequest {
  team_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
}
export interface addTeamCalendarEventResponse {
  event_id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
}

//팀 반복 일정 추가
export interface addTeamCalendarRecurringEventRequest {
  title: string;
  description?: string;
  first_start_time: string;
  first_end_time: string;
  rrule: string;
}
export interface addTeamCalendarRecurringEventResponse {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
}

interface CalendarEventUpdateBase {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
}

//팀 일정 수정
export interface modifyTeamCalendarEventRequest extends CalendarEventUpdateBase {
  event_id: number;
}
//팀 반복 일정 전체 수정
export interface modifyTeamCalendarRecurringAllEventsRequest extends CalendarEventUpdateBase {
  rrule?: string;
}
//팀 반복 일정 단일 인스턴스 수정
export interface modifyTeamCalendarRecurringOneEventRequest extends CalendarEventUpdateBase {
  original_start_time: string;
}

//팀 반복 일정 단일 인스턴스 삭제
export interface deleteTeamCalendarRecurringOneEventRequest {
  original_start_time: string;
}
