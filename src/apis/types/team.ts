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
