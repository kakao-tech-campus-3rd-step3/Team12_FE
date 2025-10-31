import { useCalendarStore } from '@/store/calendar';
import { useEffect } from 'react';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';
import type { CalendarEvent } from '@/types/calendar';

const sortByStartTime = (events: CalendarEvent[]) => {
  return [...events].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );
};

export const UpcomingScheduleList = () => {
  const { upcomingEvents, getUpcomingEvents } = useCalendarStore();

  useEffect(() => {
    void getUpcomingEvents();
  }, []);

  const sortedEvents = upcomingEvents ? sortByStartTime(upcomingEvents) : [];

  return (
    <div className="space-y-2">
      {sortedEvents && sortedEvents.length > 0 ? (
        sortedEvents.map((event) => <UpcomingScheduleItem key={event.event_id} event={event} />)
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-sm text-gray-500">다가오는 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
