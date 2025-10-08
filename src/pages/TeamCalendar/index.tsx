import Drawer from '@/components/organisms/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamAvailability from '@/pages/TeamCalendar/components/TeamAvailability';
import TeamListModal from '@/pages/TeamCalendar/components/TeamListModal';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/UpcomingTeamSchedule';
import { useState } from 'react';

const TeamCalendarPage = () => {
  const [isTeamListModalOpen, setIsTeamListModalOpen] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="hidden transition-all duration-500 ease-in-out xl:flex">
        <Drawer>
          <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
          <UpcomingTeamSchedule />
        </Drawer>

        {!showAvailability ? (
          <>
            <div className="flex-1 transition-all duration-500 ease-in-out">
              <FullCalendar mode="team" />
            </div>

            <div className="px-2 py-2 pr-4 w-[400px] transition-all duration-500 ease-in-out transform">
              <div className="transition-all duration-300 ease-out transform">
                <RecommendTimes onViewAvailability={() => setShowAvailability(true)} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 transition-all duration-500 ease-in-out">
            <TeamAvailability onBack={() => setShowAvailability(false)} />
          </div>
        )}
      </div>

      {/*모바일 뷰*/}
      <div className="block min-h-screen xl:hidden">
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ease-in-out uration-500">
          <Drawer>
            <TeamMembers onSettingsClick={() => setIsTeamListModalOpen(true)} />
            <UpcomingTeamSchedule />
          </Drawer>

          {!showAvailability ? (
            <div className="flex flex-col flex-1">
              <div className="overflow-x-auto border-gray-200 order-b">
                <div className="p-2 rounded-lg border border-gray-100">
                  <RecommendTimes onViewAvailability={() => setShowAvailability(true)} />
                </div>
              </div>

              <div className="flex-1 p-0">
                <FullCalendar mode="team" />
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <TeamAvailability onBack={() => setShowAvailability(false)} />
            </div>
          )}
        </div>
      </div>

      <TeamListModal isOpen={isTeamListModalOpen} onClose={() => setIsTeamListModalOpen(false)} />
    </div>
  );
};

export default TeamCalendarPage;
