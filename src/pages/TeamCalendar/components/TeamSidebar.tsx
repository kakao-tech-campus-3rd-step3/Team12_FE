import { useDeleteTeamMember } from '@/hooks/team';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';
import TeamInfo from '@/pages/TeamCalendar/components/TeamInfo';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/TeamSchedule';
import { Calendar, ChevronLeft, ChevronRight, Clock, ShieldHalf } from 'lucide-react';
import { useState } from 'react';

interface TeamSidebarProps {
  onViewAvailability?: () => void;
  teamId: number;
}

type TabType = 'teamInfo' | 'upcomingSchedule' | 'recommendTimes' | null;

const TeamSidebar = ({ onViewAvailability, teamId }: TeamSidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<TabType>('teamInfo');

  const deleteTeamMemberMutation = useDeleteTeamMember(teamId);

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

  const handleDeleteMember = async (memberId: number) => {
    await deleteTeamMemberMutation.mutateAsync(memberId);
  };

  const renderContent = () => {
    switch (activeSidebarTab) {
      case 'teamInfo':
        return (
          <>
            <TeamInfo teamId={teamId} />

            <TeamMembers teamId={teamId} onDeleteMember={handleDeleteMember} />
          </>
        );
      case 'upcomingSchedule':
        return <UpcomingTeamSchedule />;
      case 'recommendTimes':
        return <RecommendTimes onViewAvailability={onViewAvailability} teamId={teamId} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col gap-2 items-center py-4 w-16 bg-white border-r border-gray-200 shadow-sm">
        <button
          onClick={handleToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 mb-2
            ${isSidebarOpen ? 'text-blue-600 bg-blue-50 cursor-pointer' : 'text-gray-600 bg-gray-50 cursor-pointer hover:bg-gray-100'}`}
          title={isSidebarOpen ? '닫기' : '열기'}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5.5 h-5.5" />
          ) : (
            <ChevronRight className="w-5.5 h-5.5" />
          )}
        </button>

        <div className="my-1 w-8 bg-gray-200" />

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
                    ? 'text-white bg-blue-600 cursor-pointer'
                    : 'text-gray-700 bg-gray-100 cursor-pointer hover:bg-blue-50 hover:text-blue-600'
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
          ${isSidebarOpen ? 'w-95' : 'w-0'}`}
      >
        <div className="overflow-y-auto p-5 h-full">
          {isSidebarOpen && activeSidebarTab && (
            <div className="transition-opacity duration-300">{renderContent()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSidebar;
