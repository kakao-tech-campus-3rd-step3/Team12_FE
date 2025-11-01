import { teamCalendarAPI } from '@/apis/services/calendar';
import type { RecommendTime } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import { useTeamRecommendTimes } from '@/hooks/team/useTeam';
import { formatDateTimeShort } from '@/utils/dateTimeUtils';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { toast } from 'react-toastify';

// 추천 시간대 컴포넌트
interface RecommendedTimeSlotsProps {
  teamId: number;
  memberCount: number;
  onBack?: () => void;
}

const RecommendedTimeSlots: React.FC<RecommendedTimeSlotsProps> = ({
  teamId,
  memberCount,
  onBack,
}) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [range, setRange] = useState<DateRange | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<RecommendTime | undefined>();

  const { teamRecommendTimes, isLoading, error } = useTeamRecommendTimes({
    teamId: teamId,
    N: 5,
    start_time: range?.from?.toISOString() || '',
    end_time: range?.to?.toISOString() || '',
    required_time: selectedDuration.toString(),
  });
  console.log('teamRecommendTimes', teamRecommendTimes);

  const handleSelectTimeSlot = (timeSlot: RecommendTime) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSelectClick = async (timeSlot: RecommendTime) => {
    await teamCalendarAPI.addTeamEvent({
      team_id: teamId,
      title: timeSlot.week,
      description: '',
      start_time: timeSlot.start_time,
      end_time: timeSlot.end_time,
    });
    toast.success('일정이 추가되었습니다.');
    onBack?.();
  };

  return (
    <div className="flex-shrink-0 xl:w-80">
      <div className="p-6 bg-white rounded-xl border shadow-lg border-mainBlue/70">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">추천 시간대</h2>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="space-y-3">
          {teamRecommendTimes?.map((slot, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border border-gray-200 duration-300 cursor-pointer hover:border-mainBlue animate-all ${selectedTimeSlot?.start_time === slot.start_time ? 'border-mainBlue' : ''}`}
              onClick={() => handleSelectTimeSlot(slot)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-800">{slot.week}</div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    slot.status === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.status}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {formatDateTimeShort(slot.start_time)} - {formatDateTimeShort(slot.end_time)}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {slot.available} / {memberCount} 명
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            onClick={selectedTimeSlot ? () => handleSelectClick(selectedTimeSlot) : undefined}
            text="선택"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedTimeSlots;
