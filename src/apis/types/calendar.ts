import { type CalendarEvent } from '@/types/calendar';

// API가 배열을 직접 반환하므로 타입을 배열로 변경
export type getCalendarEventsResponse = CalendarEvent[];
