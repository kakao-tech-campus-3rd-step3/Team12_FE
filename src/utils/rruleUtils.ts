import { RRule, Weekday } from 'rrule';
import type { Options } from 'rrule';
import type { FormData } from '@/hooks/calendar/useFormData';

export const generateRRule = (formData: FormData): string | null => {
  if (formData.repeat === 'none') return null;

  const options: Partial<Options> = {
    interval: 1,
  };

  //반복 주기
  switch (formData.repeat) {
    case 'daily':
      options.freq = RRule.DAILY;
      break;
    case 'weekly':
      options.freq = RRule.WEEKLY;
      break;
    case 'monthly':
      options.freq = RRule.MONTHLY;
      break;
    default:
      return null;
  }

  //반복 요일
  if (
    formData.repeat === 'weekly' &&
    formData.repeatWeekDays &&
    formData.repeatWeekDays.length > 0
  ) {
    const dayMap: Record<string, Weekday> = {
      mon: RRule.MO,
      tue: RRule.TU,
      wed: RRule.WE,
      thu: RRule.TH,
      fri: RRule.FR,
      sat: RRule.SA,
      sun: RRule.SU,
    };
    options.byweekday = formData.repeatWeekDays
      .map((day) => dayMap[day])
      .filter((day): day is Weekday => day !== undefined);
  }

  //반복 종료 설정
  if (formData.repeatEndType === 'endcount') {
    options.count = formData.repeatCount || 1;
  } else if (formData.repeatEndType === 'enddate') {
    const endDate = formData.repeatEndDate;
    if (endDate) {
      options.until = new Date(endDate);
    }
  }

  const rule = new RRule(options);

  //포멧 변경
  return rule.toString().replace('RRULE:', '');
};
