import axios from 'axios';
import { API_BASE_URL, AUTH_ENDPOINTS } from '@/apis/constants/endpoints';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레시 전용 axios
export const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//요청 interceptor
apiClient.interceptors.request.use((config) => {
  // 리프레시 API는 토큰 첨부 안 함
  if (config.url?.includes('/refresh')) {
    return config;
  }

  // 다른 API만 토큰 첨부
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage);
      if (state?.accessToken) {
        config.headers.Authorization = `Bearer ${state.accessToken}`;
      }
    } catch (error) {
      console.error('토큰 파싱 에러:', error);
    }
  }
  return config;
});

//응답 interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401, 403 에러 처리
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      console.log('리프레시 조건 만족, 리프레시 시도');
      originalRequest._retry = true;

      try {
        //localStorage에서 리프레시 토큰 가져오기
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) throw new Error('인증 정보 없음');

        const { state } = JSON.parse(authStorage);
        if (!state?.refreshToken) throw new Error('리프레시 토큰 없음');

        console.log('토큰 갱신 시도 중...');

        // 리프레시 API 호출
        const refreshResponse = await refreshClient.post(AUTH_ENDPOINTS.REFRESH, {
          refresh_token: state.refreshToken,
        });

        console.log('리프레시 응답:', refreshResponse.data);

        const { access_token, refresh_token } = refreshResponse.data;

        //localStorage에 직접 업데이트
        const updatedStorage = {
          ...JSON.parse(authStorage),
          state: { ...state, accessToken: access_token, refreshToken: refresh_token },
        };
        localStorage.setItem('auth-storage', JSON.stringify(updatedStorage));

        console.log('토큰 갱신 완료');

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
