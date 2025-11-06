import { useCalendarStore } from '@/store/calendar';
import { useEffect } from 'react';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';

export const UpcomingScheduleList = () => {
  const { upcomingEvents, getUpcomingEvents } = useCalendarStore();

  useEffect(() => {
    void getUpcomingEvents();
  }, []);

  return (
    <div className="space-y-2">
      {upcomingEvents && upcomingEvents.length > 0 ? (
        upcomingEvents.map((event) => <UpcomingScheduleItem key={event.event_id} event={event} />)
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-sm text-gray-500">다가오는 일정이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
