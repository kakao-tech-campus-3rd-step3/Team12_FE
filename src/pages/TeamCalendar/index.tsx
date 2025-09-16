import Drawer from '@/components/organisms/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamListModal from '@/pages/TeamCalendar/components/TeamListModal';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import { useState } from 'react';

const TeamCalendarPage = () => {
  const [isTeamListModalOpen, setIsTeamListModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="hidden min-h-screen transition-all duration-500 ease-in-out xl:flex">
        <Drawer>
          <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
        </Drawer>

        <div className="flex-1 p-0 transition-all duration-500 ease-in-out">
          <FullCalendar />
        </div>

        <div className="p-2 w-80 bg-gray-50 border-l border-gray-200 transition-all duration-500 ease-in-out transform">
          <div className="transition-all duration-300 ease-out transform">
            <RecommendTimes />
          </div>
        </div>
      </div>

      {/*모바일 뷰*/}
      <div className="block min-h-screen xl:hidden">
        <div className="flex flex-col min-h-screen">
          <Drawer>
            <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
          </Drawer>

          <div className="flex flex-col flex-1">
            <div className="overflow-x-auto p-2 bg-gray-50 border-b border-gray-200">
              <div className="p-4 bg-white rounded-lg border border-gray-100">
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
