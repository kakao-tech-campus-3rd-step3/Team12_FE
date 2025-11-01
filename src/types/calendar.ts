export type ModalType =
  | 'add'
  | 'edit'
  | 'recurringAction'
  | 'editRecurring'
  | 'editRecurringOne'
  | 'editRecurringAll'
  | 'delete'
  | 'deleteRecurring';

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

export type CalendarEvent = {
  event_id: number;
  title: string;
  description: string;
  start_time: string; // ISO string e.g. 2025-09-18T10:00:00
  end_time: string; // ISO string e.g. 2025-09-18T11:00:00
  is_private: boolean;
  is_recurring?: boolean;
};

export type getCalendarEventsResponse = {
  data: CalendarEvent[];
};

// 공통 베이스 Response 타입
export type BaseCalendarEventResponse = {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
};

export type CalendarEventResponse = BaseCalendarEventResponse & {
  is_recurring?: boolean;
};

// Request 타입
export type addCalendarEventRequest = {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
};
export type addCalendarEventResponse = BaseCalendarEventResponse;

export type addCalendarRecurringEventRequest = {
  title: string;
  description: string;
  first_start_time: string;
  first_end_time: string;
  is_private: boolean;
  rrule: string;
};
export type addCalendarRecurringEventResponse = BaseCalendarEventResponse;

export type modifyCalendarEventRequest = {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  is_private?: boolean;
};
export type modifyCalendarEventResponse = CalendarEventResponse;

export type modifyCalendarRecurringAllEventRequest = {
  title: string;
  start_time: string;
  end_time: string;
};
export type modifyCalendarRecurringAllEventResponse = CalendarEventResponse;

export type modifyCalendarRecurringOneEventRequest = {
  original_start_time: string;
  title: string;
};
export type modifyCalendarRecurringOneEventResponse = CalendarEventResponse;

export type deleteCalendarEventResponse = {
  event_id: number;
};

export type deleteCalendarRecurringOneEventRequest = {
  original_start_time: string;
};
