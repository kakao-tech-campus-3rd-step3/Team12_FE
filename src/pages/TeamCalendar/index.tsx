import { useState } from 'react';
import { MessageCircleMore, X } from 'lucide-react';
import Drawer from '@/components/organisms/Drawer';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamAvailability from '@/pages/TeamCalendar/components/TeamAvailability';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/UpcomingTeamSchedule';
import TeamChat from '@/pages/TeamCalendar/components/TeamChat';
import TeamSidebar from '@/pages/TeamCalendar/components/TeamSidebar';

const TeamCalendarPage = () => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* 데스크톱 뷰 (xl 이상) */}
      <div className="hidden xl:flex min-h-[calc(100vh-60px)] bg-white overflow-hidden">
        {/* 왼쪽 사이드바 - 추천 탭 포함 */}
        <TeamSidebar onViewAvailability={() => setShowAvailability(true)} showRecommendTab={true} />
        <div
          className={`flex-1 ml-16 transition-all duration-300 ease-in-out overflow-hidden ${
            showChat ? 'mr-[400px]' : 'mr-0'
          }`}
        >
          {!showAvailability ? (
            <div className="w-full h-full transition-all duration-500 ease-in-out overflow-auto">
              <FullCalendar mode="team" />
            </div>
          ) : (
            <div className="flex-1 transition-all duration-500 ease-in-out">
              <TeamAvailability onBack={() => setShowAvailability(false)} />
            </div>
          )}
        </div>
      </div>

      {/* 태블릿 뷰 (lg ~ xl) */}
      <div className="hidden lg:flex xl:hidden min-h-[calc(100vh-60px)] bg-white overflow-hidden">
        <TeamSidebar onViewAvailability={() => setShowAvailability(true)} showRecommendTab={true} />
        <div
          className={`flex-1 ml-16 transition-all duration-300 ease-in-out overflow-hidden ${
            showChat ? 'mr-[400px]' : 'mr-0'
          }`}
        >
          {!showAvailability ? (
            <div className="w-full h-full transition-all duration-500 ease-in-out overflow-auto">
              <FullCalendar mode="team" />
            </div>
          ) : (
            <div className="flex-1 transition-all duration-500 ease-in-out">
              <TeamAvailability onBack={() => setShowAvailability(false)} />
            </div>
          )}
        </div>
      </div>

      {/*플로팅 버튼 - 채팅 */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={`hidden lg:flex fixed bottom-6 right-6 w-14 h-14 rounded-3xl hover:scale-103 transition-all items-center justify-center z-50 cursor-pointer ${
          showChat
            ? 'bg-gray-100 shadow-[0_10px_40px_rgb(0,0,0,0.2)]'
            : 'bg-blue-600 shadow-[0_10px_40px_rgb(0,0,0,0.2)]'
        }`}
      >
        {showChat ? (
          <X className="w-7 h-7 text-gray-500 font-bold stroke-[2.5]" />
        ) : (
          <MessageCircleMore className="w-7 h-7 text-white" />
        )}
      </button>

      {/* 채팅창 */}
      {showChat && (
        <div className="fixed top-[80px] right-6 w-[360px] h-[calc(100vh-180px)] z-40 hidden lg:block">
          <TeamChat />
        </div>
      )}

      {/*모바일 뷰*/}
      <div className="block min-h-screen lg:hidden">
        <div className="flex flex-col min-h-screen bg-white ease-in-out uration-500">
          <Drawer>
            <TeamMembers />
            <UpcomingTeamSchedule />
          </Drawer>

          {!showAvailability ? (
            <div className="flex flex-col flex-1">
              <div className="p-2">
                <RecommendTimes onViewAvailability={() => setShowAvailability(true)} />
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
    </div>
  );
};

export default TeamCalendarPage;
