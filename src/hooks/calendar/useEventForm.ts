import { type CalendarEvent } from '@/types/calendar';

interface UseEventFormProps {
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onClose: () => void;
}

const useEventForm = ({ onSave, onClose }: UseEventFormProps) => {
  const handleSubmit = (formData: {
    title: string;
    start: string;
    end: string;
    private: boolean;
    allDay?: boolean;
    startTime?: string;
    endTime?: string;
  }) => {
    if (!formData.title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return;
    }

    const eventData = {
      title: formData.title,
      start: formData.start,
      end: formData.end,
      private: formData.private,
      allDay: formData.allDay,
      time: formData.allDay ? [] : [formData.startTime || '09:00', formData.endTime || '10:00'],
    };

    onSave(eventData);
    onClose();
  };

  const validateForm = (formData: {
    title: string;
    start: string;
    end: string;
    private: boolean;
  }) => {
    if (!formData.title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return false;
    }

    if (!formData.start) {
      alert('시작 날짜를 선택해주세요.');
      return false;
    }

    if (!formData.end) {
      alert('종료 날짜를 선택해주세요.');
      return false;
    }

    return true;
  };

  return {
    handleSubmit,
    validateForm,
  };
};

export default useEventForm;
