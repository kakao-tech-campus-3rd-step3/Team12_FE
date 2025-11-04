import Drawer from '@/components/organisms/Drawer';
import { useDeleteTeam, useLeaveTeam, useTeam } from '@/hooks/team';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import LinkStatus from '@/pages/PersonalCalendar/components/LinkStatus';
import MyClass from '@/pages/PersonalCalendar/components/MyClass';
import MyTeam from '@/pages/PersonalCalendar/components/MyTeam';
import PersonalSideBar from '@/pages/PersonalCalendar/components/PersonalSideBar';
import TeamListModal from '@/pages/PersonalCalendar/components/TeamListModal';
import TodaySchedule from '@/pages/PersonalCalendar/components/TodaySchedule';
import UpcomingSchedule from '@/pages/PersonalCalendar/components/UpcomingSchedule';
import { useClassStore } from '@/store/calendar/useClassStore';
import { useEffect } from 'react';

const PersonalCalendarPage = () => {
  const { teams, isLoading, isSetting, setIsSetting } = useTeam();
  const { leaveTeam } = useLeaveTeam();
  const { deleteTeam } = useDeleteTeam();
  const { lectures, lectureNames, getLectures } = useClassStore();

  useEffect(() => {
    void getLectures();
  }, [getLectures]);

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 데스크톱 뷰 */}
      <div className="hidden xl:flex h-[calc(100vh-70px)]">
        <PersonalSideBar
          lectures={lectures ?? []}
          lectureNames={lectureNames ?? []}
          teams={teams}
          isLoading={isLoading}
          setIsSetting={setIsSetting}
        />
        <div className="flex overflow-x-hidden flex-1">
          <div className="flex-1 lg:flex-[3]">
            <FullCalendar mode="personal" />
          </div>
          <div className="flex flex-col m-2 gap-8 lg:flex-[1] lg:max-w-sm">
            <UpcomingSchedule />
            {/* <LinkStatus /> */}
          </div>
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className="block min-h-screen xl:hidden">
        <div className="flex overflow-x-hidden flex-col min-h-screen">
          <div className="xl:w-60 xl:flex-shrink-0">
            <Drawer>
              {/* <QuickActions /> */}
              <LinkStatus />
              <MyClass lectures={lectures ?? []} lectureNames={lectureNames ?? []} />
              <MyTeam teams={teams} isLoading={isLoading} setIsSetting={() => setIsSetting(true)} />
              <TodaySchedule />
            </Drawer>
          </div>

          <div className="flex overflow-x-hidden flex-col flex-1 pb-4 bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row xl:pl-0">
            <div className="flex-1 lg:flex-[3]">
              <FullCalendar mode="personal" />
            </div>

            <div className="flex flex-col m-2 gap-8 lg:flex-[1] lg:max-w-sm">
              <UpcomingSchedule />
              {/* <LinkStatus /> */}
            </div>
          </div>
        </div>
      </div>

      {isSetting && (
        <TeamListModal
          leaveTeam={leaveTeam}
          deleteTeam={deleteTeam}
          isOpen={isSetting}
          onClose={() => setIsSetting(false)}
        />
      )}
    </div>
  );
};

export default PersonalCalendarPage;
