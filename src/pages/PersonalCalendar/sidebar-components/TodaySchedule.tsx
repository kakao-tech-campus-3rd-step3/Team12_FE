import { classSchedules } from '@/mockdata/schedule';
import { MapPin } from 'lucide-react';
const TodaySchedule = () => {
  return (
    <div className="px-3 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">오늘 일정</h3>
      <div className="space-y-3">
        {classSchedules.map((schedule, index) => (
          <div key={index} className="flex flex-row p-2 pl-0 bg-white rounded-lg">
            <div className="flex justify-between items-center mr-4 mb-1">
              <span className="text-sm font-medium text-mainBlue">{schedule.time}</span>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-[#1C398E]">{schedule.title}</p>
              <p className="flex gap-1 items-center text-xs text-mainBlue">
                <MapPin className="w-4 h-4" />
                {schedule.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
