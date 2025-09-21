import Button from '@/components/atoms/Button';
import { FormInput } from '@/components/atoms/FormInput';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { useEventForm, useFormData } from '@/hooks';
import SelectDuration from '@/pages/Calendar/components/SelectDuration';
import { type CalendarEvent, type ModalType } from '@/types/calendar';
import { useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: ModalType;
  selectedEvent?: CalendarEvent;
  selectedDate?: string;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (eventId: string) => void;
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

  const { handleSubmit } = useEventForm({
    onSave,
    onClose,
  });

  // range가 변경될 때마다 formData의 start, end 업데이트
  useEffect(() => {
    if (range?.from && range?.to) {
      // 로컬 시간을 사용하여 날짜 형식 변환 (YYYY-MM-DD)
      const startDate = `${range.from.getFullYear()}-${String(range.from.getMonth() + 1).padStart(2, '0')}-${String(range.from.getDate()).padStart(2, '0')}`;
      const endDate = `${range.to.getFullYear()}-${String(range.to.getMonth() + 1).padStart(2, '0')}-${String(range.to.getDate()).padStart(2, '0')}`;
      updateFormData({ start: startDate, end: endDate });
    }
  }, [range?.from, range?.to]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleDelete = () => {
    if (selectedEvent && onDelete) {
      onDelete(selectedEvent.id);
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="flex overflow-y-auto flex-col gap-4 space-y-4 md:flex-row md:w-full">
            <SelectDuration range={range} setRange={setRange} />
            <div className="">
              <FormInput
                id="title"
                label="일정 제목"
                value={formData.title}
                onChange={(value) => updateFormData({ title: value })}
                placeholder="일정 제목을 입력하세요"
                required
                className="p-4"
              />

              <FormInput
                id="private"
                label="비공개 여부"
                value={formData.private.toString()}
                onChange={(value) => updateFormData({ private: value === 'true' })}
                type="checkbox"
                className="p-4"
              />
            </div>
          </div>

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
