import Button from '@/components/atoms/Button';
import SelectBox from '@/components/atoms/SelectBox';
import { mockTimeSlots } from '@/mockdata/teamData';
import SelectDurationCalendar from '@/pages/TeamCalendar/components/SelectDurationCalendar';
import '@/styles/datapicker.css';
import { generateTimeOptions } from '@/utils/timeUtils';
import React, { useState } from 'react';
import type { DateRange } from 'react-day-picker';

interface RecommendTimesProps {
  onViewAvailability?: () => void;
}

const RecommendTimes: React.FC<RecommendTimesProps> = ({ onViewAvailability }) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const timeOptions = generateTimeOptions(4);
  const [range, setRange] = useState<DateRange | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleViewMore = () => {
    onViewAvailability?.();
  };

  const handleSearch = () => {
    if (!range?.from || !range?.to) {
      alert('날짜 범위를 선택해주세요!');
      return;
    }
    alert(`선택된 기간: ${range.from.toDateString()} ~ ${range.to.toDateString()}`);
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
        <div className="p-4 rounded-lg border border-gray-200">
          <SelectDurationCalendar range={range} setRange={setRange} onSearch={handleSearch} />
        </div>
      )}
    </>
  );

  const TimeSlotCards = ({ isDesktop = false }: { isDesktop?: boolean }) => (
    <div
      className={
        isDesktop
          ? 'space-y-3'
          : 'grid grid-cols-1 gap-2 w-full transition-all duration-300 ease-out sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 sm:gap-3 lg:gap-4'
      }
    >
      {mockTimeSlots.slice(0, 4).map((slot, index) => (
        <div
          key={slot.id}
          className={
            isDesktop
              ? 'p-3 rounded-lg border border-gray-200'
              : 'p-2 min-w-0 bg-white rounded-lg border border-gray-200 transition-all duration-300 ease-out transform sm:p-3'
          }
          style={!isDesktop ? { transitionDelay: `${index * 50}ms` } : undefined}
        >
          <div className="flex gap-2 justify-between items-center">
            <div className={`font-medium text-gray-800 ${!isDesktop ? 'flex-1 min-w-0' : ''}`}>
              {slot.day}
            </div>
            <span
              className={`${
                isDesktop
                  ? 'px-2 py-1 text-xs font-medium rounded-full'
                  : 'px-1 py-0.5 sm:px-1.5 sm:py-0.5 lg:px-2 lg:py-1 text-xs font-medium rounded-full transition-all duration-200 flex-shrink-0'
              } ${slot.tag === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {slot.tag}
            </span>
          </div>
          <div
            className={`text-gray-700 font-medium ${isDesktop ? 'mt-2 text-sm' : 'mt-1 text-xs sm:mt-2'}`}
          >
            {slot.time}
          </div>
          <div
            className={`text-gray-500 ${isDesktop ? 'mt-1 text-xs' : 'mt-1 text-xs line-clamp-2'}`}
          >
            {slot.participants}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden p-6 w-full bg-white rounded-xl border shadow-lg border-mainBlue/70">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">가장 빠른 팀 일정 추천</h2>

      {/* 데스크탑 뷰 */}
      <div className="hidden xl:block">
        <SelectBox
          label="최소 요구 시간"
          value={selectedDuration}
          onChange={setSelectedDuration}
          options={timeOptions}
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
            options={timeOptions}
            className="mb-4"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-6">
          <div className="mb-3 lg:w-1/2 lg:mb-0">
            {/* 모바일: 토글 버튼 O, 태블릿: datepicker 항상 표시 , 데스크탑: 토글 버튼 O */}
            <div className="lg:hidden">
              <DatePickerSection forceShow={false} />
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
