import { UpcomingTeamScheduleItem } from '@/pages/TeamCalendar/components/UpcomingTeamScheduleItem';
import { upcomingTeamSchedule } from '@/mockdata/scheduleData';

export const UpcomingTeamScheduleList = () => {
  return (
    <div className="space-y-2">
      {upcomingTeamSchedule.map((schedule) => (
        <UpcomingTeamScheduleItem key={schedule.title} schedule={schedule} />
      ))}
    </div>
  );
};
