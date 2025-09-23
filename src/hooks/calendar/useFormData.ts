/**
 * @description 폼 데이터 관리
 */

import { formatLocalDate } from '@/hooks/calendar/useEvents';
import { type CalendarEvent, type RepeatType } from '@/types/calendar';
import { useEffect, useState } from 'react';

// FullCalendar에서 받은 종료 날짜에서 하루를 빼는 헬퍼 함수 (표시용)
const subtractDayFromEndDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface FormData {
  title: string;
  start: string;
  end: string;
  private: boolean;
  allDay: boolean;
  repeat: RepeatType;
  startTime?: string;
  endTime?: string;
}

interface UseFormDataProps {
  isOpen: boolean;
  modalType: 'add' | 'edit' | 'delete';
  selectedEvent?: CalendarEvent;
  selectedDate?: string;
}

const useFormData = ({ isOpen, modalType, selectedEvent, selectedDate }: UseFormDataProps) => {
  const [showTime, setShowTime] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    start: '',
    end: '',
    private: false,
    allDay: false,
    repeat: 'none',
    startTime: '09:00',
    endTime: '10:00',
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (modalType === 'edit' && selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          start: formatLocalDate(selectedEvent.start),
          // 편집 모드에서는 종료 날짜에서 하루를 빼서 사용자에게 올바른 날짜를 보여줌
          end: subtractDayFromEndDate(formatLocalDate(selectedEvent.end)),
          private: selectedEvent.private ?? false,
          allDay: selectedEvent.allDay ?? false,
          repeat: selectedEvent.repeat ?? 'none',
          startTime: selectedEvent.time?.[0] ?? '09:00',
          endTime: selectedEvent.time?.[1] ?? '10:00',
        });
      } else if (modalType === 'add' && selectedDate) {
        setFormData({
          title: '',
          start: selectedDate,
          end: selectedDate,
          private: false,
          allDay: false,
          repeat: 'none',
          startTime: '09:00',
          endTime: '10:00',
        });
      } else {
        setFormData({
          title: '',
          start: formatLocalDate(new Date()),
          end: formatLocalDate(new Date()),
          private: false,
          allDay: false,
          repeat: 'none',
          startTime: '09:00',
          endTime: '10:00',
        });
      }
    }
  }, [isOpen, modalType, selectedEvent, selectedDate]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };
  const toggleShowTime = () => {
    setShowTime(!showTime);
  };
  return {
    formData,
    showTime,
    updateFormData,
    toggleShowTime,
  };
};

export default useFormData;
