import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import type { DateRange, MonthCaptionProps } from 'react-day-picker';
import { DayPicker, useDayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface Props {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
}

// 커스텀 캡션 컴포넌트
function CustomCaption(props: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const { calendarMonth } = props;

  return (
    <div className="flex justify-between items-center px-2 mb-2 sm:px-4 sm:mb-4">
      <button
        type="button"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="p-1 bg-transparent rounded border-none transition-colors cursor-pointer hover:bg-gray-100 sm:p-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5" />
      </button>

      <span className="text-sm font-medium text-gray-800 sm:text-base md:text-lg">
        {calendarMonth.date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
        })}
      </span>

      <button
        type="button"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="p-1 bg-transparent rounded border-none transition-colors cursor-pointer hover:bg-gray-100 sm:p-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight className="w-4 h-4 text-gray-600 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}

const SelectDuration: React.FC<Props> = ({ range, setRange }) => {
  useEffect(() => {
    setRange(undefined);
  }, []);

  return (
    <div className="date-picker">
      {/* 캘린더 컨테이너 */}
      <div className="p-4 bg-white rounded-lg">
        <div className="flex justify-center min-h-[355px]">
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

        {/* 선택된 날짜 표시 - 반응형 */}
        <div className="space-y-3 w-full sm:mt-0 sm:space-y-4">
          {/* 시작일 & 종료일 버튼 : 세로 배치 -> 가로 배치 */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex-1 p-2 text-center bg-gray-50 rounded-lg border border-gray-200 sm:p-3">
              <div className="mb-1 text-xs text-gray-500">시작일</div>
              <div className="text-sm font-medium text-gray-800 sm:text-base">
                {range?.from ? range.from.toLocaleDateString('ko-KR') : '날짜 선택'}
              </div>
            </div>

            {/* 화살표 : 아래쪽 -> 오른쪽 */}
            <div className="text-center text-gray-400 sm:text-left">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>

            <div className="flex-1 p-2 text-center bg-gray-50 rounded-lg border border-gray-200 sm:p-3">
              <div className="mb-1 text-xs text-gray-500">종료일</div>
              <div className="text-sm font-medium text-gray-800 sm:text-base">
                {range?.to ? range.to.toLocaleDateString('ko-KR') : '날짜 선택'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDuration;
