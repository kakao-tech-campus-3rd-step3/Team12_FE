import type { TeamData } from '@/apis/types/team';
import LinkStatus from '@/pages/PersonalCalendar/components/LinkStatus';
import MyClass from '@/pages/PersonalCalendar/components/MyClass';
import MyTeam from '@/pages/PersonalCalendar/components/MyTeam';
import TodaySchedule from '@/pages/PersonalCalendar/components/TodaySchedule';
import { BookOpen, Calendar, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useState } from 'react';

interface PersonalSideBarProps {
  teams: TeamData[];
  isLoading: boolean;
  setIsSetting: (isSetting: boolean) => void;
}

type TabType = 'myClass' | 'myTeam' | 'todaySchedule' | null;

const PersonalSideBar = ({ teams, isLoading, setIsSetting }: PersonalSideBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSidebarTab, setActiveSidebarTab] = useState<TabType>('myClass');

  const tabs = [
    // { id: 'quickActions' as TabType, label: '빠른 작업', icon: Zap },
    { id: 'myClass' as TabType, label: '내 수업', icon: BookOpen },
    { id: 'myTeam' as TabType, label: '내 팀', icon: Users },
    { id: 'todaySchedule' as TabType, label: '오늘 일정', icon: Calendar },
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
      setActiveSidebarTab('myClass');
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSidebarTab) {
      // case 'quickActions':
      //   return <QuickActions />;
      case 'myClass':
        return (
          <div className="flex flex-col gap-4">
            <LinkStatus />
            <MyClass />
          </div>
        );
      case 'myTeam':
        return <MyTeam teams={teams} isLoading={isLoading} setIsSetting={setIsSetting} />;
      case 'todaySchedule':
        return <TodaySchedule />;
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
          ${isSidebarOpen ? 'w-64' : 'w-0'}`}
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

export default PersonalSideBar;
