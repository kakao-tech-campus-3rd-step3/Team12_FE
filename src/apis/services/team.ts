import { apiClient } from '@/apis/client/apiClients';
import { TEAM_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  CreateTeamRequest,
  CreateTeamResponse,
  GetMyTeamInfoResponse,
  GetTeamAvailabilityResponse,
  GetTeamMembersParams,
  GetTeamMembersResponse,
  GetTeamRecommendTimesResponse,
  GetTeamSchedule,
  GetTeamsResponse,
  JoinTeamRequest,
  JoinTeamResponse,
} from '@/apis/types/team';
import { toLocalDateTime } from '@/utils/dateTimeUtils';

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
  // getTeamAvailability: (teamId: number): Promise<GetTeamAvailabilityResponse> => {
  //   return apiClient.get(TEAM_ENDPOINTS.GET_AVAILABILITY(teamId)).then((response) => response.data);
  // },
  getTeamAvailabilityV2: (
    teamId: number,
    slot_time?: number,
    start_time?: string,
    end_time?: string,
  ): Promise<GetTeamAvailabilityResponse> => {
    return apiClient
      .get(TEAM_ENDPOINTS.GET_AVAILABILITY_V2(teamId, slot_time, start_time, end_time))
      .then((response) => response.data);
  },

  deleteTeamMember: (teamId: number, memberId: number) => {
    return apiClient.delete(TEAM_ENDPOINTS.DELETE_TEAM_MEMBER(teamId, memberId));
  },

  getTeamUpcomingSchedule: (teamId: number): Promise<GetTeamSchedule> => {
    return apiClient
      .get(TEAM_ENDPOINTS.GET_TEAM_UPCOMING_SCHEDULE(teamId))
      .then((response) => response.data);
  },
  getTeamTodaySchedule: (teamId: number): Promise<GetTeamSchedule> => {
    return apiClient
      .get(TEAM_ENDPOINTS.GET_TEAM_TODAY_SCHEDULE(teamId))
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
  // getTeamRecommendTimes: ({
  //   teamId,
  //   N,
  //   start_time,
  //   end_time,
  //   required_time,
  // }: GetTeamRecommendTimesParams): Promise<GetTeamRecommendTimesResponse> => {
  //   // ISO 문자열을 LocalDateTime 형식으로 변환 (Z 없이)
  //   const convertedStartTime = start_time ? toLocalDateTime(new Date(start_time)) : '';
  //   const convertedEndTime = end_time ? toLocalDateTime(new Date(end_time)) : '';

  //   console.log('convertedStartTime', convertedStartTime);
  //   console.log('convertedEndTime', convertedEndTime);
  //   console.log('required_time', required_time);
  //   return apiClient
  //     .get(
  //       TEAM_ENDPOINTS.GET_TEAM_RECOMMEND_TIMES(
  //         teamId,
  //         N,
  //         convertedStartTime,
  //         convertedEndTime,
  //         required_time,
  //       ),
  //     )
  //     .then((response) => response.data);
  // },
  getTeamRecommendTimesV2: ({
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
  }): Promise<GetTeamRecommendTimesResponse> => {
    // ISO 문자열을 LocalDateTime 형식으로 변환 (Z 없이)
    const convertedStartTime = start_time ? toLocalDateTime(new Date(start_time)) : '';
    const convertedEndTime = end_time ? toLocalDateTime(new Date(end_time)) : '';

    return apiClient
      .get(
        TEAM_ENDPOINTS.GET_TEAM_RECOMMEND_TIMES_V2(
          teamId,
          N,
          convertedStartTime,
          convertedEndTime,
          required_time,
          slot_time,
        ),
      )
      .then((response) => response.data);
  },
};
