/**
 * 날짜/시간 관련 유틸러티 함수들
 */

export const toDateOnly = (dateLike: string | Date): string => {
  const d = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDatePart = (value?: string): string => {
  if (!value) return '';
  if (value.includes('T')) return value.split('T')[0];
  return value.length === 10 ? value : '';
};

export const getTimePart = (value?: string): string => {
  if (!value) return '';
  if (value.includes('T')) return value.split('T')[1].slice(0, 5);
  return value.length === 5 ? value : '';
};

export const buildIsoFromDateAndTime = (
  current: string | undefined,
  fallbackDate: Date | undefined,
  time: string,
): string => {
  const dateStr = getDatePart(current) || (fallbackDate ? toDateOnly(fallbackDate) : '');
  return dateStr ? `${dateStr}T${time}:00` : time;
};

/**
 * 날짜를 YY/MM/DD 형식으로 포맷
 * @param date Date 객체
 * @returns YY/MM/DD 형식의 문자열 (예: "25/01/15")
 */
export const formatDateShort = (date: Date | undefined): string => {
  if (!date) return '';
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

/**
 * ISO 문자열을 YY/MM/DD HH:MM 형식으로 포맷
 * @param isoString ISO 형식의 날짜 문자열 (예: "2025-09-09T12:00:00")
 * @returns YY/MM/DD HH:MM 형식의 문자열 (예: "25/09/09 12:00")
 */
export const formatDateTimeShort = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * ISO 날짜 문자열을 "M월 D일 요일" 형식으로 포맷
 * @param isoString ISO 날짜 문자열 (예: "2025-09-12T11:00:00")
 * @returns "9월 12일 금요일" 형식의 문자열
 */
export const formatDateWithWeekday = (isoString: string): string => {
  const date = new Date(isoString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  return `${month}월 ${day}일 ${weekday}요일`;
};
