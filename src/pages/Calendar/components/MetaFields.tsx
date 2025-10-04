import type { DateRange } from 'react-day-picker';
import { FormInput } from '@/components/atoms/FormInput';
import { getDatePart } from '@/utils/dateTimeUtils';
import type { FormData } from '@/hooks/calendar/useFormData';
import { useState } from 'react';

interface MetaFieldsProps {
  formData: FormData;
  range?: DateRange;
  updateFormData: (updates: Partial<FormData>) => void;
}

const MetaFields: React.FC<MetaFieldsProps> = ({ formData, range, updateFormData }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="">
      <FormInput
        id="title"
        label="일정 제목"
        value={formData.title}
        onChange={(value) => {
          updateFormData({ title: value });
          if (error === 'title') setError(null);
        }}
        placeholder="일정 제목을 입력하세요"
        required
        error={error === 'title' ? '일정 제목을 입력해주세요' : undefined}
        className="p-4"
      />
      <div className="flex gap-4 -mt-1">
        <FormInput
          id="private"
          label="비공개 여부"
          value={formData.private.toString()}
          onChange={(value) => updateFormData({ private: value === 'true' })}
          type="checkbox"
          className="ml-6"
        />

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
                (range?.from
                  ? `${range.from.getFullYear()}-${String(range.from.getMonth() + 1).padStart(2, '0')}-${String(range.from.getDate()).padStart(2, '0')}`
                  : '');
              const endDate =
                getDatePart(formData.endTime) ||
                (range?.to
                  ? `${range.to.getFullYear()}-${String(range.to.getMonth() + 1).padStart(2, '0')}-${String(range.to.getDate()).padStart(2, '0')}`
                  : '') ||
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
        />
      </div>
    </div>
  );
};

export default MetaFields;
