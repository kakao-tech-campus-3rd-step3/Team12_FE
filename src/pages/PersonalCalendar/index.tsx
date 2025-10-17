import Drawer from '@/components/organisms/Drawer';
import { useDeleteTeam, useLeaveTeam, useTeam } from '@/hooks/team';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import LinkStatus from '@/pages/PersonalCalendar/components/LinkStatus';
import MyClass from '@/pages/PersonalCalendar/components/MyClass';
import MyTeam from '@/pages/PersonalCalendar/components/MyTeam';
import QuickActions from '@/pages/PersonalCalendar/components/QuickActions';
import TeamSettingModal from '@/pages/PersonalCalendar/components/TeamSettingModal';
import TodaySchedule from '@/pages/PersonalCalendar/components/TodaySchedule';
import UpcomingSchedule from '@/pages/PersonalCalendar/components/UpcomingSchedule';

const PersonalCalendarPage = () => {
  const { teams, isLoading, isSetting, setIsSetting } = useTeam();
  const { leaveTeam } = useLeaveTeam();
  const { deleteTeam } = useDeleteTeam();

  return (
    <div className="flex overflow-x-hidden min-h-screen">
      {/* 사이드바 영역 - 큰 화면에서는 고정 너비 */}
      <div className="xl:w-60 xl:flex-shrink-0">
        <Drawer>
          <QuickActions />
          <MyClass />
          <MyTeam
            teams={teams}
            isLoading={isLoading}
            leaveTeam={leaveTeam}
            deleteTeam={deleteTeam}
            setIsSetting={setIsSetting}
          />
          <TodaySchedule />
        </Drawer>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex overflow-x-hidden flex-col flex-1 pb-4 bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row xl:pl-0">
        <div className="flex-1 lg:flex-[3]">
          <FullCalendar mode="personal" />
        </div>

        <div className="flex flex-col m-2 gap-8 lg:flex-[1] lg:max-w-sm">
          <UpcomingSchedule />
          <LinkStatus />
        </div>
      </div>

      {isSetting && (
        <TeamSettingModal
          isOpen={isSetting}
          teams={teams}
          onClose={() => setIsSetting(false)}
          leaveTeam={leaveTeam}
          deleteTeam={deleteTeam}
        />
      )}
    </div>
  );
};

export default PersonalCalendarPage;
