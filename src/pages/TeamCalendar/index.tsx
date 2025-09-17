import { useState } from 'react';
import Drawer from '@/components/organisms/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamListModal from '@/pages/TeamCalendar/components/TeamListModal';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/UpcomingTeamSchedule';

const TeamCalendarPage = () => {
  const [isTeamListModalOpen, setIsTeamListModalOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-70px)] flex">
      <div className="hidden transition-all duration-500 uration-500 ease-in-out bg-gradient-to-br from-blue-50 to-indigo-100 ease-in-out xl:flex">
        <Drawer>
          <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
          <UpcomingTeamSchedule />
        </Drawer>

        <div className="flex-1 transition-all duration-500 ease-in-out">
          <FullCalendar />
        </div>

        <div className="pr-4 pt-2 pl-2 w-80 transition-all duration-500 ease-in-out transform">
          <div className="transition-all duration-300 ease-out transform">
            <RecommendTimes />
          </div>
        </div>
      </div>

      {/*모바일 뷰*/}
      <div className="block min-h-screen xl:hidden">
        <div className="flex flex-col min-h-screen uration-500 ease-in-out bg-gradient-to-br from-blue-50 to-indigo-100">
          <Drawer>
            <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
            <UpcomingTeamSchedule />
          </Drawer>

          <div className="flex flex-col flex-1">
            <div className="overflow-x-auto order-b border-gray-200">
              <div className="p-2 rounded-lg border border-gray-100">
                <RecommendTimes />
              </div>
            </div>

            <div className="flex-1 p-0">
              <FullCalendar />
            </div>
          </div>
        </div>
      </div>

      <TeamListModal isOpen={isTeamListModalOpen} onClose={() => setIsTeamListModalOpen(false)} />
    </div>
  );
};

export default TeamCalendarPage;
