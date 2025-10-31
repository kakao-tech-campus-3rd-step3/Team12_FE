import { ScheduleCard } from '@/components/molecules/ScheduleCard';
import type { CalendarEvent } from '@/types/calendar';
import { formatDateTimeShort } from '@/utils/dateTimeUtils';
import { Paperclip } from 'lucide-react';

export const UpcomingScheduleItem = ({ event }: { event: CalendarEvent }) => {
  const today = new Date();
  const targetDate = new Date(event.start_time);
  const diffTime = Math.abs(targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <ScheduleCard
      title={event.title}
      dateTime={formatDateTimeShort(event.start_time)}
      description={event.description}
      descriptionIcon={event.description ? <Paperclip className="w-3.5 h-3.5" /> : undefined}
      dDay={diffDays}
    />
  );
};
