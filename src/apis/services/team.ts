import { apiClient } from '@/apis/client/apiClients';
import { TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  getTeamsResponse,
  getMyTeamInfoResponse,
  createTeamRequest,
  createTeamResponse,
  joinTeamRequest,
  joinTeamResponse,
} from '@/apis/types/team';

export const teamAPI = {
  getTeams: (): Promise<getTeamsResponse> => {
    return apiClient.get(TEAM_ENDPOINTS.GET_TEAMS).then((response) => response.data);
  },
  getMyTeam: (teamId: number): Promise<getMyTeamInfoResponse> => {
    return apiClient.get(TEAM_ENDPOINTS.GET_MY_TEAM_INFO(teamId)).then((response) => response.data);
  },
  createTeam: (request: createTeamRequest): Promise<createTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.CREATE_TEAM, request);
  },
  joinTeam: (request: joinTeamRequest): Promise<joinTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.JOIN_TEAM, request);
  },
  leaveTeam: (teamId: number): Promise<void> => {
    return apiClient.delete(TEAM_ENDPOINTS.LEAVE_TEAM(teamId));
  },
  deleteTeam: (teamId: number): Promise<void> => {
    return apiClient.delete(TEAM_ENDPOINTS.DELETE_TEAM(teamId));
  },
};
