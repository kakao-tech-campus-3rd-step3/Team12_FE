import { apiClient } from '@/apis/client/apiClients';
import { CALENDAR_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  CalendarEvent,
  addCalendarEventRequest,
  addCalendarEventResponse,
} from '@/types/calendar';

export const calendarAPI = {
  getEvents: (params: { startAt: string; endAt: string }) => {
    return apiClient.get(
      CALENDAR_ENDPOINTS.GET_EVENTS.replace(':startAt', params.startAt).replace(
        ':endAt',
        params.endAt,
      ),
      {
        params,
      },
    );
  },
  addEvent: (event: addCalendarEventRequest): Promise<addCalendarEventResponse> => {
    console.log('event:', event);
    return apiClient.post(CALENDAR_ENDPOINTS.ADD_EVENT, event);
  },
  modifyEvent: (event: CalendarEvent) => {
    return apiClient.patch(CALENDAR_ENDPOINTS.MODIFY_EVENT, event);
  },
  deleteEvent: (eventId: number) => {
    return apiClient.delete(
      CALENDAR_ENDPOINTS.DELETE_EVENT.replace(':eventId', eventId.toString()),
    );
  },
};
