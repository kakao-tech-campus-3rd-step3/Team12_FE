export interface User {
  user_id: string;
  name: string;
  email: string;
}

//회원가입
export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
}
export interface SignupResponse {
  //message: string;
}

//로그인
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
