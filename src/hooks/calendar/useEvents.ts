import { useCalendarStore } from '@/store/calendar';

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

const useEvents = (mode?: 'personal' | 'team', teamId?: number) => {
  const { events, addEvent, removeEvent, updateEvent, getEvents, getTodayEvents } =
    useCalendarStore();

  const teamOrPersonalOption = mode ? { mode, teamId } : undefined;

  const handleEventDrop = async (eventId: number, newStart: Date, newEnd?: Date) => {
    const updates = {
      event_id: eventId,
      start_time: toIsoLocal(newStart),
      ...(newEnd && { end_time: toIsoLocal(newEnd) }),
    };
    await updateEvent(updates, teamOrPersonalOption);
  };

  const handleEventResize = async (eventId: number, newStart: Date, newEnd?: Date) => {
    const updates = {
      event_id: eventId,
      start_time: toIsoLocal(newStart),
      ...(newEnd && { end_time: toIsoLocal(newEnd) }),
    };
    await updateEvent(updates, teamOrPersonalOption);
  };

  return {
    events,
    getEvents,
    getTodayEvents,
    addEvent,
    removeEvent,
    updateEvent,
    handleEventDrop,
    handleEventResize,
  };
};

export default useEvents;
