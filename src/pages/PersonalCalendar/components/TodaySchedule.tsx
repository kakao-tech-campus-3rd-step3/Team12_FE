import { useCalendarStore } from '@/store/calendar/useCalendarStore';
import { getTimePart } from '@/utils/dateTimeUtils';
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
        {todayEvents &&
          todayEvents.map((events, index) => (
            <div key={index} className="flex flex-row p-2 pl-0 bg-white rounded-lg">
              <div className="flex justify-between items-center mr-4 mb-1">
                <span className="text-sm font-medium text-mainBlue">
                  {getTimePart(events.start_time)}
                </span>
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-[#1C398E]">{events.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
