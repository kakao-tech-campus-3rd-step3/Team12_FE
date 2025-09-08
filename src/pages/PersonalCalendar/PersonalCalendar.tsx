import Drawer from '@/components/common/Drawer/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import TodaySchedule from '@/pages/PersonalCalendar/components/TodaySchedule';

const PersonalCalendarPage = () => {
  return (
    <div className="flex min-h-screen">
      <Drawer>
        <TodaySchedule />
      </Drawer>

      <div className="flex-1 p-0 md:ml-0">
        <FullCalendar />
      </div>
    </div>
  );
};

export default PersonalCalendarPage;
