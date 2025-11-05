import type {
  modifyTeamCalendarRecurringAllEventsRequest,
  modifyTeamCalendarRecurringOneEventRequest,
} from '@/apis/types/calendar';
import Button from '@/components/atoms/Button';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { useEventForm, useFormData } from '@/hooks';
import type { FormData } from '@/hooks/calendar/useFormData';
import MetaFields from '@/pages/Calendar/components/MetaFields';
import RepeatSettings from '@/pages/Calendar/components/RepeatSettings';
import SelectDuration from '@/pages/Calendar/components/SelectDuration';
import TimeFields from '@/pages/Calendar/components/TimeFields';
import type { CalendarEvent, ModalType } from '@/types/calendar';
import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: ModalType;
  selectedEvent?: CalendarEvent;
  selectedDate?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  onSave: (event: Omit<CalendarEvent, 'event_id'>, formData: FormData) => void;
  onEditRecurringOne?: (
    eventId: number,
    eventData: import('@/apis/types/calendar').modifyTeamCalendarRecurringOneEventRequest,
  ) => void;
  onEditRecurringAll?: (
    eventId: number,
    eventData: import('@/apis/types/calendar').modifyTeamCalendarRecurringAllEventsRequest,
  ) => void;
  onDelete?: (eventId: number) => void;
  onDeleteRecurringOne?: (eventId: number) => void;
  onDeleteRecurringAll?: (eventId: number) => void;
  onChangeModalType?: (type: ModalType) => void;
}

const DateModal: React.FC<DateModalProps> = ({
  isOpen,
  onClose,
  modalType,
  selectedEvent,
  selectedDate,
  initialStartTime,
  initialEndTime,
  onSave,
  onEditRecurringOne,
  onEditRecurringAll,
  onDelete,
  onDeleteRecurringOne,
  onDeleteRecurringAll,
  onChangeModalType,
}) => {
  const [range, setRange] = useState<DateRange | undefined>();

  //일정 수정 시에 저장된 날짜 불러오기
  useEffect(() => {
    if (
      isOpen &&
      (modalType === 'edit' || modalType === 'editRecurring' || modalType === 'editRecurringAll') &&
      selectedEvent
    ) {
      const startDate = new Date(selectedEvent.start_time);
      const endDate = new Date(selectedEvent.end_time);
      setRange({ from: startDate, to: endDate });
    } else if (isOpen && modalType === 'add') {
      // 초기 시간이 제공된 경우 날짜 range 설정
      if (initialStartTime && initialEndTime) {
        const startDate = new Date(initialStartTime);
        const endDate = new Date(initialEndTime);
        setRange({ from: startDate, to: endDate });
      } else {
        setRange(undefined);
      }
    }
  }, [isOpen, modalType, selectedEvent, initialStartTime, initialEndTime]);

  const { formData, updateFormData } = useFormData({
    isOpen,
    modalType,
    selectedEvent,
    selectedDate,
    initialStartTime,
    initialEndTime,
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

      // 기존 시간 정보가 있으면 유지, 없으면 날짜만 설정
      const existingStartTime = formData.startTime?.includes('T')
        ? formData.startTime.split('T')[1]
        : '';
      const existingEndTime = formData.endTime?.includes('T') ? formData.endTime.split('T')[1] : '';

      updateFormData({
        startTime: existingStartTime ? `${startDate}T${existingStartTime}` : startDate,
        endTime: existingEndTime ? `${endDate}T${existingEndTime}` : endDate,
      });
    }
  }, [range?.from, range?.to]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //반복 일정 단일 수정
    if (modalType === 'editRecurringOne' && selectedEvent && onEditRecurringOne) {
      const eventData: modifyTeamCalendarRecurringOneEventRequest = {
        original_start_time: selectedEvent.start_time,
        title: formData.title,
        description: formData.description,
      };
      if (formData.startTime && formData.endTime) {
        const startTimeWithTime = formData.startTime.includes('T')
          ? formData.startTime
          : `${formData.startTime}T00:00:00`;
        const endTimeWithTime = formData.endTime.includes('T')
          ? formData.endTime
          : `${formData.endTime}T23:59:00`;

        eventData.start_time = startTimeWithTime;
        eventData.end_time = endTimeWithTime;
      }
      onEditRecurringOne(selectedEvent.event_id, eventData);
      onClose();
      //반복 일정 전체 수정
    } else if (modalType === 'editRecurringAll' && selectedEvent && onEditRecurringAll) {
      const eventData: modifyTeamCalendarRecurringAllEventsRequest = {
        title: formData.title,
        description: formData.description,
      };
      if (formData.startTime && formData.endTime) {
        const startTimeWithTime = formData.startTime.includes('T')
          ? formData.startTime
          : `${formData.startTime}T00:00:00`;
        const endTimeWithTime = formData.endTime.includes('T')
          ? formData.endTime
          : `${formData.endTime}T23:59:00`;

        eventData.start_time = startTimeWithTime;
        eventData.end_time = endTimeWithTime;
      }
      onEditRecurringAll(selectedEvent.event_id, eventData);
      onClose();
    } else {
      handleSubmit(formData);
    }
  };

  const handleDelete = () => {
    if (selectedEvent && onDelete) {
      onDelete(selectedEvent.event_id);
      onClose();
    }
  };

  //반복 일정 삭제
  const handleDeleteRecurringOne = () => {
    if (selectedEvent && onDeleteRecurringOne) {
      onDeleteRecurringOne(selectedEvent.event_id);
      onClose();
    }
  };
  const handleDeleteRecurringAll = () => {
    if (selectedEvent && onDeleteRecurringAll) {
      onDeleteRecurringAll(selectedEvent.event_id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={
          modalType === 'add'
            ? '새 일정 추가'
            : modalType === 'recurringAction'
              ? '반복 일정'
              : modalType === 'editRecurring'
                ? '수정 방법 선택'
                : modalType === 'edit' ||
                    modalType === 'editRecurringOne' ||
                    modalType === 'editRecurringAll'
                  ? '일정 편집'
                  : modalType === 'deleteRecurring'
                    ? '삭제 방법 선택'
                    : '일정 삭제'
        }
      />
      {modalType === 'recurringAction' ? (
        <div className="p-6">
          <p className="mb-6 text-gray-800">
            이 일정은 반복 일정입니다.
            <br />
            어떤 작업을 수행하시겠습니까?
          </p>
          <div className="flex gap-3 mb-3">
            <Button
              onClick={() => onChangeModalType?.('editRecurring')}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              수정
            </Button>
            <Button
              onClick={() => onChangeModalType?.('deleteRecurring')}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              삭제
            </Button>
          </div>
          <Button onClick={onClose} variant="outline" size="md" noWrapper={true} className="w-full">
            취소
          </Button>
        </div>
      ) : modalType === 'editRecurring' ? (
        <div className="p-6">
          <p className="mb-6 text-gray-800">선택하신 일정은 반복 일정입니다.</p>
          <div className="flex gap-3 mb-3">
            <Button
              onClick={() => onChangeModalType?.('editRecurringOne')}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              이 일정만 수정
            </Button>
            <Button
              onClick={() => onChangeModalType?.('editRecurringAll')}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              반복 일정 전체 수정
            </Button>
          </div>
          <Button onClick={onClose} variant="outline" size="md" noWrapper={true} className="w-full">
            취소
          </Button>
        </div>
      ) : modalType === 'deleteRecurring' ? (
        <div className="p-6">
          <p className="mb-6 text-gray-800">선택하신 일정은 반복 일정입니다.</p>
          <div className="flex gap-3 mb-3">
            <Button
              onClick={handleDeleteRecurringOne}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-gray-400 hover:bg-gray-500"
            >
              단일 일정 삭제
            </Button>
            <Button
              onClick={handleDeleteRecurringAll}
              variant="primary"
              size="md"
              noWrapper={true}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              반복 일정 전체 삭제
            </Button>
          </div>
          <Button onClick={onClose} variant="outline" size="md" noWrapper={true} className="w-full">
            취소
          </Button>
        </div>
      ) : modalType === 'delete' ? (
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
            <div className="mt-4">
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
                onClick={() => {
                  if (selectedEvent?.is_recurring) {
                    onChangeModalType?.('deleteRecurring');
                  } else {
                    onChangeModalType?.('delete');
                  }
                }}
                text="삭제"
                variant="primary"
                size="md"
                noWrapper={true}
                className="flex justify-center items-center w-[20%] h-[40px] bg-red-500 hover:bg-red-600"
              />
            )}
            <Button
              type="submit"
              text={modalType === 'add' ? '추가' : '등록'}
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
