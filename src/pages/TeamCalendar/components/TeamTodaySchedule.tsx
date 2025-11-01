import { Paperclip } from 'lucide-react';
import type { TeamSchedule } from '@/apis';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';
import { ScheduleCard } from '@/components/molecules/ScheduleCard';

interface TeamTodayScheduleItemProps {
  schedule: TeamSchedule;
}

export const TeamTodayScheduleItem = ({ schedule }: TeamTodayScheduleItemProps) => {
  const date = formatDateWithWeekday(schedule.start_time);
  const startTime = getTimePart(schedule.start_time);
  const endTime = getTimePart(schedule.end_time);

  return (
    <ScheduleCard
      title={schedule.title}
      dateTime={`${date} ${startTime}-${endTime}`}
      description={schedule.description || undefined}
      descriptionIcon={schedule.description ? <Paperclip className="w-3.5 h-3.5" /> : undefined}
    />
  );
};
