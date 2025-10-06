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
