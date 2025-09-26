import { apiClient } from '@/apis/client/apiClients';
import { EVERYTIME_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  TimetableListRequest,
  TimetableListResponse,
  TimetableDetailRequest,
  TimetableDetailResponse,
  TimetableImageRequest,
  TimetableImageResponse,
} from '@/apis/types/timetable';

export const everytimeAPI = {
  //시간표 목록 조회
  getTimetables: (request: TimetableListRequest) => {
    return apiClient
      .get(EVERYTIME_ENDPOINTS.TIMETABLES, {
        params: { url: request.url },
      })
      .then((response) => {
        console.log('시간표 목록 조회 성공', response.data);
        return response.data as TimetableListResponse;
      })
      .catch((error) => {
        console.error('시간표 목록 조회 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });
  },

  //시간표 상세 조회
  getTimetableDetail: (request: TimetableDetailRequest) => {
    return apiClient
      .get(EVERYTIME_ENDPOINTS.TIMETABLE_DETAIL, {
        params: { identifier: request.identifier },
      })
      .then((response) => {
        console.log('시간표 상세 조회 성공', response.data);
        const data = response.data as TimetableDetailResponse;

        // 빈 시간표인 경우 빈 배열로 처리
        if (!data.subjects || data.subjects.length === 0) {
          return {
            ...data,
            subjects: [],
          };
        }

        return data;
      })
      .catch((error) => {
        //403 에러 - 빈 시간표의 경우를 예외처리
        if (error.response?.status === 403) {
          return {
            year: '',
            semester: '',
            subjects: [],
          };
        }
        console.error('시간표 상세 조회 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });
  },
  getTimetableDetailByImage: (request: TimetableImageRequest) => {
    const formData = new FormData();
    formData.append('image', request.image);

    return apiClient
      .post(EVERYTIME_ENDPOINTS.TIMETABLE_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('시간표 이미지 파싱 성공', response.data);
        return response.data as TimetableImageResponse;
      })
      .catch((error) => {
        console.error('시간표 이미지 파싱 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });

        // 403 에러인 경우 빈 시간표로 처리
        if (error.response?.status === 403) {
          console.log('이미지 파싱 권한이 없습니다. 빈 시간표로 처리합니다.');
          return {
            year: '',
            semester: '',
            subjects: [],
          };
        }

        throw error;
      });
  },
};
