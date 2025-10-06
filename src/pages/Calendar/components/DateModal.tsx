import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import Button from '@/components/atoms/Button';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { useEventForm, useFormData } from '@/hooks';
import MetaFields from '@/pages/Calendar/components/MetaFields';
import RepeatSettings from '@/pages/Calendar/components/RepeatSettings';
import SelectDuration from '@/pages/Calendar/components/SelectDuration';
import TimeFields from '@/pages/Calendar/components/TimeFields';
import type { CalendarEvent, ModalType } from '@/types/calendar';

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: ModalType;
  selectedEvent?: CalendarEvent;
  selectedDate?: string;
  onSave: (event: Omit<CalendarEvent, 'event_id'>) => void;
  onDelete?: (eventId: number) => void;
  onChangeModalType?: (type: ModalType) => void;
}

const DateModal: React.FC<DateModalProps> = ({
  isOpen,
  onClose,
  modalType,
  selectedEvent,
  selectedDate,
  onSave,
  onDelete,
  onChangeModalType,
}) => {
  const [range, setRange] = useState<DateRange | undefined>();

  const { formData, updateFormData } = useFormData({
    isOpen,
    modalType,
    selectedEvent,
    selectedDate,
  });

  const { handleSubmit, error, setError } = useEventForm({
    onSave,
    onClose,
  });

  // range가 변경될 때마다 formData의 start, end 업데이트
  useEffect(() => {
    if (range?.from && range?.to) {
      // 로컬 시간을 사용하여 날짜 형식 변환 (YYYY-MM-DD)
      const startDate = `${range.from.getFullYear()}-${String(range.from.getMonth() + 1).padStart(2, '0')}-${String(range.from.getDate()).padStart(2, '0')}`;
      const endDate = `${range.to.getFullYear()}-${String(range.to.getMonth() + 1).padStart(2, '0')}-${String(range.to.getDate()).padStart(2, '0')}`;
      updateFormData({ startTime: startDate, endTime: endDate });
    }
  }, [range?.from, range?.to]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleDelete = () => {
    if (selectedEvent && onDelete) {
      onDelete(selectedEvent.event_id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={
          modalType === 'add' ? '새 일정 추가' : modalType === 'edit' ? '일정 편집' : '일정 삭제'
        }
      />

      {modalType === 'delete' ? (
        <div className="p-6">
          <p className="mb-4 text-gray-600">"{selectedEvent?.title}" 일정을 삭제하시겠습니까?</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={onClose} variant="outline" size="md" noWrapper={true}>
              취소
            </Button>
            <Button
              onClick={handleDelete}
              variant="primary"
              size="md"
              noWrapper={true}
              className="bg-red-500 hover:bg-red-600"
            >
              삭제
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="flex flex-col space-y-2 md:flex-row md:w-full">
            {/** 일정 제목, 비공개 여부, 시간 추가 (모달 우측) */}
            <div className="mt-4 min-h-[400px]">
              <MetaFields formData={formData} range={range} updateFormData={updateFormData} />
              <RepeatSettings formData={formData} updateFormData={updateFormData} />
            </div>
            {/** 기간 선택 (모달 좌측) */}
            <div className="flex flex-col gap-2 min-h-[520px]">
              <SelectDuration range={range} setRange={setRange} />
              <TimeFields formData={formData} range={range} updateFormData={updateFormData} />
            </div>
          </div>

          {/** 삭제 버튼과 저장 버튼 */}
          <div
            className={`flex gap-2 mt-2 ${modalType === 'edit' ? 'justify-around' : 'justify-center'}`}
          >
            {modalType === 'edit' && (
              <Button
                onClick={() => onChangeModalType?.('delete')}
                text="삭제"
                variant="primary"
                size="md"
                noWrapper={true}
                className="flex justify-center items-center w-[20%] h-[40px] bg-red-500 hover:bg-red-600"
              />
            )}
            <Button
              type="submit"
              text={modalType === 'add' ? '추가' : '수정'}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex justify-center items-center w-[20%] h-[40px] bg-blue-500 hover:bg-blue-600"
            />
          </div>
        </form>
      )}
    </Modal>
  );
};

export default DateModal;
