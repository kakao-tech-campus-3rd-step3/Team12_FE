import { UpcomingTeamScheduleList } from '@/pages/TeamCalendar/components/UpcomingTeamScheduleList';
import { TeamTodayScheduleList } from '@/pages/TeamCalendar/components//TeamTodaySchedultList';

const UpcomingTeamSchedule = () => {
  return (
    <>
      {/* 오늘 일정 섹션 */}
      <div className="overflow-hidden mb-6">
        <div className="flex gap-2 items-center mb-2">
          <h3 className="text-lg font-semibold mb-2">오늘 일정</h3>
        </div>
        <TeamTodayScheduleList />
      </div>

      {/* 다가오는 일정 섹션 */}
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
