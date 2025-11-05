import { useState } from 'react';
import type { FormData } from '@/hooks/calendar/useFormData';
import type { CalendarEvent } from '@/types/calendar';

interface UseEventFormProps {
  onSave: (event: Omit<CalendarEvent, 'event_id'>, formData: FormData) => void;
  onClose: () => void;
}

type ErrorType = 'title' | 'startTime' | 'endTime';

const useEventForm = ({ onSave, onClose }: UseEventFormProps) => {
  const [error, setError] = useState<ErrorType | null>(null);
  const handleSubmit = (formData: FormData) => {
    if (!formData.title.trim()) {
      setError('title');
      return;
    }

    // 시간이 설정되지 않은 경우 기본값 설정
    let startTime = formData.startTime || '';
    let endTime = formData.endTime || '';

    // 시간 부분이 없는 경우 (날짜만 있는 경우) 기본 시간 추가
    if (startTime && !startTime.includes('T')) {
      startTime = `${startTime}T09:00:00`;
    }
    if (endTime && !endTime.includes('T')) {
      endTime = `${endTime}T10:00:00`;
    }

    const eventData: Omit<CalendarEvent, 'event_id'> = {
      title: formData.title,
      description: formData.description || '',
      start_time: startTime,
      end_time: endTime,
    };

    onSave(eventData, formData);
    onClose();
  };

  const validateForm = (formData: Pick<FormData, 'title' | 'startTime' | 'endTime'>) => {
    if (!formData.title?.trim()) {
      setError('title');
      return false;
    }

    if (!formData.startTime) {
      setError('startTime');
      return false;
    }

    if (!formData.endTime) {
      setError('endTime');
      return false;
    }

    return true;
  };

  return {
    handleSubmit,
    validateForm,
    error,
    setError,
  };
};

export default useEventForm;
