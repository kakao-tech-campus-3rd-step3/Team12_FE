import { apiClient } from '@/apis/client/apiClients';
import { AUTH_ENDPOINTS } from '@/apis/constants/endpoints';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/apis/types/auth';

//테스트용 console
export const authAPI = {
  //회원가입 & 디버깅용 콘솔 메세지
  signup: (userData: SignupRequest) => {
    return apiClient
      .post(AUTH_ENDPOINTS.SIGNUP, userData)
      .then((response) => {
        console.log('회원가입 API 연결 완료', response);
        return response;
      })
      .catch((error) => {
        console.error('API 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });
  },

  //로그인 & 디버깅용 콘솔 메세지
  login: (credentials: LoginRequest) => {
    console.log('API 요청 시작:', credentials);

    return apiClient
      .post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials)
      .then((response) => {
        console.log('로그인 API 연결 완료:', response);
        return response;
      })
      .catch((error) => {
        console.error('API 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });
  },
};
