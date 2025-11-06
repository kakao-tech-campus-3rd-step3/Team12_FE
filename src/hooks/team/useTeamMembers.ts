import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { teamAPI } from '@/apis';

interface UseTeamMembersParams {
  teamId: number;
}

export const useTeamMembers = ({ teamId }: UseTeamMembersParams) => {
  return useQuery({
    queryKey: ['teamMembers', teamId],
    queryFn: () =>
      teamAPI.getTeamMembers({
        teamId,
        page: 1,
        limit: 100,
      }),
    enabled: !!teamId,
  });
};

export const useDeleteTeamMember = (teamId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => teamAPI.deleteTeamMember(teamId, memberId),
    onSuccess: () => {
      toast.error('팀원이 제거되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['teamMembers', teamId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || '팀원을 제거할 수 없습니다. 다시 시도해주세요');
    },
  });
};
