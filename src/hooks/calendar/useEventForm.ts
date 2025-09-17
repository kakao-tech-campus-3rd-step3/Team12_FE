import { type CalendarEvent } from '@/types/calendar';

interface UseEventFormProps {
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onClose: () => void;
}

const useEventForm = ({ onSave, onClose }: UseEventFormProps) => {
  const handleSubmit = (formData: { title: string; start: string; private: boolean }) => {
    if (!formData.title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return;
    }

    const eventData = {
      title: formData.title,
      start: formData.start,
      private: formData.private,
    };

    onSave(eventData);
    onClose();
  };

  const validateForm = (formData: { title: string; start: string; private: boolean }) => {
    if (!formData.title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return false;
    }

    if (!formData.start) {
      alert('시작 날짜를 선택해주세요.');
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
