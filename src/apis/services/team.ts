import { apiClient } from '@/apis/client/apiClients';
import { TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  createTeamRequest,
  createTeamResponse,
  joinTeamRequest,
  joinTeamResponse,
} from '@/apis/types/team';

export const teamAPI = {
  createTeam: (request: createTeamRequest): Promise<createTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.CREATE_TEAM, request);
  },
  joinTeam: (request: joinTeamRequest): Promise<joinTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.JOIN_TEAM, request);
  },
};
