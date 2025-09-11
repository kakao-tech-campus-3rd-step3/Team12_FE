import { useState } from 'react';
import Drawer from '@/components/common/Drawer/Drawer';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import TeamListModal from '@/pages/TeamCalendar/components/TeamListModal/TeamListModal';

const TeamCalendarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="hidden xl:flex min-h-screen transition-all duration-500 ease-in-out">
        <Drawer>
          <TeamMembers onSettingsClick={() => setIsModalOpen(true)} />
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

      {/*모바일 뷰*/}
      <div className="xl:hidden block min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Drawer>
            <TeamMembers onSettingsClick={() => setIsModalOpen(true)} />
          </Drawer>

          <div className="flex-1 flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-gray-200 overflow-x-auto">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <RecommendTimes />
              </div>
            </div>

            <div className="flex-1 p-0">
              <FullCalendar />
            </div>
          </div>
        </div>
      </div>

      <TeamListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default TeamCalendarPage;
