import type { CalendarEvent } from '@/types/calendar';
import { formatDateTimeShort } from '@/utils/dateTimeUtils';

export const UpcomingScheduleItem = ({ event }: { event: CalendarEvent }) => {
  const today = new Date();
  const targetDate = new Date(event.start_time);
  const diffTime = Math.abs(targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div className="flex flex-row justify-between items-center p-2 bg-white rounded-lg border border-mainBlue/40">
      <div>
        <p className="text-sm font-medium text-[#1C398E]">{event.title}</p>
        <p className="text-xs text-mainBlue">{formatDateTimeShort(event.start_time)}</p>
      </div>
      {diffDays < 2 ? (
        <div className="flex gap-1 items-center p-1 rounded-lg bg-red-100/80">
          <p className="text-xs text-red-500">D-{diffDays}</p>
        </div>
      ) : (
        <div className="flex gap-1 items-center p-1 rounded-lg bg-gray-100/80">
          <p className="text-xs text-gray-500">D-{diffDays}</p>
        </div>
      )}
    </div>
  );
};
