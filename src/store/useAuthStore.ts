import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/apis/index';
import type { LoginRequest, SignupRequest, UserInfoResponse } from '@/apis';

interface AuthState {
  user: UserInfoResponse | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;

  signup: (userData: SignupRequest) => Promise<void>;
  login: (credentials: LoginRequest) => Promise<void>;
  getRefreshToken: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      //초기 상태
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      error: null,

      //회원가입
      signup: (userData: SignupRequest) => {
        set({ error: null });
        return authAPI
          .signup(userData)
          .then(() => {
            set({ error: null });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || '회원가입에 실패했습니다';
            set({ error: errorMessage });
            throw error;
          });
      },

      //로그인
      login: (credentials: LoginRequest) => {
        set({ error: null });
        return authAPI
          .login(credentials)
          .then((response) => {
            const { access_token, refresh_token } = response.data;
            const user: UserInfoResponse = {
              user_id: '1',
              name: 'User',
              email: credentials.email,
            };
            set({
              user,
              isAuthenticated: true,
              accessToken: access_token,
              refreshToken: refresh_token,
              error: null,
            });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || '로그인에 실패했습니다';
            set({ error: errorMessage });
            throw error;
          });
      },

      //토큰 갱신
      getRefreshToken: () => {
        const { refreshToken } = get();

        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다!');
        }
        return authAPI
          .refreshToken(refreshToken)
          .then((response) => {
            const { access_token, refresh_token } = response.data;
            set({
              accessToken: access_token,
              refreshToken: refresh_token,
              error: null,
            });
          })
          .catch((error) => {
            set({
              user: null,
              isAuthenticated: false,
              accessToken: null,
              refreshToken: null,
              error: '세션이 만료되었습니다. 다시 로그인해주세요.',
            });
            throw error;
          });
      },

      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken });
      },

      //사용자 정보 조회
      getUserInfo: () => {
        return authAPI
          .getUserInfo()
          .then((response) => {
            const userData: UserInfoResponse = response.data;
            set({ user: userData, error: null });
          })
          .catch((error) => {
            throw error;
          });
      },

      //로그아웃
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          error: null,
        });
      },
    }),
    { name: 'auth-storage' },
  ),
);
