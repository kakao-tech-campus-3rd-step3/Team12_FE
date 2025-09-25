//시간표 목록 조회
export interface TimetableListRequest {
  url: string;
}
export interface TimetableResponse {
  year: string;
  semester: string;
  identifier: string;
}
export type TimetableListResponse = TimetableResponse[];
