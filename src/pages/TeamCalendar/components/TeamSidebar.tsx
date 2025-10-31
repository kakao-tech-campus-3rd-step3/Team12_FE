import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldHalf, Calendar, Clock } from 'lucide-react';
import TeamInfo from '@/pages/TeamCalendar/components/TeamInfo';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/UpcomingTeamSchedule';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';

interface TeamSidebarProps {
  onViewAvailability?: () => void;
  teamId: number;
}

type TabType = 'teamInfo' | 'upcomingSchedule' | 'recommendTimes' | null;

const TeamSidebar = ({ onViewAvailability, teamId }: TeamSidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<TabType>('teamInfo');

  const tabs = [
    { id: 'teamInfo' as TabType, label: '팀 정보', icon: ShieldHalf },
    { id: 'upcomingSchedule' as TabType, label: '다가오는 일정', icon: Calendar },
    { id: 'recommendTimes' as TabType, label: '추천 일정', icon: Clock },
  ];

  //탭 동작
  const handleTabClick = (tabId: TabType) => {
    if (activeSidebarTab === tabId && isSidebarOpen) {
      setIsSidebarOpen(false);
      setActiveSidebarTab(null);
    } else {
      setActiveSidebarTab(tabId);
      setIsSidebarOpen(true);
    }
  };

  //토글 동작
  const handleToggle = () => {
    if (!isSidebarOpen && activeSidebarTab === null) {
      setActiveSidebarTab('teamInfo');
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSidebarTab) {
      case 'teamInfo':
        return (
          <>
            <TeamInfo teamId={teamId} />
            <TeamMembers teamId={teamId} />
          </>
        );
      case 'upcomingSchedule':
        return <UpcomingTeamSchedule />;
      case 'recommendTimes':
        return <RecommendTimes onViewAvailability={onViewAvailability} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 shadow-sm">
        <button
          onClick={handleToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 mb-2
            ${isSidebarOpen ? 'bg-blue-50 text-blue-600 cursor-pointer' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer'}`}
          title={isSidebarOpen ? '닫기' : '열기'}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5.5 h-5.5" />
          ) : (
            <ChevronRight className="w-5.5 h-5.5" />
          )}
        </button>

        <div className="w-8 bg-gray-200 my-1" />

        {/* 탭 아이콘 */}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id && isSidebarOpen;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200
                ${
                  isActive
                    ? 'bg-blue-600 text-white cursor-pointer'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                }`}
              title={tab.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* 사이드바 */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? 'w-105' : 'w-0'}`}
      >
        <div className="h-full overflow-y-auto p-5">
          {isSidebarOpen && activeSidebarTab && (
            <div className="transition-opacity duration-300">{renderContent()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSidebar;
