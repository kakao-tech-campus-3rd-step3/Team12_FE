import Drawer from '@/components/common/Drawer/Drawer';
import TodaySchedule from '../PersonalCalendar/components/TodaySchedule';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import FullCalendar from '@/pages/Calendar/FullCalendar';

const TeamCalendarPage = () => {
  return (
    <div className="flex min-h-screen">
      <Drawer>
        <TeamMembers />
        <TodaySchedule />
      </Drawer>

      <div className="flex-1 p-0 md:ml-0">
        <FullCalendar />
      </div>
      
      <div className="w-80 p-4 bg-gray-50 border-l border-gray-200">
        <RecommendTimes />
      </div>
    </div>
  );
};

export default TeamCalendarPage;
