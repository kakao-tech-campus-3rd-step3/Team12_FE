import { PERSONAL_CALENDAR_ENDPOINTS, TEAM_CALENDAR_ENDPOINTS, apiClient } from '@/apis';
import type {
  addTeamCalendarEventRequest,
  addTeamCalendarEventResponse,
  addTeamCalendarRecurringEventRequest,
  deleteTeamCalendarRecurringOneEventRequest,
  modifyTeamCalendarEventRequest,
  modifyTeamCalendarRecurringAllEventsRequest,
  modifyTeamCalendarRecurringOneEventRequest,
} from '@/apis/types/calendar';
import type {
  addCalendarEventRequest,
  addCalendarEventResponse,
  addCalendarRecurringEventRequest,
  deleteCalendarRecurringOneEventRequest,
  getCalendarEventsResponse,
  modifyCalendarEventRequest,
  modifyCalendarEventResponse,
  modifyCalendarRecurringAllEventRequest,
  modifyCalendarRecurringAllEventResponse,
  modifyCalendarRecurringOneEventRequest,
  modifyCalendarRecurringOneEventResponse,
} from '@/types/calendar';

export const personalCalendarAPI = {
  getEvents: (params: { startAt: string; endAt: string }) => {
    return apiClient.get(PERSONAL_CALENDAR_ENDPOINTS.GET_EVENTS, {
      params,
    });
  },
  getTodayEvents: (): Promise<getCalendarEventsResponse> => {
    return apiClient.get(PERSONAL_CALENDAR_ENDPOINTS.GET_TODAY_EVENTS);
  },
  getUpcomingEvents: (): Promise<getCalendarEventsResponse> => {
    return apiClient.get(PERSONAL_CALENDAR_ENDPOINTS.GET_UPCOMMING_EVENTS);
  },
  addEvent: (event: addCalendarEventRequest): Promise<addCalendarEventResponse> => {
    return apiClient.post(PERSONAL_CALENDAR_ENDPOINTS.ADD_EVENT, event);
  },
  modifyEvent: (
    eventId: number,
    event: modifyCalendarEventRequest,
  ): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(PERSONAL_CALENDAR_ENDPOINTS.MODIFY_EVENT(eventId), event);
  },
  deleteEvent: (eventId: number) => {
    return apiClient.delete(PERSONAL_CALENDAR_ENDPOINTS.DELETE_EVENT(eventId));
  },

  // 반복 일정
  addRecurringEvent: (
    event: addCalendarRecurringEventRequest,
  ): Promise<addCalendarEventResponse> => {
    return apiClient.post(PERSONAL_CALENDAR_ENDPOINTS.ADD_RECURRING_EVENT, event);
  },
  modifyRecurringAllEvent: (
    eventId: number,
    event: modifyCalendarRecurringAllEventRequest,
  ): Promise<modifyCalendarRecurringAllEventResponse> => {
    return apiClient.patch(PERSONAL_CALENDAR_ENDPOINTS.MODIFY_RECURRING_ALL_EVENT(eventId), event);
  },
  modifyRecurringOneEvent: (
    eventId: number,
    event: modifyCalendarRecurringOneEventRequest,
  ): Promise<modifyCalendarRecurringOneEventResponse> => {
    return apiClient.patch(PERSONAL_CALENDAR_ENDPOINTS.MODIFY_RECURRING_ONE_EVENT(eventId), event);
  },
  deleteRecurringAllEvent: (eventId: number) => {
    return apiClient.delete(PERSONAL_CALENDAR_ENDPOINTS.DELETE_RECURRING_ALL_EVENT(eventId));
  },
  deleteRecurringOneEvent: (eventId: number, event: deleteCalendarRecurringOneEventRequest) => {
    return apiClient.delete(PERSONAL_CALENDAR_ENDPOINTS.DELETE_RECURRING_ONE_EVENT(eventId), {
      data: event,
    });
  },
};

export const teamCalendarAPI = {
  getTeamEvents(teamId: number, params: { startAt: string; endAt: string }) {
    return apiClient.get(TEAM_CALENDAR_ENDPOINTS.GET_EVENTS(teamId), { params });
  },
  addTeamEvent: (teamEvent: addTeamCalendarEventRequest): Promise<addTeamCalendarEventResponse> => {
    return apiClient.post(TEAM_CALENDAR_ENDPOINTS.ADD_EVENT, teamEvent);
  },
  modifyTeamEvent: (
    eventId: number,
    teamEvent: modifyTeamCalendarEventRequest,
  ): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(TEAM_CALENDAR_ENDPOINTS.MODIFY_EVENT(eventId), teamEvent);
  },
  deleteTeamEvent: (eventId: number) => {
    return apiClient.delete(TEAM_CALENDAR_ENDPOINTS.DELETE_EVENT(eventId));
  },

  //반복 일정 추가
  addTeamRecurringEvent: (
    teamId: number,
    teamEvent: addTeamCalendarRecurringEventRequest,
  ): Promise<addTeamCalendarEventResponse> => {
    return apiClient.post(TEAM_CALENDAR_ENDPOINTS.ADD_RECURRING_EVENT(teamId), teamEvent);
  },
  //반복 일정 전체 수정
  modifyTeamRecurringAllEvents: (
    eventId: number,
    teamEvent: modifyTeamCalendarRecurringAllEventsRequest,
  ): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(TEAM_CALENDAR_ENDPOINTS.MODIFY_RECURRING_ALL_EVENT(eventId), teamEvent);
  },
  modifyTeamRecurringOneEvent: (
    eventId: number,
    teamEvent: modifyTeamCalendarRecurringOneEventRequest,
  ): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(TEAM_CALENDAR_ENDPOINTS.MODIFY_RECURRING_ONE_EVENT(eventId), teamEvent);
  },
  //반복 일정 삭제
  deleteTeamRecurringAllEvents: (eventId: number) => {
    return apiClient.delete(TEAM_CALENDAR_ENDPOINTS.DELETE_RECURRING_ALL_EVENT(eventId));
  },
  deleteTeamRecurringOneEvent: (
    eventId: number,
    teamEvent: deleteTeamCalendarRecurringOneEventRequest,
  ) => {
    return apiClient.delete(TEAM_CALENDAR_ENDPOINTS.DELETE_RECURRING_ONE_EVENT(eventId), {
      data: teamEvent,
    });
  },
};
