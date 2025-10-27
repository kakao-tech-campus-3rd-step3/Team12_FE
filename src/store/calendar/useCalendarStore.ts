import { personalCalendarAPI, teamCalendarAPI } from '@/apis';
import { type CalendarEvent } from '@/types/calendar';
import { create } from 'zustand';

interface CalendarState {
  events: CalendarEvent[] | null;
  isAuthenticated: boolean;
  getEvents: (teamOrPersonalOption?: {
    teamId?: number;
    mode?: 'team' | 'personal';
  }) => Promise<CalendarEvent[] | null>;
  addEvent: (event: Omit<CalendarEvent, 'event_id'>) => void;
  removeEvent: (eventId: number) => void;
  updateEvent: (eventId: number, updates: Partial<CalendarEvent>) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Test Data
  events: [],
  isAuthenticated: false,
  getEvents: async (teamOrPersonalOption) => {
    try {
      // 오늘 기준 저번달 1일부터 다음달 마지막 일까지 범위 계산
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 2, 0); // 다음달 마지막 일

      const toIsoString = (d: Date) => {
        return d.toISOString();
      };

      const params = {
        startAt: toIsoString(start),
        endAt: toIsoString(end),
      };

      //팀 id 유무에 따라 분기 + 콘솔 메세지
      const response =
        teamOrPersonalOption?.mode === 'team'
          ? teamOrPersonalOption.teamId
            ? await teamCalendarAPI.getTeamEvents(teamOrPersonalOption.teamId, params)
            : (() => {
                throw new Error('teamId가 없습니다');
              })()
          : await personalCalendarAPI.getEvents(params);

      // API 응답이 배열을 직접 반환하므로 response.data를 사용
      const fetchedEvents = response.data ?? null;
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
