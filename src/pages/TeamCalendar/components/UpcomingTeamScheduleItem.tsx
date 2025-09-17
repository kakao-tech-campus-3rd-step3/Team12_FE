import { upcomingTeamSchedule } from '@/mockdata/scheduleData';
import { MapPin } from 'lucide-react';

export const UpcomingTeamScheduleItem = ({
  schedule,
}: {
  schedule: (typeof upcomingTeamSchedule)[0];
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-3 bg-white rounded-lg border border-mainBlue/40">
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#1C398E]">{schedule.title}</p>
        <p className="text-xs text-mainBlue">
          {schedule.date} {schedule.startTime}-{schedule.endTime}
        </p>
        <p className="flex gap-1 items-center text-xs text-mainBlue">
          <MapPin className="w-4 h-4" />
          {schedule.location}
        </p>
      </div>
    </div>
  );
};
