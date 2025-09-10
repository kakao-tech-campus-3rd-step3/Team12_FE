import Drawer from '@/components/common/Drawer/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import LinkStatus from '@/pages/PersonalCalendar/LinkStatus/LinkStatus';
import MyClass from '@/pages/PersonalCalendar/sidebar-components/MyClass';
import MyTeam from '@/pages/PersonalCalendar/sidebar-components/MyTeam';
import QuickActions from '@/pages/PersonalCalendar/sidebar-components/QuickActions';
import TodaySchedule from '@/pages/PersonalCalendar/sidebar-components/TodaySchedule';
import UpcomingSchedule from '@/pages/PersonalCalendar/UpcomingSchedule/UpcomingSchedule';
const PersonalCalendarPage = () => {
  return (
    <div className="flex min-h-screen">
      <Drawer>
        <QuickActions />
        <MyClass />
        <MyTeam />
        <TodaySchedule />
      </Drawer>

      <div className="flex flex-col flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row">
        <div className="flex-1 lg:flex-[3]">
          <FullCalendar />
        </div>

        <div className="flex flex-col m-4 gap-4 lg:flex-[1] lg:max-w-sm">
          <UpcomingSchedule />
          <LinkStatus />
        </div>
      </div>
    </div>
  );
};

export default PersonalCalendarPage;
