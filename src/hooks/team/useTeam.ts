import { teamAPI } from '@/apis/services/team';
import type {
  GetMyTeamInfoResponse,
  GetTeamAvailabilityResponse,
  GetTeamRecommendTimesResponse,
  GetTeamsResponse,
} from '@/apis/types/team';
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

  useEffect(() => {
    if (data?.content) {
      setTeams(data.content);
    }
  }, [data, setTeams]);

  const [isSetting, setIsSetting] = useState(false);
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
      toast.error('팀에서 탈퇴하였습니다.');
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
      toast.error('팀이 삭제되었습니다');
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

// ✅ 추가된 훅들 (모두 유지)
export const useGetMyTeam = (teamId: number) => {
  const { data, isLoading, error } = useQuery<GetMyTeamInfoResponse>({
    queryKey: queryKeys.team(teamId),
    queryFn: () => teamAPI.getMyTeam(teamId),
  });
  return {
    data,
    isLoading,
    error,
  };
};

export const useGetTeamAvailability = (teamId: number) => {
  const {
    data: teamAvailability,
    isLoading,
    error,
  } = useQuery<GetTeamAvailabilityResponse>({
    queryKey: queryKeys.teamAvailability,
    queryFn: () => teamAPI.getTeamAvailabilityV2(teamId),
  });
  return {
    teamAvailability,
    isLoading,
    error,
  };
};

export const useTeamUpcomingSchedule = (teamId: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.teamUpcomingSchedule(teamId!),
    queryFn: () => teamAPI.getTeamUpcomingSchedule(teamId!),
    enabled: !!teamId,
  });
  return {
    schedules: data ?? [],
    isLoading,
    error,
  };
};

export const useTeamTodaySchedule = (teamId: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.teamTodaySchedule(teamId!),
    queryFn: () => teamAPI.getTeamTodaySchedule(teamId!),
    enabled: !!teamId,
  });
  return {
    schedules: data ?? [],
    isLoading,
    error,
  };
};

// export const useTeamRecommendTimes = ({
//   teamId,
//   N,
//   start_time,
//   end_time,
//   required_time,
// }: GetTeamRecommendTimesParams) => {
//   const {
//     data: teamRecommendTimes,
//     isLoading,
//     error,
//   } = useQuery<GetTeamRecommendTimesResponse>({
//     queryKey: queryKeys.teamRecommendTimes(teamId, start_time, end_time, 15, required_time),
//     queryFn: () =>
//       teamAPI.getTeamRecommendTimes({ teamId, N, start_time, end_time, required_time }),
//     enabled: !!start_time && !!end_time && !!teamId,
//   });

//   return {
//     teamRecommendTimes,
//     isLoading,
//     error,
//   };
// };

export const useTeamRecommendTimesV2 = ({
  teamId,
  N,
  start_time,
  end_time,
  required_time,
  slot_time = 15,
}: {
  teamId: number;
  N: number;
  start_time: string;
  end_time: string;
  required_time: string;
  slot_time?: number;
}) => {
  const {
    data: teamRecommendTimesV2,
    isLoading,
    error,
  } = useQuery<GetTeamRecommendTimesResponse>({
    queryKey: queryKeys.teamRecommendTimes(teamId, start_time, end_time, slot_time, required_time),
    queryFn: () =>
      teamAPI.getTeamRecommendTimesV2({
        teamId,
        N,
        start_time,
        end_time,
        required_time,
        slot_time,
      }),
    enabled: !!start_time && !!end_time && !!teamId,
  });
  return {
    teamRecommendTimesV2,
    isLoading,
    error,
  };
};
export default useTeam;
