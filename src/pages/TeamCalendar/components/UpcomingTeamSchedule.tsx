import { UpcomingTeamScheduleList } from '@/pages/TeamCalendar/components/UpcomingTeamScheduleList';

const UpcomingTeamSchedule = () => {
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex gap-2 items-center mb-2">
          <h3 className="text-lg font-semibold mb-2">다가오는 일정</h3>
        </div>
        <UpcomingTeamScheduleList />
      </div>
    </>
  );
};

export default UpcomingTeamSchedule;
