import { ScheduleCard } from '@/components/molecules/ScheduleCard';
import type { CalendarEvent } from '@/types/calendar';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';
import { Paperclip } from 'lucide-react';

export const UpcomingScheduleItem = ({ event }: { event: CalendarEvent }) => {
  const date = formatDateWithWeekday(event.start_time);
  const startTime = getTimePart(event.start_time);
  const endTime = getTimePart(event.end_time);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(event.start_time);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <ScheduleCard
      title={event.title}
      dateTime={`${date} ${startTime}-${endTime}`}
      description={event.description || undefined}
      descriptionIcon={event.description ? <Paperclip className="w-3.5 h-3.5" /> : undefined}
      dDay={diffDays}
    />
  );
};
