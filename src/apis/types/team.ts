//팀 생성
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

//팀 가입
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

//단일 팀 정보 조회
export interface TeamData {
  id: number;
  team_name: string;
  members: TeamMember[];
  team_description: string;
  member_count: number;
  invite_code: string;
}

//팀 목록 조회
export interface GetTeamsResponse {
  content: TeamData[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

//팀 다가오는 일정, 오늘 일정
export interface TeamSchedule {
  event_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
  is_recurring: boolean;
}
export type GetTeamSchedule = TeamSchedule[];

//팀
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

export interface GetTeamAvailabilityResponse {
  available: Availability[];
}
export interface Availability {
  start_time: string;
  end_time: string;
  available_member: number;
}
