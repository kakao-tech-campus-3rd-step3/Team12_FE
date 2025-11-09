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
import { AxiosError } from 'axios';

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

  //구글 캘린더 연동
  syncGoogleCalendar: async (redirectUri?: string) => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) {
      throw new Error('인증 정보가 없습니다.');
    }

    const { state } = JSON.parse(authStorage);
    if (!state?.accessToken) {
      throw new Error('액세스 토큰이 없습니다.');
    }

    const currentOrigin = window.location.origin;
    const currentPath = '/';
    const fullRedirectUri = redirectUri || `${currentOrigin}${currentPath}`;

    console.log('구글 캘린더 연동 시작');
    console.log('Redirect URI:', fullRedirectUri);

    try {
      const response = await apiClient.post<{
        message?: string;
        redirect_url?: string;
      }>(AUTH_ENDPOINTS.GOOGLE_CALENDAR_SYNC, { redirect_url: fullRedirectUri });

      console.log('API 응답:', response);

      // 200 OK + redirect_url
      if (response.data.redirect_url) {
        const redirectUrl = response.data.redirect_url.startsWith('http')
          ? response.data.redirect_url
          : `${API_BASE_URL}${response.data.redirect_url}`;

        console.log('구글 OAuth로 리다이렉트:', redirectUrl);

        localStorage.setItem(
          'google-oauth-debug',
          JSON.stringify({
            timestamp: new Date().toISOString(),
            redirectUri: fullRedirectUri,
            message: response.data.message,
          }),
        );

        window.location.href = redirectUrl;

        return {
          success: true,
          redirecting: true,
          message: response.data.message || '구글 계정 연동을 위해 리다이렉트 중입니다.',
        };
      }

      // 이미 연동된 경우
      return {
        success: true,
        alreadyLinked: true,
        message: response.data.message || '구글 캘린더가 이미 연동되어 있습니다.',
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('구글 캘린더 동기화 에러:', error);

        // 401 에러 + redirect_url이 있는 경우
        if (error.response?.status === 401 && error.response?.data?.redirect_url) {
          const redirectUrl = error.response.data.redirect_url.startsWith('http')
            ? error.response.data.redirect_url
            : `${API_BASE_URL}${error.response.data.redirect_url}`;

          console.log('401 응답: 구글 OAuth 인증 필요');
          console.log('Redirect URL:', redirectUrl);

          localStorage.setItem(
            'google-oauth-debug',
            JSON.stringify({
              timestamp: new Date().toISOString(),
              redirectUri: fullRedirectUri,
              message: error.response.data?.message,
              status: 401,
            }),
          );

          window.location.href = redirectUrl;

          return {
            success: true,
            redirecting: true,
            message: error.response.data?.message || '구글 계정 연동을 위해 리다이렉트 중입니다.',
          };
        }
      }
      throw error;
    }
  },
};
