import { type FormData } from '@/hooks/calendar/useFormData';
import { type CalendarEvent } from '@/types/calendar';

interface UseEventFormProps {
  onSave: (event: Omit<CalendarEvent, 'event_id'>) => void;
  onClose: () => void;
}

const useEventForm = ({ onSave, onClose }: UseEventFormProps) => {
  const handleSubmit = (formData: FormData) => {
    if (!formData.title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return;
    }

    const eventData: Omit<CalendarEvent, 'event_id'> = {
      title: formData.title,
      description: '',
      start_time: formData.startTime || '',
      end_time: formData.endTime || '',
      is_private: formData.private,
    };

    onSave(eventData);
    onClose();
  };

  const validateForm = (
    formData: Pick<FormData, 'title' | 'startTime' | 'endTime' | 'private'>,
  ) => {
    if (!formData.title?.trim()) {
      alert('일정 제목을 입력해주세요.');
      return false;
    }

    if (!formData.startTime) {
      alert('시작 날짜를 선택해주세요.');
      return false;
    }

    if (!formData.endTime) {
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
