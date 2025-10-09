import { teamAPI } from '@/apis/services/team';
import type { GetTeamsResponse } from '@/apis/types/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

// 팀 목록 조회 훅
const useTeam = () => {
  const { data, isLoading, error } = useQuery<GetTeamsResponse>({
    queryKey: ['teams'],
    queryFn: () => teamAPI.getTeams(),
  });
  const [isSetting, setIsSetting] = useState(false);

  return {
    teams: data?.content ?? [],
    totalElements: data?.total_elements ?? 0,
    totalPages: data?.total_pages ?? 1,
    currentPage: data?.page ?? 1,
    isLoading,
    error,
    isSetting,
    setIsSetting,
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
      queryClient.invalidateQueries({ queryKey: ['teams'] });
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
      queryClient.invalidateQueries({ queryKey: ['teams'] });
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

export default useTeam;
