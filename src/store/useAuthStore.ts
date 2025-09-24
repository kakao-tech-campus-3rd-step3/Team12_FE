import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '@/apis/index';
import type { LoginRequest, User } from '@/apis/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;

  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //초기 상태
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      error: null,

      //로그인
      login: (credentials: LoginRequest) => {
        set({ error: null });
        return authAPI
          .login(credentials)
          .then((response) => {
            const { access_token, refresh_token } = response.data;
            const user: User = {
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
