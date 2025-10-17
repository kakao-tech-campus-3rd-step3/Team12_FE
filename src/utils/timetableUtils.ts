import { WEEKDAYS_SUN_FIRST } from '@/constants';

/**
 * 시간표 데이터 검증 함수
 * @param subjects 시간표 과목 배열
 * @returns 검증 결과 객체
 */
export const validateTimetableData = (subjects: any[]) => {
  if (!subjects || subjects.length === 0) {
    return { isValid: false, message: '등록된 수업이 없습니다' };
  }

  for (const subject of subjects) {
    if (!subject.times || subject.times.length === 0) {
      continue;
    }

    for (const time of subject.times) {
      if (!time.startTime || !time.endTime) {
        return { isValid: false, message: '인식된 시간표가 없습니다' };
      }
    }
  }

  return { isValid: true, message: '' };
};

/**
 * 요일 숫자를 한글 요일로 변환
 * @param dayOfWeek 요일 숫자 (0: 일요일, 1: 월요일, ...)
 * @returns 한글 요일 문자열
 */
export const getDayOfWeek = (dayOfWeek: number) => {
  return WEEKDAYS_SUN_FIRST[dayOfWeek];
};

/**
 * 시간 문자열을 HH:MM 형식으로 포맷팅
 * @param time 시간 문자열 (HH:MM:SS 또는 HH:MM)
 * @returns HH:MM 형식의 시간 문자열
 */
export const formatTime = (time: string) => {
  return time.substring(0, 5);
};
