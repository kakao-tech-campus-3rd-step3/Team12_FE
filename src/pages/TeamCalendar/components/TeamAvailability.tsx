import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { WEEKDAYS } from '@/constants';
import Button from '@/components/atoms/Button';
import SelectBox from '@/components/atoms/SelectBox';
import { mockTimeSlots } from '@/mockdata/teamData';
import { generateTimeOptions } from '@/utils/timeUtils';
import { formatDateShort } from '@/utils/dateTimeUtils';
import SelectDurationCalendar from '@/pages/TeamCalendar/components/SelectDurationCalendar';

// 가용성 데이터 타입
type AvailabilityLevel = 'high' | 'medium' | 'low' | 'none';

interface TimeSlotAvailability {
  time: string;
  days: AvailabilityLevel[];
}

interface TeamAvailabilityProps {
  onBack?: () => void;
}

// Mock 데이터 - 시간대별 가용성
const generateMockAvailability = (): TimeSlotAvailability[] => {
  const timeSlots: TimeSlotAvailability[] = [];
  for (let hour = 9; hour <= 20; hour++) {
    const levels: AvailabilityLevel[] = ['high', 'medium', 'low', 'none'];
    timeSlots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      days: Array(7)
        .fill(0)
        .map(() => levels[Math.floor(Math.random() * levels.length)]),
    });
  }
  return timeSlots;
};

// 유틸리티 함수들
const getColorClass = (level: AvailabilityLevel): string => {
  switch (level) {
    case 'high':
      return 'bg-green-500';
    case 'medium':
      return 'bg-green-300';
    case 'low':
      return 'bg-green-100';
    case 'none':
      return 'bg-gray-300';
    default:
      return 'bg-gray-200';
  }
};

const getLevelText = (level: AvailabilityLevel): string => {
  switch (level) {
    case 'high':
      return '모두 가능';
    case 'medium':
      return '3명 가능';
    case 'low':
      return '2명 가능';
    case 'none':
      return '1명 이하';
    default:
      return '';
  }
};

// header
interface AvailabilityHeaderProps {
  onBack?: () => void;
}

const AvailabilityHeader: React.FC<AvailabilityHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center pl-4 mb-2 h-16">
      <p className="text-lg font-bold text-nowrap text-mainBlue md:text-2xl">팀원 가용성 현황</p>
      <Button
        onClick={onBack}
        text="캘린더로 돌아가기"
        fullWidth={false}
        wrapperClassName="mx-0 text-nowrap"
      />
    </div>
  );
};

// 컨트롤 영역 컴포넌트
interface AvailabilityControlsProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  onSearch: () => void;
}

const AvailabilityControls: React.FC<AvailabilityControlsProps> = ({
  selectedDuration,
  onDurationChange,
  range,
  onRangeChange,
  onSearch,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const timeOptions = generateTimeOptions(4);

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
        <p className="pb-4 font-medium text-gray-800 text-nowrap">부산대 프로젝트팀 (4명)</p>
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
          onClick={() => setShowDatePicker(!showDatePicker)}
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

// 팀원 가용성 조회 컴포넌트
interface AvailabilityGridProps {
  availabilityData: TimeSlotAvailability[];
}

const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({ availabilityData }) => {
  return (
    <>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div className="text-sm font-semibold text-center text-gray-600"></div>
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2 font-semibold text-center text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* 시간대별 가용성 */}
      <div className="space-y-1">
        {availabilityData.map((slot) => (
          <div key={slot.time} className="grid grid-cols-8 gap-1">
            <div className="py-2 text-sm font-medium text-center text-gray-600">{slot.time}</div>
            {slot.days.map((level, dayIndex) => (
              <div
                key={`${slot.time}-${dayIndex}`}
                className={`h-10 rounded border border-gray-200 transition-opacity cursor-pointer ${getColorClass(level)} hover:opacity-80`}
                title={getLevelText(level)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

// 추천 시간대 컴포넌트
const RecommendedTimeSlots: React.FC = () => {
  return (
    <div className="flex-shrink-0 xl:w-80">
      <div className="p-6 bg-white rounded-xl border shadow-lg border-mainBlue/70">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">추천 시간대</h2>
        <div className="space-y-3">
          {mockTimeSlots.map((slot) => (
            <div key={slot.id} className="p-3 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-800">{slot.day}</div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    slot.tag === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.tag}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700">{slot.time}</div>
              <div className="mt-1 text-xs text-gray-500">{slot.participants}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => {}} text="선택" fullWidth={true} />
        </div>
      </div>
    </div>
  );
};

// 메인 컴포넌트
const TeamAvailability: React.FC<TeamAvailabilityProps> = ({ onBack }) => {
  const [selectedDuration, setSelectedDuration] = useState(120);
  const [availabilityData] = useState<TimeSlotAvailability[]>(generateMockAvailability());
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2025, 7, 10), // 2025년 8월 10일
    to: new Date(2025, 7, 17), // 2025년 8월 17일
  });

  const handleSearch = () => {
    // TODO: 날짜 범위로 가용성 데이터 재조회
  };

  return (
    <div className="p-2 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 md:p-2">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* 중앙: 가용성 테이블 */}
          <div className="overflow-x-auto flex-1 p-6 bg-white rounded-xl border shadow-lg border-mainBlue/70">
            <div className="min-w-[600px]">
              <AvailabilityHeader onBack={onBack} />
              <AvailabilityControls
                selectedDuration={selectedDuration}
                onDurationChange={setSelectedDuration}
                range={range}
                onRangeChange={setRange}
                onSearch={handleSearch}
              />
              <AvailabilityGrid availabilityData={availabilityData} />
            </div>
          </div>

          {/* 오른쪽: 추천 시간대 */}
          <RecommendedTimeSlots />
        </div>
      </div>
    </div>
  );
};

export default TeamAvailability;
