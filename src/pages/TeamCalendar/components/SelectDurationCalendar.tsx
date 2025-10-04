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
    <div className="flex items-center justify-between px-2 sm:px-4 mb-2 sm:mb-4">
      <button
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        className="bg-transparent border-none cursor-pointer hover:bg-gray-100 p-1 sm:p-2 rounded disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>

      <span className="text-sm sm:text-base md:text-lg font-medium text-gray-800">
        {calendarMonth.date.toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
        })}
      </span>

      <button
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        className="bg-transparent border-none cursor-pointer hover:bg-gray-100 p-1 sm:p-2 rounded disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>
    </div>
  );
}

const SelectDurationCalendar: React.FC<Props> = ({ range, setRange, onSearch }) => {
  return (
    <div className="date-picker">
      {/* 캘린더 컨테이너 */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-center">
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
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 w-full">
          {/* 시작일 & 종료일 버튼 : 세로 배치 -> 가로 배치 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">시작일</div>
              <div className="text-sm sm:text-base font-medium text-gray-800">
                {range?.from ? range.from.toLocaleDateString('ko-KR') : '날짜 선택'}
              </div>
            </div>

            {/* 화살표 : 아래쪽 -> 오른쪽 */}
            <div className="text-gray-400 text-center sm:text-left">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </div>

            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">종료일</div>
              <div className="text-sm sm:text-base font-medium text-gray-800">
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
            size="md"
            className={`${!range?.from || !range?.to ? 'cursor-not-allowed opacity-50' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectDurationCalendar;
