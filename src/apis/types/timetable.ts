//url을 통한 시간표 목록 조회
export interface TimetableListRequest {
  url: string;
}
export interface TimetableResponse {
  year: string;
  semester: string;
  identifier: string;
}
export type TimetableListResponse = TimetableResponse[];

//url을 통한 시간표 목록의 시간표 상세 조회
export interface TimetableDetailRequest {
  identifier: string;
}
export interface TimetableDetailResponse {
  year: string;
  semester: string;
  subjects: Subject[];
}

//이미지를 통한 시간표 상세 조회
export interface TimetableImageRequest {
  image: File;
}
export interface TimetableImageResponse {
  year: string;
  semester: string;
  subjects: Subject[];
}

//시간표 response 결과
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
