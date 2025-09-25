import { apiClient } from '@/apis/client/apiClients';
import { EVERYTIME_ENDPOINTS } from '@/apis/constants/endpoints';
import type {
  TimetableListRequest,
  TimetableListResponse,
  TimetableDetailRequest,
  TimetableDetailResponse,
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
        return response.data as TimetableDetailResponse;
      })
      .catch((error) => {
        console.error('시간표 상세 조회 에러:', error);
        console.error('에러 상세:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        throw error;
      });
  },
};
