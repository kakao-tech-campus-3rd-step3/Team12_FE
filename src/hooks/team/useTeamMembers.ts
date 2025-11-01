import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
      queryClient.invalidateQueries({ queryKey: ['teamMembers', teamId] });
    },
  });
};
