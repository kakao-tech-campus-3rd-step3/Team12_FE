import { useParams } from 'react-router-dom';
import { useTeamTodaySchedule } from '@/hooks/team';
import { useTeamStore } from '@/store/team';
import type { TeamSchedule } from '@/apis';
import { TeamTodayScheduleItem } from '@/pages/TeamCalendar/components/TeamTodaySchedule';

// 시작 시간 기준 오름차순 정렬
const sortByStartTime = (schedules: TeamSchedule[]) => {
  return [...schedules].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );
};

export const TeamTodayScheduleList = () => {
  const { currentTeam } = useTeamStore();
  const { id: urlTeamId } = useParams<{ id: string }>();
  const teamId = currentTeam?.id ?? (urlTeamId ? Number(urlTeamId) : null);

  const { schedules, isLoading, error } = useTeamTodaySchedule(teamId);

  if (isLoading) {
    return <div className="text-center text-sm text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center text-sm text-red-500">일정을 불러오는데 실패했습니다.</div>;
  }

  if (schedules.length === 0) {
    return <div className="text-center text-sm text-gray-500">오늘 일정이 없습니다.</div>;
  }

  const sortedSchedules = sortByStartTime(schedules);

  return (
    <div className="space-y-2">
      {sortedSchedules.map((schedule) => (
        <TeamTodayScheduleItem key={schedule.event_id} schedule={schedule} />
      ))}
    </div>
  );
};
