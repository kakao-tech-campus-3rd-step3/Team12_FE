import Drawer from '@/components/common/Drawer/Drawer';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import FullCalendar from '@/pages/Calendar/FullCalendar';

const TeamCalendarPage = () => {
  return (
    <div className="min-h-screen">
      <div className="hidden xl:flex min-h-screen transition-all duration-500 ease-in-out">
        <Drawer>
          <TeamMembers />
        </Drawer>

        <div className="flex-1 p-0 transition-all duration-500 ease-in-out">
          <FullCalendar />
        </div>

        <div className="w-80 p-4 bg-gray-50 border-l border-gray-200 transform transition-all duration-500 ease-in-out">
          <div className="transform transition-all duration-300 ease-out">
            <RecommendTimes />
          </div>
        </div>
      </div>

      <div className="hidden lg:block xl:hidden min-h-screen transition-all duration-500 ease-in-out">
        <div className="flex min-h-screen">
          <Drawer>
            <TeamMembers />
          </Drawer>

          <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out">
            <div className="p-4 bg-gray-50 border-b border-gray-200 transform translate-y-0 transition-all duration-500 ease-out">
              <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 border border-gray-100 transform scale-100 opacity-100 transition-all duration-300 ease-out">
                <RecommendTimes />
              </div>
            </div>

            <div className="flex-1 p-0 transition-all duration-300 ease-out">
              <FullCalendar />
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden min-h-screen transition-all duration-500 ease-in-out">
        <div className="flex flex-col min-h-screen">
          <Drawer>
            <TeamMembers />
          </Drawer>

          <div className="flex-1 p-0 transition-all duration-300 ease-out">
            <FullCalendar />
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-200 transform translate-y-0 transition-all duration-500 ease-out">
            <div className="bg-white rounded-lg p-3 border border-gray-100 transform scale-100 opacity-100 transition-all duration-300 ease-out">
              <RecommendTimes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCalendarPage;
