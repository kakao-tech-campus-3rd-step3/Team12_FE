import Drawer from '@/components/organisms/Drawer';
import { useTeamChat } from '@/hooks/team/useTeamChat';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamAvailability from '@/pages/TeamCalendar/components/TeamAvailability/TeamAvailability';
import TeamChat from '@/pages/TeamCalendar/components/TeamChat';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/TeamSchedule';
import TeamSidebar from '@/pages/TeamCalendar/components/TeamSidebar';
import { MessageCircleMore, X } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const TeamCalendarPage = () => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const { id } = useParams<{ id: string }>();
  const teamId = id ? Number(id) : 0;

  const chatData = useTeamChat(teamId, showChat);
  const { unReadCount, markAsRead } = chatData;

  const handleChatReadTag = () => {
    if (!showChat) {
      markAsRead();
    }
    setShowChat(!showChat);
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="hidden transition-all duration-500 ease-in-out xl:flex h-[calc(100vh-70px)]">
        {!showAvailability && (
          <TeamSidebar teamId={teamId} onViewAvailability={() => setShowAvailability(true)} />
        )}
        {!showAvailability ? (
          <>
            <div className="flex-1 transition-all duration-500 ease-in-out">
              <FullCalendar mode="team" />
            </div>
          </>
        ) : (
          <div className="flex-1 transition-all duration-500 ease-in-out">
            <TeamAvailability teamId={teamId} onBack={() => setShowAvailability(false)} />
          </div>
        )}
      </div>

      {/*플로팅 버튼 - 채팅 */}
      <button
        onClick={handleChatReadTag}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-3xl hover:scale-103 transition-all flex items-center justify-center z-50 cursor-pointer ${
          showChat
            ? 'bg-gray-100 shadow-[0_10px_40px_rgb(0,0,0,0.2)]'
            : 'bg-blue-600 shadow-[0_10px_40px_rgb(0,0,0,0.2)]'
        }`}
      >
        {showChat ? (
          <X className="w-7 h-7 text-gray-500 font-bold stroke-[2.5]" />
        ) : (
          <>
            <MessageCircleMore className="w-7 h-7 text-white" />
            {unReadCount > 0 && (
              <div className="flex absolute -top-1 -right-1 justify-center items-center px-1 h-5 bg-red-500 rounded-full min-w-5">
                <span className="text-xs text-white">{unReadCount > 99 ? '99+' : unReadCount}</span>
              </div>
            )}
          </>
        )}
      </button>

      {showChat && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 w-[90%] sm:w-90 h-[600px] z-50">
          <TeamChat teamId={teamId} chatData={chatData} />
        </div>
      )}

      {/*모바일 뷰*/}
      <div className="block min-h-screen xl:hidden">
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 duration-500 ease-in-out">
          <Drawer>
            <TeamMembers teamId={teamId} />
            <UpcomingTeamSchedule />
          </Drawer>

          {!showAvailability ? (
            <div className="flex flex-col flex-1">
              <div className="overflow-x-auto border-b border-gray-200">
                <div className="p-2 rounded-lg border border-gray-100">
                  <RecommendTimes
                    onViewAvailability={() => setShowAvailability(true)}
                    teamId={teamId}
                  />
                </div>
              </div>

              <div className="flex-1 p-0">
                <FullCalendar mode="team" />
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <TeamAvailability teamId={teamId} onBack={() => setShowAvailability(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCalendarPage;
