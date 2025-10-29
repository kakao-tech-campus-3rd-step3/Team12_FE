import { Paperclip } from 'lucide-react';
import type { TeamUpcomingSchedule } from '@/apis';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';

export const UpcomingTeamScheduleItem = ({ schedule }: { schedule: TeamUpcomingSchedule }) => {
  const date = formatDateWithWeekday(schedule.start_time);
  const startTime = getTimePart(schedule.start_time);
  const endTime = getTimePart(schedule.end_time);

  return (
    <div className="flex flex-row justify-between items-center p-3 bg-white rounded-lg border border-mainBlue/70 shadow-md">
      <div className="space-y-1">
        <p className="text-sm font-medium">{schedule.title}</p>
        <p className="text-xs text-gray-600">
          {date} {startTime}-{endTime}
        </p>
        {schedule.description && (
          <p className="flex gap-1 items-center text-xs text-gray-400">
            <Paperclip className="w-3.5 h-3.5" />
            {schedule.description}
          </p>
        )}
      </div>
    </div>
  );
};
