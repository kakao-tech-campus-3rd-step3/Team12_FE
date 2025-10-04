import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import ModalHeader from '@/components/atoms/ModalHeader';
import { FormInput } from '@/components/atoms/FormInput';
import ImageInput from '@/pages/Calendar/components/ImageInput';
import { useTimetableData } from '@/hooks/timetable/useTimetableData';
import { useImageParsing } from '@/hooks/timetable/useImageParsing';
import { useImageUpload } from '@/hooks/timetable/useImageUpload';
import { validateTimetableData, getDayOfWeek, formatTime } from '@/utils/timetableUtils';

interface TimeTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeTableModal: React.FC<TimeTableModalProps> = ({ isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date>(new Date('2025-03-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2025-12-21'));
  const [everytimeTable, setEverytimeTable] = useState<string>('');

  // 시간표 데이터 hook
  const {
    timetableList,
    selectedTimetable,
    timetableError,
    timetableDetail,
    getTimetables,
    setSelectedTimetable,
  } = useTimetableData();

  // 이미지 파싱 hook
  const { imageParsing, parsedTimetable, imageParseError, parseImageTimetable, clearParsedData } =
    useImageParsing();

  // 이미지 업로드 hook
  const { selectedImage, imagePreview, handleImageSelect } = useImageUpload();

  //url 입력 -> 자동 조회
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (everytimeTable && everytimeTable.includes('everytime.kr')) {
        getTimetables(everytimeTable);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [everytimeTable, getTimetables]);

  // 이미지 선택 -> 파싱
  const handleImageSelectWithParsing = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageSelect(event);

    const file = event.target.files?.[0];
    if (file) {
      clearParsedData();
      parseImageTimetable(file);
    }
  };

  //데이터 확인용 콘솔
  const handleSubmit = () => {
    if (selectedTimetable) {
      console.log('선택된 시간표:', selectedTimetable);
      console.log('시간표 상세 정보:', timetableDetail);
      console.log('시간표 등록:', {
        selectedImage,
        startDate,
        endDate,
        timetableInfo: selectedTimetable,
        timetableDetail,
        everytimeUrl: everytimeTable,
      });
    } else if (parsedTimetable) {
      console.log('파싱된 시간표:', parsedTimetable);
      console.log('시간표 등록:', {
        selectedImage,
        startDate,
        endDate,
        parsedTimetable,
      });
    } else {
      console.log('시간표 등록:', { selectedImage, startDate, endDate });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="시간표 추가하기" />

      <div className="p-6 m-3 rounded-lg border border-gray-200">
        {/* 이미지 업로드 섹션 */}
        <div className="mb-3">
          <label className="block mb-3 text-lg font-bold text-gray-700">
            에브리타임 시간표 업로드
          </label>
          <ImageInput
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            handleImageSelect={handleImageSelectWithParsing}
          />

          {/* 이미지 파싱 로딩 상태 */}
          {imageParsing && (
            <div className="mt-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div className="text-blue-700 font-medium">이미지를 분석하고 있습니다...</div>
              </div>
              <div className="mt-2 text-sm text-blue-600 text-center">
                시간표 분석에 5-10초 정도 소요됩니다.
              </div>
            </div>
          )}

          {/* 이미지 파싱 에러 */}
          {imageParseError && (
            <div className="mt-2 text-center text-red-600">{imageParseError}</div>
          )}

          {parsedTimetable && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                시간표 정보
                {parsedTimetable.year &&
                  parsedTimetable.semester &&
                  ` (${parsedTimetable.year} ${parsedTimetable.semester})`}
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                {(() => {
                  const validation = validateTimetableData(parsedTimetable.subjects);
                  if (!validation.isValid) {
                    return (
                      <div className="text-center text-red-500 py-4">{validation.message}</div>
                    );
                  }
                  return parsedTimetable.subjects.map((subject, index) => (
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
          <FormInput
            id="everytimeTable"
            label="에브리타임 시간표 링크"
            value={everytimeTable}
            onChange={setEverytimeTable}
            placeholder="https://everytime.kr/@..."
            type="text"
            className="mt-4"
          />
          <div className="m-2 text-xs text-center text-gray-400">
            링크로 시간표를 등록하시는 경우, <br />
            공개 범위를 전체 공개로 변경해주세요.
          </div>
        </div>

        {/* 시간표 학기 선택 */}
        {timetableList.length > 0 && (
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              시간표 정보
              {timetableDetail.year &&
                timetableDetail.semester &&
                ` (${timetableDetail.year}년 ${timetableDetail.semester}학기)`}
            </label>
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
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

        {/* 날짜 입력 필드 */}
        <div className="space-y-3">
          <div className="flex flex-row space-x-2">
            <label className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700 text-nowrap">
              학기 시작일 :
            </label>
            <input
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="px-3 py-2 w-full text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-row space-x-2">
            <label className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700 text-nowrap">
              학기 종료일 :
            </label>
            <input
              type="date"
              value={endDate.toISOString().split('T')[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="px-3 py-2 w-full text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} text="등록하기" className="flex justify-center w-full" />
    </Modal>
  );
};

export default TimeTableModal;
