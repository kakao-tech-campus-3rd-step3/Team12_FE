import axios from 'axios';
import { API_BASE_URL } from '@/apis/constants/endpoints';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//요청 interceptor
apiClient.interceptors.request.use(
  (config) => {
    //zustand에서 토큰 가져오기
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.accessToken) {
          config.headers.Authorization = `Bearer ${state.accessToken}`;
        }
      } catch (error) {
        //콘솔
        console.error('토큰 파싱 에러:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//응답 interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //localStorage에서 리프레시 토큰 가져오기
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) throw new Error('인증 정보 없음');

        const { state } = JSON.parse(authStorage);
        if (!state?.refreshToken) throw new Error('리프레시 토큰 없음');

        //토큰 생긴 API 직접 호출
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/members/refresh`,
          { refresh_token: state.refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        const { access_token, refresh_token } = refreshResponse.data;

        //localStorage에 직접 업데이트
        const updatedStorage = {
          ...JSON.parse(authStorage),
          state: { ...state, accessToken: access_token, refreshToken: refresh_token },
        };
        localStorage.setItem('auth-storage', JSON.stringify(updatedStorage));

        //원래 요청 -> 새로운 토큰 적용 시도
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        //리프레시 실패 -> 로그아웃 처리
        localStorage.removeItem('auth-storage');

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
