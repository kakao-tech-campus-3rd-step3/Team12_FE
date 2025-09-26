import Button from '@/components/atoms/Button';
import { FormInput } from '@/components/atoms/FormInput';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { useEventForm, useFormData } from '@/hooks';
import SelectDuration from '@/pages/Calendar/components/SelectDuration';
import { type CalendarEvent, type ModalType, type RepeatType } from '@/types/calendar';
import { useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';

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

  const { formData, showTime, updateFormData, toggleShowTime } = useFormData({
    isOpen,
    modalType,
    selectedEvent,
    selectedDate,
  });

  const { handleSubmit } = useEventForm({
    onSave,
    onClose,
  });

  const toDateOnly = (dateLike: Date): string => {
    const year = dateLike.getFullYear();
    const month = String(dateLike.getMonth() + 1).padStart(2, '0');
    const day = String(dateLike.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDatePart = (value?: string): string => {
    if (!value) return '';
    if (value.includes('T')) return value.split('T')[0];
    return value.length === 10 ? value : '';
  };

  const getTimePart = (value?: string): string => {
    if (!value) return '';
    if (value.includes('T')) return value.split('T')[1].slice(0, 5);
    return value.length === 5 ? value : '';
  };

  const buildIsoFromDateAndTime = (
    current: string | undefined,
    fallbackDate: Date | undefined,
    time: string,
  ): string => {
    const dateStr = getDatePart(current) || (fallbackDate ? toDateOnly(fallbackDate) : '');
    return dateStr ? `${dateStr}T${time}:00` : time;
  };

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
          <div className="flex overflow-y-auto flex-col space-y-2 md:flex-row md:w-full">
            {/** 기간 선택 (모달 좌측) */}
            <SelectDuration range={range} setRange={setRange} />

            {/** 일정 제목, 비공개 여부, 시간 추가 (모달 우측) */}
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
                className="px-4 py-2"
              />

              <Button
                text="시간 추가"
                variant="primary"
                size="md"
                noWrapper={true}
                onClick={() => {
                  toggleShowTime();
                }}
                // Form Input이 아니라서 margin으로 위치 조정
                className="flex justify-center mx-4 mt-4 items-center w-[45%] h-[40px] border border-mainBlue bg-white text-mainBlue hover:bg-gray-50 hover:text-gray-500 hover:cursor-pointer"
              />

              <div
                className={`transition-all duration-300 ease-in-out p-4 pt-1 overflow-hidden ${
                  showTime ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex justify-between items-center">
                  <FormInput
                    id="allDay"
                    label="종일"
                    value={formData.allDay.toString()}
                    onChange={(value) => {
                      const isAllDay = value === 'true';
                      if (isAllDay) {
                        // 종일 선택 시 00:00 ~ 23:59로 설정
                        const startDate =
                          getDatePart(formData.startTime) ||
                          (range?.from ? toDateOnly(range.from) : '');
                        const endDate =
                          getDatePart(formData.endTime) ||
                          (range?.to ? toDateOnly(range.to) : '') ||
                          startDate;
                        updateFormData({
                          allDay: true,
                          startTime: startDate ? `${startDate}T00:00:00` : '',
                          endTime: endDate ? `${endDate}T23:59:00` : '',
                        });
                      } else {
                        updateFormData({ allDay: false });
                      }
                    }}
                    type="checkbox"
                    className=""
                  />
                  <FormInput
                    id="repeat"
                    label=""
                    value={formData.repeat}
                    onChange={(value) => updateFormData({ repeat: value as RepeatType })}
                    type="select"
                    options={[
                      { label: '반복 없음', value: 'none' },
                      { label: '매일', value: 'daily' },
                      { label: '매주', value: 'weekly' },
                      { label: '매월', value: 'monthly' },
                    ]}
                    className=""
                  />
                </div>

                {!formData.allDay && (
                  <div className="flex flex-col gap-2">
                    <div className="flex-1">
                      <FormInput
                        id="startTime"
                        label="시작 시간"
                        value={getTimePart(formData.startTime) || ''}
                        onChange={(value) =>
                          updateFormData({
                            startTime: buildIsoFromDateAndTime(
                              formData.startTime,
                              range?.from,
                              value,
                            ),
                          })
                        }
                        type="time"
                        className=""
                        placeholder="-- : --"
                      />
                    </div>
                    <div className="flex-1">
                      <FormInput
                        id="endTime"
                        label="종료 시간"
                        value={getTimePart(formData.endTime) || ''}
                        onChange={(value) =>
                          updateFormData({
                            endTime: buildIsoFromDateAndTime(
                              formData.endTime,
                              range?.to ?? range?.from,
                              value,
                            ),
                          })
                        }
                        type="time"
                        className=""
                        placeholder="-- : --"
                      />
                    </div>
                  </div>
                )}
              </div>
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
