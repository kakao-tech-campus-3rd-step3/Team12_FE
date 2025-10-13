export interface createTeamRequest {
  team_name: string;
  team_description: string;
}
export interface createTeamResponse {
  team_id: number;
  team_name: string;
  team_description: string;
  team_code: string;
}

export interface joinTeamRequest {
  invite_code: string;
}
export interface joinTeamResponse {
  team_id: number;
  team_name: string;
  team_description: string;
}

export interface TeamMember {
  name: string;
}

export interface TeamData {
  team_id: number;
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
