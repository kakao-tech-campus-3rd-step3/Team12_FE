//회원가입
export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
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

//리프레시 토큰 발급
export interface RefreshTokenRequest {
  refresh_token: string;
}
export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

//이메일 인증 코드 발송
export interface EmailSendRequest {
  email: string;
}
export interface EmailSendResponse {
  expires_at: string;
}

//사용자 정보
export interface UserInfoResponse {
  user_id: number;
  name: string;
  email: string;
}
