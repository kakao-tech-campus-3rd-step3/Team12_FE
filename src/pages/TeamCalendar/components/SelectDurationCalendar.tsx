import { DayPicker, useDayPicker } from 'react-day-picker';
import type { DateRange, MonthCaptionProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface Props {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  onSearch: () => void;
}

// 커스텀 캡션 컴포넌트
function CustomCaption(props: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const { calendarMonth } = props;

  return (
    <div className="flex items-center justify-between px-4 mb-2">
      <button
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="bg-transparent border-none cursor-pointer hover:bg-gray-100 p-2 rounded disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <span className="text-base">
        {calendarMonth.date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
        })}
      </span>

      <button
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="bg-transparent border-none cursor-pointer hover:bg-gray-100 p-2 rounded disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

const SelectDurationCalendar: React.FC<Props> = ({ range, setRange, onSearch }) => {
  return (
    <div className="date-picker">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        locale={ko} // 한국어 요일 헤더
        components={{
          MonthCaption: CustomCaption, // 커스텀 캡션 사용
        }}
        classNames={{
          range_start: 'bg-blue-500 text-white rounded-lg transition-all',
          range_end: 'bg-blue-500 text-white rounded-lg transition-all',
          range_middle: 'bg-blue-50 transition-colors duration-200',
          selected: 'text-black transition-colors duration-200',
          today: 'text-black underline underline-offset-4',
        }}
      />
    </div>
  );
};

export default SelectDurationCalendar;
