import type { Availability } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import SelectBox from '@/components/atoms/SelectBox';
import { WEEKDAYS_MON_FIRST } from '@/constants';
import { useGetMyTeam, useGetTeamAvailability } from '@/hooks/team/useTeam';
import { mockTimeSlots } from '@/mockdata/teamData';
import SelectDurationCalendar from '@/pages/TeamCalendar/components/SelectDurationCalendar';
import { formatDateShort } from '@/utils/dateTimeUtils';
import { Calendar } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DateRange } from 'react-day-picker';

// 가용성 데이터 타입
type AvailabilityLevel = 'high' | 'medium' | 'low' | 'none';

interface DayAvailability {
  level: AvailabilityLevel;
  count: number;
}

interface TimeSlotAvailability {
  time: string;
  days: DayAvailability[];
}

interface TeamAvailabilityProps {
  teamId: number;
  onBack?: () => void;
}

// Mock 데이터 - 시간대별 가용성 (15분 간격)
const generateMockAvailability = (): TimeSlotAvailability[] => {
  const timeSlots: TimeSlotAvailability[] = [];
  const levels: AvailabilityLevel[] = ['high', 'medium', 'low', 'none'];

  // 9시부터 23시까지
  for (let hour = 9; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push({
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        days: Array(7)
          .fill(0)
          .map(() => {
            const level = levels[Math.floor(Math.random() * levels.length)];
            return { level, count: 0 };
          }),
      });
    }
  }

  return timeSlots;
};

// 유틸리티 함수들
const getAvailabilityLevel = (
  availableMembers: number,
  totalMembers: number,
): AvailabilityLevel => {
  if (totalMembers === 0) return 'none';
  const ratio = availableMembers / totalMembers;

  if (ratio === 1) return 'high';
  if (ratio >= 0.75) return 'medium';
  if (ratio >= 0.5) return 'low';
  return 'none';
};

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

const getLevelText = (level: AvailabilityLevel, count?: number): string => {
  if (count !== undefined) {
    return `${count}명 가능`;
  }
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

// API 데이터를 TimeSlotAvailability 형태로 변환
const convertAPIDataToTimeSlots = (
  apiData: Availability[] | undefined,
  totalMembers: number,
  dateRange: DateRange | undefined,
): TimeSlotAvailability[] => {
  if (!apiData || !dateRange?.from || !dateRange?.to) {
    return generateMockAvailability();
  }

  // 날짜 범위 내의 모든 날짜 생성
  const dates: Date[] = [];
  const currentDate = new Date(dateRange.from);
  const endDate = new Date(dateRange.to);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // API 데이터를 Map으로 변환 (빠른 조회를 위해)
  const availabilityMap = new Map<string, number>();
  apiData.forEach((item) => {
    const key = item.start_time; // ISO 문자열을 키로 사용
    availabilityMap.set(key, item.available_member);
  });

  // 시간 슬롯 생성 (09:00 ~ 23:45)
  const timeSlots: TimeSlotAvailability[] = [];

  for (let hour = 9; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const days: DayAvailability[] = [];

      // 각 날짜(요일)에 대해 가용성 확인
      dates.forEach((date) => {
        const dateTimeString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${timeString}:00`;
        const availableMembers = availabilityMap.get(dateTimeString) || 0;
        const level = getAvailabilityLevel(availableMembers, totalMembers);
        days.push({ level, count: availableMembers });
      });

      // 7일로 맞춤
      while (days.length < 7) {
        days.push({ level: 'none', count: 0 });
      }

      timeSlots.push({
        time: timeString,
        days,
      });
    }
  }

  return timeSlots;
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

// 팀원 가용성 조회 컴포넌트
interface AvailabilityGridProps {
  availabilityData: TimeSlotAvailability[];
  dateRange: DateRange | undefined;
}

const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({ availabilityData, dateRange }) => {
  // 시간대별로 그룹화 (1시간당 4개의 15분 슬롯)
  const groupedData: { hour: string; slots: TimeSlotAvailability[] }[] = [];

  for (let i = 0; i < availabilityData.length; i += 4) {
    const firstSlot = availabilityData[i];
    const hourLabel = firstSlot.time.split(':')[0] + ':00';
    groupedData.push({
      hour: hourLabel,
      slots: availabilityData.slice(i, i + 4),
    });
  }

  // 날짜 범위 내의 날짜 배열 생성
  const dateHeaders = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return [];

    const dates: Date[] = [];
    const currentDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.slice(0, 7); // 최대 7일
  }, [dateRange]);

  return (
    <>
      {/* 요일 헤더 */}
      <div className="flex gap-1 mb-2">
        <div className="w-16"></div>
        <div className="grid flex-1 grid-cols-7 gap-1">
          {dateHeaders.map((date, index) => {
            const weekday = WEEKDAYS_MON_FIRST[(date.getDay() + 6) % 7]; // 월요일을 0으로
            const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
            return (
              <div key={index} className="py-2 text-center">
                <div className="text-sm font-semibold text-gray-700">{weekday}</div>
                <div className="text-xs text-gray-500">{dateStr}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 시간대별 가용성 */}
      <div className="space-y-2">
        {groupedData.map((group) => (
          <div key={group.hour} className="flex gap-1">
            {/* 시간 레이블 (1시간 단위) */}
            <div className="flex justify-center items-start w-16 text-sm font-medium text-gray-600">
              {group.hour}
            </div>

            {/* 15분 단위 슬롯 4개 */}
            <div className="flex-1 space-y-0">
              {group.slots.map((slot) => (
                <div key={slot.time} className="grid grid-cols-7 gap-1">
                  {slot.days.map((dayAvailability, dayIndex) => (
                    <div
                      key={`${slot.time}-${dayIndex}`}
                      className={`h-4 rounded-sm border border-gray-100 transition-opacity cursor-pointer ${getColorClass(dayAvailability.level)} hover:opacity-80`}
                      title={`${slot.time} - ${getLevelText(dayAvailability.level, dayAvailability.count)}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
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
const TeamAvailability: React.FC<TeamAvailabilityProps> = ({ teamId, onBack }) => {
  const { data: teamAvailability } = useGetTeamAvailability(teamId);
  const { data: teamInfo } = useGetMyTeam(teamId);

  console.log('teamAvailability', teamAvailability);
  console.log('teamInfo', teamInfo);

  const [selectedDuration, setSelectedDuration] = useState(15);

  // API 데이터의 시작일과 종료일 계산
  const initialRange = useMemo(() => {
    if (!teamAvailability?.available || teamAvailability.available.length === 0) {
      // 데이터가 없으면 오늘부터 7일 후까지
      const today = new Date();
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7);
      return { from: today, to: sevenDaysLater };
    }

    // API 데이터에서 가장 빠른 날짜와 가장 늦은 날짜 찾기
    const dates = teamAvailability.available.map((item) => new Date(item.start_time));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return { from: minDate, to: maxDate };
  }, [teamAvailability]);

  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  // API 데이터가 변경되면 range도 업데이트
  useEffect(() => {
    if (teamAvailability?.available && teamAvailability.available.length > 0) {
      const dates = teamAvailability.available.map((item) => new Date(item.start_time));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      setRange({ from: minDate, to: maxDate });
    }
  }, [teamAvailability]);

  // API 데이터를 TimeSlotAvailability 형태로 변환
  const availabilityData = useMemo(() => {
    const totalMembers = teamInfo?.count || 0;
    const apiData = teamAvailability?.available;

    return convertAPIDataToTimeSlots(apiData, totalMembers, range);
  }, [teamAvailability, teamInfo, range]);

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
                teamName={teamInfo?.name}
                memberCount={teamInfo?.count}
              />
              <AvailabilityGrid availabilityData={availabilityData} dateRange={range} />
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
