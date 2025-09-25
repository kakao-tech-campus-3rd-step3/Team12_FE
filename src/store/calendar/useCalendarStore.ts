import { calendarAPI } from '@/apis';
import { type CalendarEvent } from '@/types/calendar';
import { create } from 'zustand';

interface CalendarState {
  events: CalendarEvent[] | null;
  isAuthenticated: boolean;
  getEvents: () => Promise<CalendarEvent[] | null>;
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
  getEvents: async () => {
    try {
      // 오늘 기준 -1개월 ~ +1개월 범위 계산
      const now = new Date();
      const start = new Date(now);
      start.setMonth(start.getMonth() - 1);
      const end = new Date(now);
      end.setMonth(end.getMonth() + 1);

      const toIsoLocal = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const response = await calendarAPI.getEvents({
        startAt: `${toIsoLocal(start)}`,
        endAt: `${toIsoLocal(end)}`,
      });
      const fetchedEvents = response.data?.events ?? null;
      if (fetchedEvents) {
        set({ events: fetchedEvents });
      } else {
        set({ events: [] });
      }
      console.log('Fetched events:', fetchedEvents);
      return fetchedEvents;
    } catch (error) {
      // 자세한 에러 디버깅용 로그
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      const status = err?.response?.status;
      const data = err?.response?.data;
      console.error('Failed to fetch events', { status, data, error: err });
      return null;
    }
  },
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
