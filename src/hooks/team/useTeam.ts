import { teamAPI } from '@/apis/services/team';
import type { GetTeamsResponse } from '@/apis/types/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 팀 목록 조회 훅
const useTeam = () => {
  const { data, isLoading, error } = useQuery<GetTeamsResponse>({
    queryKey: ['teams'],
    queryFn: () => teamAPI.getTeams(),
  });
  console.log('팀 목록 ', data);
  return {
    teams: data?.content ?? [],
    totalElements: data?.total_elements ?? 0,
    totalPages: data?.total_pages ?? 1,
    currentPage: data?.page ?? 1,
    isLoading,
    error,
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
      queryClient.invalidateQueries({ queryKey: ['teams'] });
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
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });

  return {
    deleteTeam,
    isLoading: isPending,
    error,
  };
};

export default useTeam;
