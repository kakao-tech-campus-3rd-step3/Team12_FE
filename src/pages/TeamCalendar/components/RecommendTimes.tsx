import React, { useState } from 'react';
import { mockTimeSlots } from '@/mockdata/teamData';

const generateTimeOptions = () => {
  const options = [];
  for (let hours = 0; hours <= 4; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      if (hours === 0 && minutes === 0) continue;
      if (hours === 4 && minutes > 0) break;

      const totalMinutes = hours * 60 + minutes;
      let label = '';

      if (hours > 0) {
        label += `${hours}시간`;
      }
      if (minutes > 0) {
        if (hours > 0) label += ' ';
        label += `${minutes}분`;
      }

      options.push({ value: totalMinutes, label });
    }
  }
  return options;
};

const RecommendTimes: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const timeOptions = generateTimeOptions();

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">가장 빠른 팀 일정 추천</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">최소 요구 시간</label>
        <div className="relative">
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
            className="w-full px-3 py-3 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {mockTimeSlots.map((slot) => (
          <div key={slot.id} className="bg-white border border-gray-200 rounded-lg p-3">
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
