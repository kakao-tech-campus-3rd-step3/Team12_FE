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

const useEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: '팀미팅', start: formatLocalDate(new Date()), private: false },
  ]);

  // 이벤트 추가
  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: crypto.randomUUID(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  // 이벤트 삭제
  const removeEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // 이벤트 업데이트
  const updateEvent = (eventId: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              ...updates,
            }
          : e,
      ),
    );
  };

  // 이벤트 드래그 앤 드롭 처리
  const handleEventDrop = (eventId: string, newStart: Date) => {
    updateEvent(eventId, {
      start: newStart,
    });
  };

  // 이벤트 리사이즈 처리
  const handleEventResize = (eventId: string, newStart: Date) => {
    updateEvent(eventId, {
      start: newStart,
    });
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
