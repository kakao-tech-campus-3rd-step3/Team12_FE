import { upcomingSchedule } from '@/mockdata/schedule';

export const UpcomingScheduleItem = ({ schedule }: { schedule: (typeof upcomingSchedule)[0] }) => {
  const today = new Date();
  const targetDate = new Date(schedule.date);
  const diffTime = Math.abs(targetDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div className="flex flex-row justify-between items-center p-2 bg-white rounded-lg border border-mainBlue/40">
      <div>
        <p className="text-sm font-medium text-[#1C398E]">{schedule.title}</p>
        <p className="text-xs text-mainBlue">{schedule.date}</p>
      </div>
      {diffDays < 2 ? (
        <div className="flex gap-1 items-center p-1 rounded-lg bg-red-100/80">
          <p className="text-xs text-red-500">D-{diffDays}</p>
        </div>
      ) : (
        <div className="flex gap-1 items-center p-1 rounded-lg bg-gray-100/80">
          <p className="text-xs text-gray-500">D-{diffDays}</p>
        </div>
      )}
    </div>
  );
};
