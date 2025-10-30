export interface CreateTeamRequest {
  team_name: string;
  team_description: string;
}
export interface CreateTeamResponse {
  team_id: number;
  team_name: string;
  team_description: string;
  team_code: string;
}

export interface JoinTeamRequest {
  invite_code: string;
}
export interface JoinTeamResponse {
  team_id: number;
  team_name: string;
  team_description: string;
}

export interface TeamMember {
  name: string;
}

export interface TeamData {
  id: number;
  team_name: string;
  members: TeamMember[];
  team_description: string;
  member_count: number;
  invite_code: string;
}

export interface GetTeamsResponse {
  content: TeamData[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface TeamMemberResponse {
  id: number;
  role: 'LEADER' | 'MEMBER';
  name: string;
}
export interface GetTeamMembersResponse {
  content: TeamMemberResponse[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}
export interface GetTeamMembersParams {
  teamId: number;
  page?: number;
  limit?: number;
}

export interface GetMyTeamInfoResponse {
  id: number;
  name: string;
  description: string;
  count: number;
  code: string;
}
