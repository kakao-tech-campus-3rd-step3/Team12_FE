import { AlarmClock } from 'lucide-react';
import { UpcomingScheduleList } from './UpcomingScheduleList';

const UpcomingSchedule = () => {
  return (
    <div className="overflow-hidden p-6 bg-white rounded-xl border shadow-lg border-mainBlue/70">
      <div className="flex gap-2 items-center mb-2">
        <AlarmClock className="w-4 h-4 text-mainBlue" />
        <h3 className="text-lg font-semibold text-mainBlue">다가오는 일정</h3>
      </div>
      <UpcomingScheduleList />
    </div>
  );
};

export default UpcomingSchedule;
