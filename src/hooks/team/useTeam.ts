import { teamAPI } from '@/apis/services/team';
import type { GetTeamsResponse } from '@/apis/types/team';
import { queryKeys } from '@/lib/queryKeys';
import { useTeamStore } from '@/store/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// 팀 목록 조회 훅
const useTeam = () => {
  const { teams, setTeams } = useTeamStore();
  const { data, isLoading, error, refetch } = useQuery<GetTeamsResponse>({
    queryKey: queryKeys.teams,
    queryFn: () => teamAPI.getTeams(),
  });

  // API 데이터가 있을 때는 API 데이터를 우선으로 하고, 없을 때는 로컬 스토어 데이터 사용
  useEffect(() => {
    if (data?.content) {
      setTeams(data.content);
    }
  }, [data, setTeams]);

  const [isSetting, setIsSetting] = useState(false);

  // API 데이터가 있으면 API 데이터를 사용, 없으면 로컬 스토어 데이터 사용
  const currentTeams = data?.content ?? teams;

  return {
    teams: currentTeams,
    totalElements: data?.total_elements ?? 0,
    totalPages: data?.total_pages ?? 1,
    currentPage: data?.page ?? 1,
    isLoading,
    error,
    isSetting,
    setIsSetting,
    refetch,
  };
};

// 팀 탈퇴 훅
export const useLeaveTeam = () => {
  const queryClient = useQueryClient();

  const {
    mutate: leaveTeam,
    isPending,
    error,
  } = useMutation({
    mutationFn: (teamId: number) => teamAPI.leaveTeam(teamId),
    onSuccess: () => {
      // 팀 목록 다시 조회
      toast.success('팀 탈퇴 성공');
      queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  return {
    leaveTeam,
    isLoading: isPending,
    error,
  };
};

// 팀 삭제 훅
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteTeam,
    isPending,
    error,
  } = useMutation({
    mutationFn: (teamId: number) => teamAPI.deleteTeam(teamId),
    onSuccess: () => {
      // 팀 목록 다시 조회
      toast.success('팀 삭제 성공');
      queryClient.invalidateQueries({ queryKey: queryKeys.teams });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    deleteTeam,
    isLoading: isPending,
    error,
  };
};

export const useTeamUpcomingSchedule = (teamId: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['teamUpcomingSchedule', teamId],
    queryFn: () => teamAPI.getTeamUpcomingSchedule(teamId!),
    enabled: !!teamId,
  });
  return {
    schedules: data ?? [],
    isLoading,
    error,
  };
};

export default useTeam;
