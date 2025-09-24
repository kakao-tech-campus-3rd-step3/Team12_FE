export interface User {
  user_id: string;
  name: string;
  email: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
