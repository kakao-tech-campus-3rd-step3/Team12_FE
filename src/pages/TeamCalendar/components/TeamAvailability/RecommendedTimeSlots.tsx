import { teamCalendarAPI } from '@/apis/services/calendar';
import type { RecommendTime } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import type { FormData } from '@/hooks/calendar/useFormData';
import { useTeamRecommendTimes } from '@/hooks/team/useTeam';
import DateModal from '@/pages/Calendar/components/DateModal';
import type { CalendarEvent } from '@/types/calendar';
import { formatDateTimeShort } from '@/utils/dateTimeUtils';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';

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
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(true);
    setSelectedTimeSlot(timeSlot);
  };

  const handleAddEvent = async (
    timeSlot: RecommendTime,
    event: Omit<CalendarEvent, 'event_id'>,
    formData: FormData,
  ) => {
    await teamCalendarAPI.addTeamEvent({
      team_id: teamId,
      title: event.title,
      description: event.description,
      start_time: timeSlot.start_time,
      end_time: timeSlot.end_time,
    });
    setIsOpen(false);
    onBack?.();
  };

  const handleSaveEvent = (event: Omit<CalendarEvent, 'event_id'>, formData: FormData) => {
    if (!selectedTimeSlot) return;
    console.log('event', event);
    console.log('formData', formData);
    handleAddEvent(selectedTimeSlot, event, formData);
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
              <div className="flex justify-between items-center mb-1">
                <div className="text-md font-medium text-gray-800">
                  {formatDateWithWeekday(slot.start_time)}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    slot.status === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.status}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {getTimePart(slot.start_time)} - {getTimePart(slot.end_time)}
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
      <DateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalType="add"
        initialStartTime={selectedTimeSlot?.start_time}
        initialEndTime={selectedTimeSlot?.end_time}
        onSave={(event: Omit<CalendarEvent, 'event_id'>, formData: FormData) =>
          handleSaveEvent(event, formData)
        }
      />
    </div>
  );
};

export default RecommendedTimeSlots;
