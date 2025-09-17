import Button from '@/components/atoms/Button';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { useEventForm, useFormData } from '@/hooks';
import { type CalendarEvent, type ModalType } from '@/types/calendar';

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
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">일정 제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="일정 제목을 입력하세요"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="private"
                checked={formData.private}
                onChange={(e) => updateFormData({ private: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="private" className="text-sm text-gray-700">
                비공개 여부
              </label>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">시작 날짜</label>
              <input
                type="date"
                value={formData.start}
                onChange={(e) => updateFormData({ start: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div
            className={`flex gap-2 mt-6 ${modalType === 'edit' ? 'justify-between' : 'justify-end'}`}
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
              onClick={() => {}}
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
