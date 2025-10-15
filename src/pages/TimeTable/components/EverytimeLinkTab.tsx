import { FormInput } from '@/components/atoms/FormInput';
import type { TimetableResponse, TimetableDetailResponse } from '@/apis';
import { validateTimetableData, getDayOfWeek, formatTime } from '@/utils/timetableUtils';

interface EverytimeLinkTabProps {
  everytimeTable: string;
  setEverytimeTable: (value: string) => void;
  timetableList: TimetableResponse[];
  selectedTimetable: TimetableResponse | null;
  setSelectedTimetable: (timetable: TimetableResponse | null) => void;
  timetableError: string | null;
  timetableDetail: TimetableDetailResponse | null;
}

const EverytimeLinkTab: React.FC<EverytimeLinkTabProps> = ({
  everytimeTable,
  setEverytimeTable,
  timetableList,
  selectedTimetable,
  setSelectedTimetable,
  timetableError,
  timetableDetail,
}) => {
  return (
    <div className="mb-3">
      <label className="block mb-3 text-lg font-bold text-gray-700">에브리타임 시간표 링크</label>
      <FormInput
        id="everytimeTable"
        value={everytimeTable}
        onChange={setEverytimeTable}
        placeholder="https://everytime.kr/@..."
        type="text"
      />
      <div className="m-2 text-xs text-center text-gray-400">
        링크로 시간표를 등록하시는 경우, <br />
        공개 범위를 전체 공개로 변경해주세요.
      </div>

      {/* 시간표 학기 선택 */}
      {timetableList.length > 0 && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">시간표 선택</label>
          <select
            value={selectedTimetable?.identifier || ''}
            onChange={(e) => {
              const selected = timetableList.find((t) => t.identifier === e.target.value);
              setSelectedTimetable(selected || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            {timetableList.map((timetable) => (
              <option key={timetable.identifier} value={timetable.identifier}>
                {timetable.year}년 {timetable.semester}학기
              </option>
            ))}
          </select>
        </div>
      )}

      {timetableError && (
        <div className="m-3 text-sm text-center text-red-600">{timetableError}</div>
      )}

      {/* 시간표 상세 정보 */}
      {timetableDetail && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            시간표 정보
            {timetableDetail.year &&
              timetableDetail.semester &&
              ` (${timetableDetail.year}년 ${timetableDetail.semester}학기)`}
          </label>
          <div className="overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
            {(() => {
              const validation = validateTimetableData(timetableDetail.subjects);
              if (!validation.isValid) {
                return <div className="text-center text-red-500 py-4">{validation.message}</div>;
              }
              return timetableDetail.subjects.map((subject, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="font-semibold text-gray-800 mb-1">{subject.name}</div>
                  {subject.times.map((time, timeIndex) => (
                    <div key={timeIndex} className="ml-2 text-sm text-gray-600">
                      {getDayOfWeek(time.dayOfWeek)} {formatTime(time.startTime)} -{' '}
                      {formatTime(time.endTime)}
                    </div>
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default EverytimeLinkTab;
