import React, { useState } from 'react';
import { mockTimeSlots } from '@/mockdata/teamData';
import TimeSelector from '@/components/atoms/SelectBox';
import Button from '@/components/atoms/Button';
import { generateTimeOptions } from '@/utils/timeUtils';

const RecommendTimes: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const timeOptions = generateTimeOptions(4);

  return (
    <div className="w-full bg-white overflow-hidden p-6 rounded-xl border shadow-lg border-mainBlue/70">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">가장 빠른 팀 일정 추천</h2>

      <div className="xl:block hidden">
        <TimeSelector
          label="최소 요구 시간"
          value={selectedDuration}
          onChange={setSelectedDuration}
          options={timeOptions}
        />

        <div className="space-y-3">
          {mockTimeSlots.map((slot) => (
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-800">{slot.day}</div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    slot.tag === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.tag}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2 font-medium">{slot.time}</div>
              <div className="text-xs text-gray-500 mt-1">{slot.participants}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:hidden block">
        <div className="mb-4">
          <TimeSelector
            label="최소 요구 시간"
            value={selectedDuration}
            onChange={setSelectedDuration}
            options={timeOptions}
            className="mb-4"
          />
        </div>

        {/* 반응형 카드 레이아웃 */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 ease-out">
          {mockTimeSlots.map((slot, index) => (
            <div
              key={slot.id}
              className="min-w-0 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 transform transition-all duration-300 ease-out min-w-0"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex justify-between items-center gap-2">
                <div className="font-medium text-gray-800 flex-1 min-w-0">{slot.day}</div>
                <span
                  className={`px-1 py-0.5 sm:px-1.5 sm:py-0.5 lg:px-2 lg:py-1 text-xs font-medium rounded-full transition-all duration-200 flex-shrink-0 ${
                    slot.tag === '최적' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {slot.tag}
                </span>
              </div>
              <div className="text-xs text-gray-700 mt-1 sm:mt-2 font-medium">{slot.time}</div>
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{slot.participants}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <Button onClick={() => {}} text="더 많은 시간 확인하기" fullWidth={true} />
      </div>
    </div>
  );
};

export default RecommendTimes;
