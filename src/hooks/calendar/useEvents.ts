import { useCalendarStore } from '@/store/calendar';
import { type CalendarEvent } from '@/types/calendar';

const toIsoLocal = (date: Date | string): string => {
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = '00';
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const useEvents = () => {
  const { events, addEvent, removeEvent, updateEvent, getEvents } = useCalendarStore();

  const handleEventDrop = (eventId: number, newStart: Date, newEnd?: Date) => {
    const updates: Partial<CalendarEvent> = {
      start_time: toIsoLocal(newStart),
    };
    if (newEnd) {
      updates.end_time = toIsoLocal(newEnd);
    }
    updateEvent(eventId, updates);
  };

  const handleEventResize = (eventId: number, newStart: Date, newEnd?: Date) => {
    const updates: Partial<CalendarEvent> = {
      start_time: toIsoLocal(newStart),
    };
    if (newEnd) {
      updates.end_time = toIsoLocal(newEnd);
    }
    updateEvent(eventId, updates);
  };

  return {
    events,
    getEvents,
    addEvent,
    removeEvent,
    updateEvent,
    handleEventDrop,
    handleEventResize,
  };
};

export default useEvents;
