/**
 * @description 폼 데이터 관리
 */

import { type CalendarEvent, type RepeatType } from '@/types/calendar';
import { toDateOnly } from '@/utils/dateTimeUtils';
import { useEffect, useState } from 'react';

export interface FormData {
  title: string;
  description: string;
  private: boolean;
  allDay: boolean;
  repeat: RepeatType;
  startTime?: string;
  endTime?: string;
  repeatEndType?: 'endcount' | 'enddate';
  repeatEndDate?: string;
  repeatCount: number;
  repeatWeekDays?: string[];
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
    description: '',
    startTime: '',
    endTime: '',
    private: false,
    allDay: false,
    repeat: 'none',
    repeatEndType: undefined,
    repeatEndDate: '',
    repeatCount: 1,
    repeatWeekDays: [],
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (modalType === 'edit' && selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          description: selectedEvent.description,
          startTime: selectedEvent.start_time,
          endTime: selectedEvent.end_time,
          private: selectedEvent.is_private ?? false,
          allDay: false,
          repeat: 'none',
          repeatEndType: undefined,
          repeatEndDate: '',
          repeatCount: 1,
          repeatWeekDays: [],
          // startTime: new Date(selectedEvent.start_time).toTimeString().slice(0, 5),
          // endTime: new Date(selectedEvent.end_time).toTimeString().slice(0, 5),
        });
      } else if (modalType === 'add' && selectedDate) {
        setFormData({
          title: '',
          description: '',
          startTime: selectedDate,
          endTime: selectedDate,
          private: false,
          allDay: false,
          repeat: 'none',
          repeatEndType: undefined,
          repeatEndDate: '',
          repeatCount: 1,
          repeatWeekDays: [],
        });
      } else {
        setFormData({
          title: '',
          description: '',
          startTime: toDateOnly(new Date()),
          endTime: toDateOnly(new Date()),
          private: false,
          allDay: false,
          repeat: 'none',
          repeatEndType: undefined,
          repeatEndDate: '',
          repeatCount: 1,
          repeatWeekDays: [],
        });
      }
    }
  }, [isOpen, modalType, selectedEvent?.event_id, selectedDate]);

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
