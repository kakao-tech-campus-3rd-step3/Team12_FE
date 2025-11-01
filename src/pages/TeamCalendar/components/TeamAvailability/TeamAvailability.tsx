import type { Availability } from '@/apis/types/team';
import { useGetMyTeam, useGetTeamAvailability } from '@/hooks/team/useTeam';
import AvailabilityControls from '@/pages/TeamCalendar/components/TeamAvailability/AvailabilityControls';
import AvailabilityGrid from '@/pages/TeamCalendar/components/TeamAvailability/AvailabilityGrid';
import AvailabilityHeader from '@/pages/TeamCalendar/components/TeamAvailability/AvailabilityHeader';
import RecommendedTimeSlots from '@/pages/TeamCalendar/components/TeamAvailability/RecommendedTimeSlots';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
            const level = levels[levels.length - 1];
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

// API 데이터를 TimeSlotAvailability 형태로 변환
const convertAPIDataToTimeSlots = (
  apiData: Availability[] | undefined,
  totalMembers: number,
  dateRange: DateRange | undefined,
): TimeSlotAvailability[] => {
  if (!apiData || !dateRange?.from || !dateRange?.to) {
    console.log('convertAPIDataToTimeSlots called', {
      apiData,
      dateRange,
      totalMembers,
    });
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

// 메인 컴포넌트
const TeamAvailability: React.FC<TeamAvailabilityProps> = ({ teamId, onBack }) => {
  const { teamAvailability, isLoading } = useGetTeamAvailability(teamId);
  const { data: teamInfo } = useGetMyTeam(teamId);

  const [selectedDuration, setSelectedDuration] = useState(15);

  // API 데이터의 시작일과 종료일 계산
  const initialRange = useMemo(() => {
    if (!teamAvailability) {
      // 데이터가 없으면 오늘부터 7일 후까지
      const today = new Date();
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7);
      return { from: today, to: sevenDaysLater };
    }

    // API 데이터에서 가장 빠른 날짜와 가장 늦은 날짜 찾기
    const dates = teamAvailability.map((item) => new Date(item.start_time));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    return { from: minDate, to: maxDate };
  }, [teamAvailability]);

  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  // API 데이터가 변경되면 range도 업데이트
  useEffect(() => {
    if (teamAvailability) {
      const dates = teamAvailability.map((item) => new Date(item.start_time));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      setRange({ from: minDate, to: maxDate });
    }
  }, [teamAvailability]);

  // API 데이터를 TimeSlotAvailability 형태로 변환
  const availabilityData = useMemo(() => {
    const totalMembers = teamInfo?.count || 0;
    const apiData = teamAvailability;

    return convertAPIDataToTimeSlots(apiData, totalMembers, range);
  }, [teamAvailability, teamInfo, range]);

  const handleSearch = () => {
    // TODO: 날짜 범위로 가용성 데이터 재조회
  };

  return (
    <div className="p-2 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 md:p-2">
      <div className="mx-auto max-w-5xl">
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
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-mainBlue" />
                </div>
              ) : (
                <AvailabilityGrid availabilityData={availabilityData} dateRange={range} />
              )}
            </div>
          </div>

          {/* 오른쪽: 추천 시간대 */}
          <RecommendedTimeSlots teamId={teamId} memberCount={teamInfo?.count || 0} />
        </div>
      </div>
    </div>
  );
};

export default TeamAvailability;
