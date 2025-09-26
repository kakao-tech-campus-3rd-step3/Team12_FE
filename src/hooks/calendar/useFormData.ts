/**
 * @description 폼 데이터 관리
 */

import { type CalendarEvent, type RepeatType } from '@/types/calendar';
import { useEffect, useState } from 'react';

// ISO 문자열 또는 Date를 YYYY-MM-DD로 변환
const toDateOnly = (dateLike: string | Date): string => {
  const d = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export interface FormData {
  title: string;
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
    startTime: '',
    endTime: '',
    private: false,
    allDay: false,
    repeat: 'none',
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (modalType === 'edit' && selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          startTime: toDateOnly(selectedEvent.start_time),
          endTime: toDateOnly(selectedEvent.end_time),
          private: selectedEvent.is_private ?? false,
          allDay: false,
          repeat: 'none',
          // startTime: new Date(selectedEvent.start_time).toTimeString().slice(0, 5),
          // endTime: new Date(selectedEvent.end_time).toTimeString().slice(0, 5),
        });
      } else if (modalType === 'add' && selectedDate) {
        setFormData({
          title: '',
          startTime: selectedDate,
          endTime: selectedDate,
          private: false,
          allDay: false,
          repeat: 'none',
        });
      } else {
        setFormData({
          title: '',
          startTime: toDateOnly(new Date()),
          endTime: toDateOnly(new Date()),
          private: false,
          allDay: false,
          repeat: 'none',
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
