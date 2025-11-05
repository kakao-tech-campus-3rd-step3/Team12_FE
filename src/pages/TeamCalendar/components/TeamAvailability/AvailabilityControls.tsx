import SelectBox from '@/components/atoms/SelectBox';
import SelectDurationCalendar from '@/pages/TeamCalendar/components/SelectDurationCalendar';
import { formatDateShort } from '@/utils/dateTimeUtils';
import { Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';

// 컨트롤 영역 컴포넌트
interface AvailabilityControlsProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  onSearch: () => void;
  teamName?: string;
  memberCount?: number;
}

const AvailabilityControls: React.FC<AvailabilityControlsProps> = ({
  selectedDuration,
  onDurationChange,
  range,
  onRangeChange,
  onSearch,
  teamName,
  memberCount,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const timeOptions = [{ value: 15, label: '15분' }];

  // 외부 클릭 시 DatePicker 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  const handleSearch = () => {
    setShowDatePicker(false);
    onSearch();
  };

  return (
    <div className="flex flex-row gap-4 justify-between p-4 py-0 rounded-xl">
      <div className="flex items-center">
        <p className="pb-4 font-medium text-gray-800 text-nowrap">
          {teamName || '팀'} ({memberCount || 0}명)
        </p>
      </div>

      <div className="flex gap-8 items-center">
        <p className="pb-4 text-sm text-gray-600 text-nowrap">최소 요구 시간</p>
        <SelectBox
          label=""
          value={selectedDuration}
          onChange={onDurationChange}
          options={timeOptions}
          className="m-0"
        />
      </div>

      <div
        className="flex relative flex-row gap-2 items-center pb-4 text-nowrap"
        ref={datePickerRef}
      >
        <p className="text-sm text-gray-600">검색 기간</p>
        <button
          // onClick={() => setShowDatePicker(!showDatePicker)}
          className="flex gap-2 items-center px-3 py-2 font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors hover:bg-gray-50"
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>
            {range?.from
              ? `${formatDateShort(range.from)} ~ ${formatDateShort(range.to) || '선택'}`
              : '날짜 선택'}
          </span>
        </button>

        {/* DatePicker 드롭다운 */}
        {showDatePicker && (
          <div className="absolute right-0 top-full z-50 mt-2 bg-white rounded-lg border border-gray-200 shadow-xl">
            <SelectDurationCalendar
              range={range}
              setRange={onRangeChange}
              onSearch={handleSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityControls;
