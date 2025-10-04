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
export interface SignupError {
  message: string;
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
export interface LoginError {
  message: string;
}

//리프레시 토큰 발급
export interface RefreshTokenRequest {
  refresh_token: string;
}
export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
export interface RefreshTokenError {
  message: string;
}
