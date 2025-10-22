import { useState } from 'react';
import { Users, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import TeamMembers from '@/pages/TeamCalendar/components/TeamMembers';
import UpcomingTeamSchedule from '@/pages/TeamCalendar/components/UpcomingTeamSchedule';
import RecommendTimes from '@/pages/TeamCalendar/components/RecommendTimes';

type TabType = 'members' | 'schedule' | 'recommend';

interface TeamSidebarProps {
  onViewAvailability?: () => void;
  showRecommendTab?: boolean;
}

const TeamSidebar = ({ onViewAvailability, showRecommendTab = true }: TeamSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('members');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <div className="fixed left-0 top-[60px] h-[calc(100vh-60px)] w-16 bg-white border-r border-gray-200 shadow-sm z-40 flex flex-col items-center py-4 gap-4">
        {/* 드로어 토글 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors group"
          title={isExpanded ? '사이드바 닫기' : '사이드바 열기'}
        >
          {isExpanded ? (
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
          ) : (
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
          )}
        </button>

        {/* 구분선 */}
        <div className="w-10 h-px bg-gray-200" />

        {/* 팀원 아이콘 */}
        <button
          onClick={() => handleTabClick('members')}
          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors group ${
            activeTab === 'members' ? 'bg-blue-100' : 'hover:bg-blue-50'
          }`}
          title="팀원"
        >
          <Users
            className={`w-6 h-6 ${
              activeTab === 'members' ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
            }`}
          />
        </button>

        {/* 주간 일정 아이콘 */}
        <button
          onClick={() => handleTabClick('schedule')}
          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors group ${
            activeTab === 'schedule' ? 'bg-blue-100' : 'hover:bg-blue-50'
          }`}
          title="팀 주간 일정"
        >
          <Calendar
            className={`w-6 h-6 ${
              activeTab === 'schedule' ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
            }`}
          />
        </button>

        {/* 추천 시간 아이콘 */}
        {showRecommendTab && (
          <button
            onClick={() => handleTabClick('recommend')}
            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors group ${
              activeTab === 'recommend' ? 'bg-blue-100' : 'hover:bg-blue-50'
            }`}
            title="가장 빠른 팀 일정 추천"
          >
            <Clock
              className={`w-6 h-6 ${
                activeTab === 'recommend'
                  ? 'text-blue-600'
                  : 'text-gray-600 group-hover:text-blue-600'
              }`}
            />
          </button>
        )}
      </div>

      {/* 확장된 사이드바 */}
      <div
        className={`fixed left-16 top-[60px] h-[calc(100vh-60px)] bg-white border-r border-gray-200 shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          activeTab === 'recommend' ? 'w-[480px]' : 'w-80'
        } ${isExpanded ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden p-4">
          {activeTab === 'members' && <TeamMembers />}
          {activeTab === 'schedule' && <UpcomingTeamSchedule />}
          {activeTab === 'recommend' && (
            <div className="w-full min-w-0">
              <RecommendTimes onViewAvailability={onViewAvailability} />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 bg-black/20 z-20" onClick={() => setIsExpanded(false)} />
      )}
    </>
  );
};

export default TeamSidebar;
