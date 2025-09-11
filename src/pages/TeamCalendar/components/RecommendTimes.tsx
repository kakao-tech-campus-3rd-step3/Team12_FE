import React, { useState } from 'react';
import { mockTimeSlots } from '@/mockdata/teamData';
import TimeSelector from '@/components/atoms/TimeSelector';
import { generateTimeOptions } from '@/utils/timeUtils';

const RecommendTimes: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const timeOptions = generateTimeOptions(4);

  return (
    <div className="w-full">
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

        <div className="flex gap-4 overflow-x-auto pb-2 transition-all duration-300 ease-out">
          {mockTimeSlots.map((slot, index) => (
            <div
              key={slot.id}
              className="bg-white border border-gray-200 rounded-lg p-3 flex-shrink-0 w-80 transform transition-all duration-300 ease-out"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-800">{slot.day}</div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
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

      <div className="mt-4">
        <button
          onClick={() => {}}
          className="w-full px-4 py-3 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-blue-500 "
        >
          더 많은 시간 확인하기
        </button>
      </div>
    </div>
  );
};

export default RecommendTimes;
