import type { DateRange } from 'react-day-picker';
import { FormInput } from '@/components/atoms/FormInput';
import { buildIsoFromDateAndTime, getTimePart } from '@/utils/dateTimeUtils';
import type { FormData } from '@/hooks/calendar/useFormData';

interface TimeFieldsProps {
  formData: FormData;
  range?: DateRange;
  updateFormData: (updates: Partial<FormData>) => void;
}

const TimeFields: React.FC<TimeFieldsProps> = ({ formData, range, updateFormData }) => {
  return (
    <div className="">
      <div
        className={`transition-all duration-300 ${!formData.allDay ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="flex flex-row gap-7 ml-4 -mt-4">
          <FormInput
            id="startTime"
            value={getTimePart(formData.startTime) || ''}
            onChange={(value) =>
              updateFormData({
                startTime: buildIsoFromDateAndTime(formData.startTime, range?.from, value),
              })
            }
            type="time"
          />
          <FormInput
            id="endTime"
            value={getTimePart(formData.endTime) || ''}
            onChange={(value) =>
              updateFormData({
                endTime: buildIsoFromDateAndTime(formData.endTime, range?.to ?? range?.from, value),
              })
            }
            type="time"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeFields;
