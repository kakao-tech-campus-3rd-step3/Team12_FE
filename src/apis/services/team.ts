import { apiClient } from '@/apis/client/apiClients';
import { TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  GetTeamMembersResponse,
  GetTeamMembersParams,
  GetTeamsResponse,
  GetMyTeamInfoResponse,
  CreateTeamRequest,
  CreateTeamResponse,
  JoinTeamRequest,
  JoinTeamResponse,
  GetTeamUpcomingSchedule,
} from '@/apis/types/team';

export const teamAPI = {
  getTeams: (): Promise<GetTeamsResponse> => {
    return apiClient.get(TEAM_ENDPOINTS.GET_TEAMS).then((response) => response.data);
  },
  getMyTeam: (teamId: number): Promise<GetMyTeamInfoResponse> => {
    return apiClient.get(TEAM_ENDPOINTS.GET_MY_TEAM_INFO(teamId)).then((response) => response.data);
  },
  createTeam: (request: CreateTeamRequest): Promise<CreateTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.CREATE_TEAM, request);
  },
  joinTeam: (request: JoinTeamRequest): Promise<JoinTeamResponse> => {
    return apiClient.post(TEAM_ENDPOINTS.JOIN_TEAM, request);
  },
  leaveTeam: (teamId: number): Promise<void> => {
    return apiClient.delete(TEAM_ENDPOINTS.LEAVE_TEAM(teamId));
  },
  deleteTeam: (teamId: number): Promise<void> => {
    return apiClient.delete(TEAM_ENDPOINTS.DELETE_TEAM(teamId));
  },

  getTeamUpcomingSchedule: (teamId: number): Promise<GetTeamUpcomingSchedule> => {
    return apiClient
      .get(TEAM_ENDPOINTS.GET_TEAM_UPCOMING_SCHEDULE(teamId))
      .then((response) => response.data);
  },

  getTeamMembers: ({
    teamId,
    page = 1,
    limit = 10,
  }: GetTeamMembersParams): Promise<GetTeamMembersResponse> => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    return apiClient
      .get(`${TEAM_ENDPOINTS.GET_TEAM_MEMBERS(teamId)}?${params}`)
      .then((response) => response.data);
  },
};
