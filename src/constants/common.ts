export const WEEK_OPTIONS = [
  { label: '월', value: 'mon' },
  { label: '화', value: 'tue' },
  { label: '수', value: 'wed' },
  { label: '목', value: 'thu' },
  { label: '금', value: 'fri' },
  { label: '토', value: 'sat' },
  { label: '일', value: 'sun' },
] as const;

export const WEEKDAYS_MON_FIRST = WEEK_OPTIONS.map((o) => o.label);

export const WEEKDAYS_SUN_FIRST = ['일', '월', '화', '수', '목', '금', '토'] as const;

export type WeekdayValue = (typeof WEEK_OPTIONS)[number]['value'];
