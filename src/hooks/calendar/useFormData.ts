/**
 * @description 폼 데이터 관리
 */

import { formatLocalDate } from '@/hooks/calendar/useEvents';
import { type CalendarEvent } from '@/types/calendar';
import { useEffect, useState } from 'react';

interface FormData {
  title: string;
  start: string;
  private: boolean;
}

interface UseFormDataProps {
  isOpen: boolean;
  modalType: 'add' | 'edit' | 'delete';
  selectedEvent?: CalendarEvent;
  selectedDate?: string;
}

const useFormData = ({ isOpen, modalType, selectedEvent, selectedDate }: UseFormDataProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    start: '',
    private: false,
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (modalType === 'edit' && selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          start: formatLocalDate(selectedEvent.start),
          private: selectedEvent.private ?? false,
        });
      } else if (modalType === 'add' && selectedDate) {
        setFormData({
          title: '',
          start: selectedDate,
          private: false,
        });
      } else {
        setFormData({
          title: '',
          start: formatLocalDate(new Date()),
          private: false,
        });
      }
    }
  }, [isOpen, modalType, selectedEvent, selectedDate]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return {
    formData,
    updateFormData,
  };
};

export default useFormData;
