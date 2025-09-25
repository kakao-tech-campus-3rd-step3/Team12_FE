import { type CalendarEvent } from '@/types/calendar';
import { create } from 'zustand';

interface CalendarState {
  events: CalendarEvent[] | null;
  isAuthenticated: boolean;
  getEvents: () => CalendarEvent[] | null;
  addEvent: (event: Omit<CalendarEvent, 'event_id'>) => void;
  removeEvent: (eventId: number) => void;
  updateEvent: (eventId: number, updates: Partial<CalendarEvent>) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  // Test Data
  events: [
    {
      event_id: 1,
      title: '팀미팅',
      description: '주간 팀 회의',
      start_time: '2025-09-25T10:00:00',
      end_time: '2025-09-25T11:00:00',
      is_private: false,
    },
  ],
  isAuthenticated: false,
  getEvents: () => get().events,
  addEvent: (event) =>
    set((state) => ({
      events: [...(state.events || []), { ...event, event_id: Date.now() }],
    })),
  removeEvent: (eventId) =>
    set((state) => ({ events: state.events?.filter((event) => event.event_id !== eventId) || [] })),
  updateEvent: (eventId, updates) =>
    set((state) => ({
      events: state.events?.map((e) => (e.event_id === eventId ? { ...e, ...updates } : e)) || [],
    })),
}));
