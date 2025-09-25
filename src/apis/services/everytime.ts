import { apiClient } from '@/apis/client/apiClients';
import { EVERYTIME_ENDPOINTS } from '@/apis/constants/endpoints';
import type { TimetableListRequest, TimetableListResponse } from '@/apis/types/timetable';

export const everytimeAPI = {
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
};
