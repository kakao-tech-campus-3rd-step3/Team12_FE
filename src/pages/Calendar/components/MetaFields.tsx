import type { DateRange } from 'react-day-picker';
import { FormInput } from '@/components/atoms/FormInput';
import MemberSelectDropdown from '@/pages/Calendar/components/MemberSelectDropdown';
import { getDatePart } from '@/utils/dateTimeUtils';
import type { FormData } from '@/hooks/calendar/useFormData';
import { useState } from 'react';

interface MetaFieldsProps {
  formData: FormData;
  range?: DateRange;
  updateFormData: (updates: Partial<FormData>) => void;
  teamId?: number; // teamId 추가
}

const MetaFields: React.FC<MetaFieldsProps> = ({ formData, range, updateFormData, teamId }) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);

  const handleAllDayChange = (value: string) => {
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
  };

  const isAllDayChecked = formData.allDay.toString() === 'true';

  // 팀원 선택 변경 핸들러
  const handleMemberChange = (memberIds: number[]) => {
    setSelectedMemberIds(memberIds);
    updateFormData({ event_participants: memberIds });
  };

  return (
    <div className="">
      {/* 일정 제목 라벨 */}
      <label
        htmlFor="title"
        className="block mb-2 text-sm font-medium text-gray-700 text-nowrap m-4 mb-0"
      >
        일정 제목 <span className="text-red-500">*</span>
      </label>

      {/* 일정 제목 입력과 종일 체크박스를 같은 라인에 배치 */}
      <div className="flex items-center gap-3 m-4 mt-2">
        <div className="flex-1">
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => {
              updateFormData({ title: e.target.value });
              if (error === 'title') setError(null);
            }}
            placeholder="일정 제목을 입력하세요"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              error === 'title' ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            }`}
          />
          {error === 'title' && (
            <p className="text-xs text-red-500 mt-1">일정 제목을 입력해주세요</p>
          )}
        </div>

        {/* 종일 체크박스 */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="allDay"
            checked={isAllDayChecked}
            onChange={(e) => handleAllDayChange(e.target.checked.toString())}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isAllDayChecked
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            } hover:shadow-sm`}
            onClick={() => handleAllDayChange((!isAllDayChecked).toString())}
          >
            {isAllDayChecked && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <label
            htmlFor="allDay"
            className="text-sm font-medium cursor-pointer text-gray-700 whitespace-nowrap"
          >
            종일
          </label>
        </div>
      </div>

      {/* 팀 캘린더일 때만 팀원 선택 드롭다운 표시 */}
      {teamId && (
        <MemberSelectDropdown
          teamId={teamId}
          selectedMemberIds={selectedMemberIds}
          onChange={handleMemberChange}
          className="m-4"
        />
      )}

      <FormInput
        id="description"
        label="메모"
        value={formData.description}
        onChange={(value) => {
          updateFormData({ description: value });
        }}
        placeholder="메모를 입력하세요"
        className="m-4"
      />
    </div>
  );
};

export default MetaFields;
