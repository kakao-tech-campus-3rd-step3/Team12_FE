import { type CalendarEvent } from '@/types/calendar';
import { useState } from 'react';

// 로컬 날짜를 YYYY-MM-DD 형식으로 변환하는 헬퍼 함수
export const formatLocalDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }

  // 로컬 시간대를 유지하면서 YYYY-MM-DD 형식으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// FullCalendar의 종일 이벤트를 위해 종료 날짜에 하루를 더하는 헬퍼 함수
export const addDayToEndDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() + 1);
  return formatLocalDate(date);
};

const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: '팀미팅',
      start: formatLocalDate(new Date()),
      end: addDayToEndDate(formatLocalDate(new Date())),
      private: false,
    },
  ]);

  // 이벤트 추가
  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const endDate = event.end || event.start;
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
      // FullCalendar의 종일 이벤트는 종료날짜가 exclusive이므로 하루를 더해줌
      end: addDayToEndDate(typeof endDate === 'string' ? endDate : formatLocalDate(endDate)),
    };
    setEvents((prev) => [...prev, newEvent]);
    console.log(newEvent);
    return newEvent;
  };

  // 이벤트 삭제
  const removeEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // 이벤트 업데이트
  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    const processedUpdates = { ...updates };

    // 종료 날짜가 업데이트되는 경우 하루를 더해줌
    if (updates.end) {
      processedUpdates.end = addDayToEndDate(
        typeof updates.end === 'string' ? updates.end : formatLocalDate(updates.end),
      );
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              ...processedUpdates,
            }
          : e,
      ),
    );
  };

  // 이벤트 드래그 앤 드롭 처리
  const handleEventDrop = (eventId: string, newStart: Date, newEnd?: Date) => {
    const updates: Partial<CalendarEvent> = {
      start: formatLocalDate(newStart),
    };

    if (newEnd) {
      // 드래그 앤 드롭에서는 이미 FullCalendar가 올바른 날짜를 제공하므로 직접 사용
      updates.end = formatLocalDate(newEnd);
    }

    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, ...updates } : e)));
  };

  // 이벤트 리사이즈 처리
  const handleEventResize = (eventId: string, newStart: Date, newEnd?: Date) => {
    const updates: Partial<CalendarEvent> = {
      start: formatLocalDate(newStart),
    };

    if (newEnd) {
      // 리사이즈에서는 이미 FullCalendar가 올바른 날짜를 제공하므로 직접 사용
      updates.end = formatLocalDate(newEnd);
    }

    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, ...updates } : e)));
  };

  return {
    events,
    addEvent,
    removeEvent,
    updateEvent,
    handleEventDrop,
    handleEventResize,
  };
};

export default useEvents;
