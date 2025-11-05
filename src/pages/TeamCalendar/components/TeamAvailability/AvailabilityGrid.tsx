import { WEEKDAYS_MON_FIRST } from '@/constants';
import { useMemo } from 'react';
import type { DateRange } from 'react-day-picker';

// 팀원 가용성 조회 컴포넌트
type AvailabilityLevel = 'high' | 'medium' | 'low' | 'none';

const getColorClass = (level: AvailabilityLevel): string => {
  switch (level) {
    case 'high':
      return 'bg-green-400';
    case 'medium':
      return 'bg-green-300';
    case 'low':
      return 'bg-green-100';
    case 'none':
      return 'bg-gray-100';
    default:
      return 'bg-white';
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

interface TimeSlotAvailability {
  time: string;
  days: DayAvailability[];
}

interface DayAvailability {
  level: AvailabilityLevel;
  count: number;
}
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
        <div className="w-12"></div>
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
      <div className="space-y-0">
        {groupedData.map((group) => (
          <div key={group.hour} className="flex gap-0">
            {/* 시간 레이블 (1시간 단위) */}
            <div className="flex justify-center items-start w-12 text-sm font-medium text-gray-600">
              {group.hour}
            </div>

            {/* 15분 단위 슬롯 4개 */}
            <div className="flex-1 space-y-0 border-l border-gray-300">
              {group.slots.map((slot) => (
                <div key={slot.time} className="grid grid-cols-7 gap-0">
                  {slot.days.map((dayAvailability, dayIndex) => (
                    <div
                      key={`${slot.time}-${dayIndex}`}
                      className={`h-4 border-r border-gray-300 transition-opacity cursor-pointer ${getColorClass(dayAvailability.level)} hover:opacity-80`}
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

export default AvailabilityGrid;
