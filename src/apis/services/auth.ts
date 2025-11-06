import { apiClient } from '@/apis/client/apiClients';
import { API_BASE_URL, AUTH_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  SignupRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  EmailSendResponse,
  VerifyCodeResponse,
} from '@/apis/types/auth';

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

  //이메일 인증코드 발송
  sendEmailVerification: (email: string) => {
    return apiClient.post<EmailSendResponse>(AUTH_ENDPOINTS.SEND_VERIFICATION_CODE, { email });
  },
  //이메일 인증코드 검증
  verifyEmailVerification: (email: string, code: string) => {
    return apiClient.post<VerifyCodeResponse>(AUTH_ENDPOINTS.VERITY_VERIFICATION_CODE, {
      email,
      code,
    });
  },

  //리프레시 토큰 발급
  refreshToken: (refreshToken: string) => {
    return apiClient
      .post<RefreshTokenResponse>(AUTH_ENDPOINTS.REFRESH, {
        refresh_token: refreshToken,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  },

  getUserInfo: () => {
    return apiClient
      .get(AUTH_ENDPOINTS.USER_INFO)
      .then((response) => {
        console.log('내 정보 조회 성공', response.data);
        return response;
      })
      .catch((error) => {
        console.error('내 정보 조회 실패', error);
        throw error;
      });
  },

  signout: () => {
    return apiClient.delete(AUTH_ENDPOINTS.SIGNOUT);
  },

  syncGoogleCalendar: async () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) {
      throw new Error('인증 정보가 없습니다.');
    }

    const { state } = JSON.parse(authStorage);
    if (!state?.accessToken) {
      throw new Error('액세스 토큰이 없습니다.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.GOOGLE_CALENDAR_SYNC}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
        redirect: 'manual', // 302 리다이렉트 수동 처리
      });

      // status가 0인 경우 (CORS 에러, 네트워크 에러, 또는 브라우저가 리다이렉트를 따라간 경우)
      if (response.status === 0) {
        // 브라우저가 리다이렉트를 따라갔을 가능성이 높음
        console.warn('Response status is 0, likely redirected by browser');
        window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
        return {
          success: true,
          redirecting: true,
          message: '구글 계정 연동을 위해 리다이렉트 중입니다.',
        };
      }

      // 204 No Content: 이미 연동 및 동기화 성공
      if (response.status === 204) {
        return {
          success: true,
          alreadyLinked: true,
          message: '구글 캘린더 동기화가 완료되었습니다.',
        };
      }

      // 302 Found: 구글 계정 연동 필요
      if (response.status === 302 || response.status === 307) {
        const location = response.headers.get('Location');
        const redirectUrl = location || `${API_BASE_URL}/oauth2/authorization/google`;
        window.location.href = redirectUrl;
        return {
          success: true,
          redirecting: true,
          message: '구글 계정 연동을 위해 리다이렉트 중입니다.',
        };
      }

      // 그 외 에러 (401, 500 등)
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `동기화 실패: ${response.status}`);
    } catch (error) {
      // fetch 자체가 실패한 경우 (네트워크 에러, CORS 등)
      if (error instanceof TypeError) {
        // CORS 에러나 네트워크 에러인 경우
        console.warn('Fetch 에러 발생 (CORS 또는 네트워크 에러), 수동 리다이렉트 시도:', error);
        window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
        return {
          success: true,
          redirecting: true,
          message: '구글 계정 연동을 위해 리다이렉트 중입니다.',
        };
      }
      throw error;
    }
  },
};
