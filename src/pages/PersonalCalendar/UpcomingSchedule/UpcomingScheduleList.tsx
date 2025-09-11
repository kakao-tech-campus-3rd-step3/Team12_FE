import { upcomingSchedule } from '@/mockdata/schedule';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';

export const UpcomingScheduleList = () => {
  return (
    <div className="space-y-2">
      {upcomingSchedule.map((schedule) => (
        <UpcomingScheduleItem key={schedule.title} schedule={schedule} />
      ))}
    </div>
  );
};
