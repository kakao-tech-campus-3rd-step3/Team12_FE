import { PERSONAL_CALENDAR_ENDPOINTS, TEAM_CALENDAR_ENDPOINTS, apiClient } from '@/apis';
import type {
  addCalendarEventRequest,
  addCalendarEventResponse,
  modifyCalendarEventRequest,
  modifyCalendarEventResponse,
} from '@/types/calendar';
import type { addTeamCalendarEventRequest, addTeamCalendarEventResponse } from '@/apis';

export const personalCalendarAPI = {
  getEvents: (params: { startAt: string; endAt: string }) => {
    return apiClient.get(PERSONAL_CALENDAR_ENDPOINTS.GET_EVENTS, {
      params,
    });
  },
  addEvent: (event: addCalendarEventRequest): Promise<addCalendarEventResponse> => {
    return apiClient.post(PERSONAL_CALENDAR_ENDPOINTS.ADD_EVENT, event);
  },
  modifyEvent: (event: modifyCalendarEventRequest): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(PERSONAL_CALENDAR_ENDPOINTS.MODIFY_EVENT, event);
  },
  deleteEvent: (eventId: number) => {
    return apiClient.delete(PERSONAL_CALENDAR_ENDPOINTS.DELETE_EVENT(eventId));
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
    teamEvent: modifyCalendarEventRequest,
  ): Promise<modifyCalendarEventResponse> => {
    return apiClient.patch(TEAM_CALENDAR_ENDPOINTS.MODIFY_EVENT, teamEvent);
  },
  deleteTeamEvent: (eventId: number) => {
    return apiClient.delete(TEAM_CALENDAR_ENDPOINTS.DELETE_EVENT(eventId));
  },
};
