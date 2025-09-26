export type ModalType = 'add' | 'edit' | 'delete';

export type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

export type CalendarEvent = {
  event_id: number;
  title: string;
  description: string;
  start_time: string; // ISO string e.g. 2025-09-18T10:00:00
  end_time: string; // ISO string e.g. 2025-09-18T11:00:00
  is_private: boolean;
};

export type getCalendarEventsResponse = {
  events: CalendarEvent[];
};

export type addCalendarEventRequest = {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
};
export type addCalendarEventResponse = {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
};

export type modifyCalendarEventRequest = {
  event_id: number;
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  is_private?: boolean;
};

export type modifyCalendarEventResponse = {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
};

export type deleteCalendarEventResponse = {
  event_id: number;
};
