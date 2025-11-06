import { useParams } from 'react-router-dom';
import { useTeamUpcomingSchedule } from '@/hooks/team';
import { useTeamStore } from '@/store/team';
import { UpcomingTeamScheduleItem } from '@/pages/TeamCalendar/components/UpcomingTeamScheduleItem';

export const UpcomingTeamScheduleList = () => {
  const { currentTeam } = useTeamStore();
  const { id: urlTeamId } = useParams<{ id: string }>();
  const teamId = currentTeam?.id ?? (urlTeamId ? Number(urlTeamId) : null);

  const { schedules, isLoading, error } = useTeamUpcomingSchedule(teamId);

  if (isLoading) {
    return <div className="text-center text-sm text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center text-sm text-red-500">일정을 불러오는데 실패했습니다.</div>;
  }

  if (schedules.length === 0) {
    return <div className="text-center text-sm text-gray-500">예정된 일정이 없습니다.</div>;
  }

  return (
    <div className="space-y-2">
      {schedules.map((schedule) => (
        <UpcomingTeamScheduleItem key={schedule.event_id} schedule={schedule} />
      ))}
    </div>
  );
};
