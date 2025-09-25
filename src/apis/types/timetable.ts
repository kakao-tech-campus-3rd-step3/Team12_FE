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

//시간표 상세 조회
export interface TimetableDetailRequest {
  identifier: string;
}
export interface TimetableDetailResponse {
  year: string;
  semester: string;
  subjects: Subject[];
}
export interface Subject {
  name: string;
  professor: string;
  credit: number;
  times: SubjectTime[];
}
export interface SubjectTime {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  place: string;
}
