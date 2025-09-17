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

      <div className="mt-6 space-y-4">
        {/* 선택된 날짜 표시 */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">시작일</div>
            <div className="text-sm font-medium text-gray-800">
              {range?.from ? range.from.toLocaleDateString('ko-KR') : '날짜 선택'}
            </div>
          </div>

          <div className="text-gray-400">→</div>

          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">종료일</div>
            <div className="text-sm font-medium text-gray-800">
              {range?.to ? range.to.toLocaleDateString('ko-KR') : '날짜 선택'}
            </div>
          </div>
        </div>

        {/* 검색 버튼 */}
        <Button
          onClick={range?.from && range?.to ? onSearch : () => {}}
          text="일정 검색하기"
          fullWidth={true}
          variant={range?.from && range?.to ? 'primary' : 'secondary'}
          className={`${!range?.from || !range?.to ? 'cursor-not-allowed opacity-50' : ''}`}
        />
      </div>
    </div>
  );
};

export default SelectDurationCalendar;
