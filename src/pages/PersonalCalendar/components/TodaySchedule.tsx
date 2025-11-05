import { useCalendarStore } from '@/store/calendar/useCalendarStore';
import { getTimePart } from '@/utils/dateTimeUtils';
import { Paperclip } from 'lucide-react';
import { useEffect } from 'react';

const TodaySchedule = () => {
  const { todayEvents, getTodayEvents } = useCalendarStore();

  useEffect(() => {
    void getTodayEvents();
  }, [getTodayEvents]);

  useEffect(() => {
    console.log('todayEvents: ', todayEvents);
  }, [todayEvents]);

  return (
    <div className="px-3 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">오늘 일정</h3>
      <div className="space-y-3">
        {todayEvents?.map((events, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center p-3 bg-white rounded-lg border shadow-md border-mainBlue/70"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{events.title}</p>
              <p className="text-xs text-gray-600">
                {getTimePart(events.start_time)} - {getTimePart(events.end_time)}
              </p>
              {events.description && (
                <p className="flex gap-1 items-center text-xs text-gray-400">
                  <Paperclip className="w-3.5 h-3.5" />
                  {events.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {todayEvents?.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-sm text-gray-500">오늘 일정이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
