import { FormInput } from '@/components/atoms/FormInput';
import type { FormData } from '@/hooks/calendar/useFormData';
import type { RepeatType } from '@/types/calendar';

interface RepeatSettingsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const RepeatSettings: React.FC<RepeatSettingsProps> = ({ formData, updateFormData }) => {
  const weeksOptions = [
    { label: '월', value: 'mon' },
    { label: '화', value: 'tue' },
    { label: '수', value: 'wed' },
    { label: '목', value: 'thu' },
    { label: '금', value: 'fri' },
    { label: '토', value: 'sat' },
    { label: '일', value: 'sun' },
  ];

  return (
    <div className="p-4 mt-2">
      <div className="space-y-2">
        <FormInput
          id="repeat"
          label="반복 설정"
          value={formData.repeat}
          onChange={(value) => updateFormData({ repeat: value as RepeatType })}
          type="select"
          options={[
            { label: '반복 없음', value: 'none' },
            { label: '매일', value: 'daily' },
            { label: '매주', value: 'weekly' },
            { label: '매월', value: 'monthly' },
          ]}
        />

        {/* 매일, 매월: 반복 종료 방법 선택 */}
        <div
          className={`transition-all duration-300 ${formData.repeat === 'daily' || formData.repeat === 'monthly' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <FormInput
            id="repeatEndType"
            label="반복 종료"
            value={formData.repeatEndType || 'endcount'}
            onChange={(value) => updateFormData({ repeatEndType: value as 'endcount' | 'enddate' })}
            type="select"
            options={[
              { label: '횟수', value: 'endcount' },
              { label: '날짜', value: 'enddate' },
            ]}
          />
        </div>

        {/* 요일 선택 */}
        <div
          className={`transition-all duration-300 ${formData.repeat === 'weekly' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">반복 요일</label>
          <div className="flex flex-row gap-1">
            {weeksOptions.map((day) => {
              const isSelected = formData.repeatWeekDays?.includes(day.value) || false;
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => {
                    const currentDays = formData.repeatWeekDays || [];
                    const newDays = isSelected
                      ? currentDays.filter((d) => d !== day.value)
                      : [...currentDays, day.value];
                    updateFormData({ repeatWeekDays: newDays });
                    // 요일 선택 시 반복 종료 타입 초기화 및 설정
                    if (newDays.length > 0) {
                      updateFormData({ repeatEndType: 'endcount' });
                    }
                  }}
                  className={`
                     px-2 py-1.5 text-xs rounded-md transition-colors duration-200
                     ${
                       isSelected
                         ? 'bg-blue-500 text-white'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }
                   `}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 매주: 요일 선택 -> 반복 종료 방법 선택 */}
        <div
          className={`transition-all duration-300 -mb-3.5 ${formData.repeat === 'weekly' && formData.repeatWeekDays && formData.repeatWeekDays.length > 0 ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <div className="mt-4">
            <FormInput
              id="repeatEndType"
              label="반복 종료"
              value={formData.repeatEndType || 'endcount'}
              onChange={(value) =>
                updateFormData({ repeatEndType: value as 'endcount' | 'enddate' })
              }
              type="select"
              options={[
                { label: '횟수', value: 'endcount' },
                { label: '날짜', value: 'enddate' },
              ]}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${(formData.repeat === 'daily' || formData.repeat === 'monthly' || (formData.repeat === 'weekly' && formData.repeatWeekDays && formData.repeatWeekDays.length > 0)) && formData.repeatEndType === 'endcount' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <div className="mt-4">
            <FormInput
              id="repeatCount"
              label="반복 횟수"
              value={formData.repeatCount.toString()}
              onChange={(value) => updateFormData({ repeatCount: parseInt(value) || 1 })}
              type="input"
              placeholder="1"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${(formData.repeat === 'daily' || formData.repeat === 'monthly' || (formData.repeat === 'weekly' && formData.repeatWeekDays && formData.repeatWeekDays.length > 0)) && formData.repeatEndType === 'enddate' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          <div className="mt-4">
            <FormInput
              id="repeatEndDate"
              label="반복 종료일"
              value={formData.repeatEndDate || ''}
              onChange={(value) => updateFormData({ repeatEndDate: value })}
              type="date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatSettings;
