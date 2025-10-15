import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '@/routes/path';
import Button from '@/components/atoms/Button';
import ImageUploadTab from '@/pages/TimeTable/components/ImageUploadTab';
import EverytimeLinkTab from '@/pages/TimeTable/components/EveryTimeLinkTab';
import { useTimetableData } from '@/hooks/timetable/useTimetableData';
import { useImageParsing } from '@/hooks/timetable/useImageParsing';
import { useImageUpload } from '@/hooks/timetable/useImageUpload';

const TimeTablePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'image' | 'link'>('image');
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
    localStorage.setItem('timetableLinked', 'true');
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
      navigate(RouterPath.HOME.DEFAULT);
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
      navigate(RouterPath.HOME.DEFAULT);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-3 m-1 rounded-lg /border border-gray-200">
        {/* 탭 버튼 */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'image'
                ? 'border-b-2 text-blue-600'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            이미지로 등록
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'link'
                ? 'border-b-2 text-blue-600'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            링크로 등록
          </button>
        </div>
        {/* 탭별 컨텐츠 */}
        {activeTab === 'image' && (
          <ImageUploadTab
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            handleImageSelect={handleImageSelectWithParsing}
            imageParsing={imageParsing}
            imageParseError={imageParseError}
            parsedTimetable={parsedTimetable}
          />
        )}
        {activeTab === 'link' && (
          <EverytimeLinkTab
            everytimeTable={everytimeTable}
            setEverytimeTable={setEverytimeTable}
            timetableList={timetableList}
            selectedTimetable={selectedTimetable}
            setSelectedTimetable={setSelectedTimetable}
            timetableError={timetableError}
            timetableDetail={timetableDetail}
          />
        )}
        {/* 날짜 입력 필드 */}
        <div className="space-y-3 mt-6">
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
        <Button onClick={handleSubmit} text="등록하기" className="flex justify-center w-full" />
      </div>
    </>
  );
};

export default TimeTablePage;
