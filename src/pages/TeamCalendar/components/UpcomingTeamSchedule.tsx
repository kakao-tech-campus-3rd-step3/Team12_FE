import { UpcomingTeamScheduleList } from '@/pages/TeamCalendar/components/UpcomingTeamScheduleList';

const UpcomingTeamSchedule = () => {
  return (
    <>
      <div className="overflow-hidden rounded-xl">
        <div className="flex flex-col gap-2 mb-2">
          <h3 className="text-lg font-semibold">팀 주간 일정</h3>
          <UpcomingTeamScheduleList />
        </div>
      </div>
    </>
  );
};

export default UpcomingTeamSchedule;
