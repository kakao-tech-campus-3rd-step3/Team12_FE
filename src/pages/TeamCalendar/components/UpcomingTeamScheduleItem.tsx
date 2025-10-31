import { Paperclip } from 'lucide-react';
import type { TeamUpcomingSchedule } from '@/apis';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';
import { ScheduleCard } from '@/components/molecules/ScheduleCard';

interface UpcomingTeamScheduleItemProps {
  schedule: TeamUpcomingSchedule;
  showDDay?: boolean;
}

export const UpcomingTeamScheduleItem = ({
  schedule,
  showDDay = false,
}: UpcomingTeamScheduleItemProps) => {
  const date = formatDateWithWeekday(schedule.start_time);
  const startTime = getTimePart(schedule.start_time);
  const endTime = getTimePart(schedule.end_time);

  // D-day 계산
  const calculateDDay = (startTime: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(startTime);
    targetDate.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dDay = showDDay ? calculateDDay(schedule.start_time) : undefined;

  return (
    <ScheduleCard
      title={schedule.title}
      dateTime={`${date} ${startTime}-${endTime}`}
      description={schedule.description || undefined}
      descriptionIcon={schedule.description ? <Paperclip className="w-3.5 h-3.5" /> : undefined}
      dDay={dDay}
    />
  );
};
