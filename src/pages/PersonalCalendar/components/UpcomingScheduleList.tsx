import { personalCalendarAPI } from '@/apis';
import type { CalendarEvent } from '@/types/calendar';
import { useEffect, useState } from 'react';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';

export const UpcomingScheduleList = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await personalCalendarAPI.getUpcomingEvents();
      setUpcomingEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch upcoming events:', error);
      setUpcomingEvents([]);
    }
  };
  console.log('다가오는 일정: ', upcomingEvents);

  useEffect(() => {
    void fetchUpcomingEvents();
  }, []);

  return (
    <div className="space-y-2">
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => <UpcomingScheduleItem key={event.event_id} event={event} />)
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-sm text-gray-500">다가오는 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
