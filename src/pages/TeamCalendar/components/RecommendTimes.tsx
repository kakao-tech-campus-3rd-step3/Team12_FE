import Button from '@/components/atoms/Button';
import SelectBox from '@/components/atoms/SelectBox';
import { useGetMyTeam, useTeamRecommendTimes } from '@/hooks/team/useTeam'; // import { mockTimeSlots } from '@/mockdata/teamData';
import SelectDurationCalendar from '@/pages/TeamCalendar/components/SelectDurationCalendar';
import '@/styles/datapicker.css';
import { formatDateWithWeekday, getTimePart } from '@/utils/dateTimeUtils';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

interface RecommendTimesProps {
  onViewAvailability?: () => void;
  teamId: number;
}

const RecommendTimes: React.FC<RecommendTimesProps> = ({ onViewAvailability, teamId }) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  // const timeOptions = generateTimeOptions(0.1);
  const [range, setRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { data: currentTeam } = useGetMyTeam(teamId);
  const { teamRecommendTimes, isLoading, error } = useTeamRecommendTimes({
    teamId: teamId,
    N: 5,
    start_time: range?.from?.toISOString() || '',
    end_time: range?.to?.toISOString() || '',
    required_time: selectedDuration.toString(),
  });

  const handleViewMore = () => {
    onViewAvailability?.();
  };

  // 모든 뷰에서 사용되는 공통 컴포넌트
  const DatePickerSection = ({ forceShow = false }: { forceShow?: boolean }) => (
    <>
      {!forceShow && (
        <Button
          onClick={() => setShowDatePicker(!showDatePicker)}
          text={showDatePicker ? '날짜 선택 숨기기' : '날짜 선택하기'}
          variant="secondary"
          fullWidth={true}
          className="mb-3"
        />
      )}
      {(showDatePicker || forceShow) && (
        <div className="p-2 rounded-lg border border-gray-200">
          <SelectDurationCalendar range={range} />
        </div>
      )}
    </>
  );

  const TimeSlotCards = ({ isDesktop = false }: { isDesktop?: boolean }) => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center p-6 text-center text-gray-500">
          <p>추천 일정을 불러오는 중...</p>
          <Loader2 className="w-8 h-8 animate-spin text-mainBlue" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 text-center text-red-500">
          <p>일정을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      );
    }

    const timeSlots = (teamRecommendTimes || []).slice(0, 5);

    if (timeSlots.length === 0) {
      return (
        <div className="p-6 text-center text-gray-500">
          <p>추천 가능한 일정이 없습니다.</p>
        </div>
      );
    }

    return (
      <div
        className={
          isDesktop
            ? 'space-y-3'
            : 'grid grid-cols-1 gap-2 w-full transition-all duration-300 ease-out sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 sm:gap-3 lg:gap-4'
        }
      >
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={
              isDesktop
                ? 'p-3 rounded-lg border border-gray-200'
                : 'p-2 min-w-0 bg-white rounded-lg border border-gray-200 transition-all duration-300 ease-out transform sm:p-3'
            }
            style={!isDesktop ? { transitionDelay: `${index * 50}ms` } : undefined}
          >
            <div className="flex gap-2 justify-between items-center">
              <div className={`font-medium text-gray-800 ${!isDesktop ? 'flex-1 min-w-0' : ''}`}>
                {formatDateWithWeekday(slot.start_time)}
              </div>
              <span
                className={`${
                  isDesktop
                    ? 'px-2 py-1 text-xs font-medium rounded-full'
                    : 'px-1 py-0.5 sm:px-1.5 sm:py-0.5 lg:px-2 lg:py-1 text-xs font-medium rounded-full transition-all duration-200 flex-shrink-0'
                } ${slot.status === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {slot.status}
              </span>
            </div>
            <div
              className={`text-gray-600 text-medium ${isDesktop ? 'text-sm' : 'mt-1 text-xs sm:mt-2'}`}
            >
              {getTimePart(slot.start_time)} - {getTimePart(slot.end_time)}
            </div>
            <div
              className={`text-gray-500 ${isDesktop ? 'mt-1 text-xs' : 'mt-1 text-xs line-clamp-2'}`}
            >
              {slot.available} / {currentTeam?.count} 명
            </div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // 오늘 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 7일 후 23:59:59
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    sevenDaysLater.setHours(23, 59, 59, 999);

    setRange({ from: today, to: sevenDaysLater });
  }, []);

  return (
    <div className="overflow-hidden p-5 w-full bg-white rounded-xl border shadow-md border-mainBlue/70 xl:border-0 xl:shadow-none xl:p-1">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">가장 빠른 팀 일정 추천</h2>

      {/* 데스크탑 뷰 */}
      <div className="hidden xl:block">
        <SelectBox
          label="최소 요구 시간"
          value={selectedDuration}
          onChange={setSelectedDuration}
          options={[{ value: 60, label: '60분' }]}
        />
        <div className="flex flex-col">
          <div className="mb-3">
            <DatePickerSection />
          </div>
          <TimeSlotCards isDesktop={true} />
          <div className="mt-4">
            <Button onClick={handleViewMore} text="더 많은 시간 확인하기" fullWidth={true} />
          </div>
        </div>
      </div>

      {/* 모바일/태블릿 뷰 */}
      <div className="block xl:hidden">
        <div className="mb-4">
          <SelectBox
            label="최소 요구 시간"
            value={selectedDuration}
            onChange={setSelectedDuration}
            options={[{ value: 60, label: '60분' }]}
            className="mb-4"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="mb-3 lg:w-1/2 lg:mb-0">
            <div className="lg:hidden">
              <DatePickerSection forceShow={true} />
            </div>
            <div className="hidden lg:block xl:hidden">
              <DatePickerSection forceShow={true} />
            </div>
          </div>

          <div className="mt-1 lg:w-1/2">
            <TimeSlotCards />
            <div className="mt-4 sm:mt-6">
              <Button onClick={handleViewMore} text="더 많은 시간 확인하기" fullWidth={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendTimes;
