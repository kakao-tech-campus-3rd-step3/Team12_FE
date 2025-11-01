import { personalCalendarAPI, teamCalendarAPI } from '@/apis';
import type { addCalendarEventRequest, modifyCalendarEventRequest } from '@/types/calendar';
import { type CalendarEvent } from '@/types/calendar';
import { create } from 'zustand';

interface CalendarState {
  events: CalendarEvent[] | null;
  todayEvents: CalendarEvent[] | null;
  upcomingEvents: CalendarEvent[] | null;
  isAuthenticated: boolean;
  getEvents: (teamOrPersonalOption?: {
    teamId?: number;
    mode?: 'team' | 'personal';
  }) => Promise<CalendarEvent[] | null>;

  getTodayEvents: () => Promise<CalendarEvent[] | null>;
  addEvent: (
    event: addCalendarEventRequest,
    teamOrPersonalOption?: { teamId?: number; mode?: 'personal' | 'team' },
  ) => Promise<void>;
  removeEvent: (
    eventId: number,
    teamOrPersonalOption?: { teamId?: number; mode?: 'personal' | 'team' },
  ) => Promise<void>;
  updateEvent: (
    updates: modifyCalendarEventRequest,
    teamOrPersonalOption?: { teamId?: number; mode?: 'personal' | 'team' },
  ) => Promise<void>;
  getUpcomingEvents: () => Promise<CalendarEvent[] | null>;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Test Data
  events: [],
  todayEvents: [],
  upcomingEvents: [],
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
  getTodayEvents: async (): Promise<CalendarEvent[] | null> => {
    try {
      const response = await personalCalendarAPI.getTodayEvents();
      const fetchedEvents = response.data ?? null;
      if (fetchedEvents) {
        set({ todayEvents: fetchedEvents });
      } else {
        set({ todayEvents: [] });
      }
      return fetchedEvents;
    } catch (error) {
      console.error('Failed to fetch today events', error);
      return null;
    }
  },
  addEvent: async (event, teamOrPersonalOption) => {
    try {
      const mode = teamOrPersonalOption?.mode ?? 'personal';

      // API 호출
      if (mode === 'team') {
        await teamCalendarAPI.addTeamEvent(event as any);
      } else {
        await personalCalendarAPI.addEvent(event);
      }

      // 전체 일정 다시 가져오기
      await useCalendarStore.getState().getEvents(teamOrPersonalOption);

      // 오늘 일정 갱신
      const todayResponse = await personalCalendarAPI.getTodayEvents();
      set({ todayEvents: todayResponse.data ?? [] });
    } catch (error) {
      console.error('Failed to add event', error);
      throw error;
    }
  },
  removeEvent: async (eventId, teamOrPersonalOption) => {
    try {
      const mode = teamOrPersonalOption?.mode ?? 'personal';

      // API 호출
      if (mode === 'team') {
        await teamCalendarAPI.deleteTeamEvent(eventId);
      } else {
        await personalCalendarAPI.deleteEvent(eventId);
      }

      // 전체 일정 다시 가져오기
      await useCalendarStore.getState().getEvents(teamOrPersonalOption);

      // 오늘 일정 갱신
      const todayResponse = await personalCalendarAPI.getTodayEvents();
      set({ todayEvents: todayResponse.data ?? [] });
    } catch (error) {
      console.error('Failed to remove event', error);
      throw error;
    }
  },
  updateEvent: async (updates, teamOrPersonalOption) => {
    try {
      const mode = teamOrPersonalOption?.mode ?? 'personal';

      console.log('updateEvent called with:', { updates, mode, teamOrPersonalOption });

      // API 호출
      if (mode === 'team') {
        await teamCalendarAPI.modifyTeamEvent(updates as any);
      } else {
        await personalCalendarAPI.modifyEvent(updates);
      }

      // 전체 일정 다시 가져오기
      await useCalendarStore.getState().getEvents(teamOrPersonalOption);

      // 오늘 일정 갱신
      const todayResponse = await personalCalendarAPI.getTodayEvents();
      set({ todayEvents: todayResponse.data ?? [] });
    } catch (error: any) {
      console.error('Failed to update event', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        updates,
      });
      throw error;
    }
  },
     getUpcomingEvents: async (): Promise<CalendarEvent[] | null> => {
    try {
      const response = await personalCalendarAPI.getUpcomingEvents();
      set({ upcomingEvents: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch upcoming events:', error);
      set({ upcomingEvents: [] });
      return null;
    }
  },
 
}));
