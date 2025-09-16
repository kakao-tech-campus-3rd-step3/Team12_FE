import Drawer from '@/components/organisms/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import LinkStatus from '@/pages/PersonalCalendar/components/LinkStatus';
import MyClass from '@/pages/PersonalCalendar/components/MyClass';
import MyTeam from '@/pages/PersonalCalendar/components/MyTeam';
import QuickActions from '@/pages/PersonalCalendar/components/QuickActions';
import TodaySchedule from '@/pages/PersonalCalendar/components/TodaySchedule';
import UpcomingSchedule from '@/pages/PersonalCalendar/components/UpcomingSchedule';

const PersonalCalendarPage = () => {
  return (
    <div className="min-h-screen">
      <Drawer>
        <QuickActions />
        <MyClass />
        <MyTeam />
        <TodaySchedule />
      </Drawer>

      <div className="flex flex-col flex-1 pb-4 bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row">
        <div className="flex-1 lg:flex-[3]">
          <FullCalendar />
        </div>

        <div className="flex flex-col m-4 gap-8 lg:flex-[1] lg:max-w-sm">
          <UpcomingSchedule />
          <LinkStatus />
        </div>
      </div>
    </div>
  );
};

export default PersonalCalendarPage;
