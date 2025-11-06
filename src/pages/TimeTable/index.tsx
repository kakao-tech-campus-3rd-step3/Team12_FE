import Button from '@/components/atoms/Button';
import { useImageParsing } from '@/hooks/timetable/useImageParsing';
import { useImageUpload } from '@/hooks/timetable/useImageUpload';
import { useTimetableData } from '@/hooks/timetable/useTimetableData';
import EverytimeLinkTab from '@/pages/TimeTable/components/EverytimeLinkTab';
import ImageUploadTab from '@/pages/TimeTable/components/ImageUploadTab';
import { RouterPath } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimetableEdit from '@/pages/TimeTable/components/TimetableEdit';
import { everytimeAPI } from '@/apis';
import type { Subject } from '@/apis/types/timetable';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import { toast } from 'react-toastify';

const TimeTablePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'image' | 'link'>('image');
  const [startDate, setStartDate] = useState<Date>(new Date('2025-03-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2025-12-21'));
  const [everytimeTable, setEverytimeTable] = useState<string>('');

  //시간표 수정
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSubjects, setEditedSubjects] = useState<Subject[]>([]);
  const [originalSubjects, setOriginalSubjects] = useState<Subject[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  //모달
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingTab, setPendingTab] = useState<'image' | 'link' | null>(null);

  // 현재 시간표 데이터 가져오기
  const getCurrentSubjects = (): Subject[] => {
    if (activeTab === 'image' && parsedTimetable) {
      return parsedTimetable.subjects;
    }
    if (activeTab === 'link' && timetableDetail) {
      return timetableDetail.subjects;
    }
    return [];
  };

  // 수정 모드 토글
  const handleToggleEdit = () => {
    if (!isEditMode) {
      const currentSubjects = getCurrentSubjects();
      setEditedSubjects([...getCurrentSubjects()]);
      setOriginalSubjects([...currentSubjects]);
    } else {
      //수정 취소 시 원본으로 되돌리기
      setEditedSubjects([...originalSubjects]);
    }
    setIsEditMode(!isEditMode);
  };

  const handleTabChange = (tab: 'image' | 'link') => {
    if (isEditMode) {
      const hasChanges = JSON.stringify(editedSubjects) !== JSON.stringify(originalSubjects);
      if (hasChanges) {
        setPendingTab(tab);
        setIsConfirmModalOpen(true);
        return;
      }
      // 변경사항이 없으면 바로 탭 전환
      setIsEditMode(false);
      setEditedSubjects([]);
      setOriginalSubjects([]);
    }
    setActiveTab(tab);
  };

  //모달 확인
  const handleConfirmTabChange = () => {
    if (pendingTab) {
      setIsEditMode(false);
      setEditedSubjects([]);
      setOriginalSubjects([]);
      setActiveTab(pendingTab);
      setPendingTab(null);
    }
    setIsConfirmModalOpen(false);
  };

  //모달 취소
  const handleCancelTabChange = () => {
    setIsConfirmModalOpen(false);
    setPendingTab(null);
  };

  // 저장
  const handleSave = async () => {
    const currentSubjects = isEditMode ? editedSubjects : getCurrentSubjects();

    if (currentSubjects.length === 0) {
      toast.error('저장할 시간표가 없습니다.');
      return;
    }

    setIsSaving(true);
    try {
      const timetable =
        activeTab === 'image' && parsedTimetable
          ? parsedTimetable
          : activeTab === 'link' && timetableDetail
            ? timetableDetail
            : null;

      if (!timetable) {
        toast.error('시간표 정보가 없습니다.');
        return;
      }
      await everytimeAPI.saveLectures({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        timetable: {
          year: timetable.year,
          semester: timetable.semester,
          subjects: currentSubjects,
        },
      });

      toast.success('시간표가 저장되었습니다.');
      localStorage.setItem('timetableLinked', 'true');
      navigate(RouterPath.HOME.DEFAULT);
    } catch (error) {
      console.error('시간표 저장 실패:', error);
      toast.error('시간표 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <>
      <div className="p-3 m-1 mx-auto max-w-4xl rounded-lg border-gray-200 /border">
        {/* 탭 버튼 */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('image')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'image'
                ? 'border-b-2 text-blue-600'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            이미지로 등록
          </button>
          <button
            onClick={() => handleTabChange('link')}
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

        {getCurrentSubjects().length > 0 && (
          <div className="mt-4">
            <Button
              onClick={handleToggleEdit}
              text={isEditMode ? '수정 취소' : '수정'}
              variant={isEditMode ? 'outline' : 'primary'}
              className="w-full"
            />
          </div>
        )}

        {isEditMode && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">시간표 수정</h3>
            <TimetableEdit subjects={editedSubjects} onSubjectsChange={setEditedSubjects} />
          </div>
        )}
        {/* 날짜 입력 필드 */}
        <div className="mt-6 space-y-3">
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
        <Button
          onClick={handleSave}
          text={isSaving ? '등록 중' : '등록하기'}
          className="flex justify-center w-full"
          disabled={isSaving || getCurrentSubjects().length === 0}
        />
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="탭을 전환하시겠습니까?"
        message={`수정 중인 내용이 있습니다.
        탭을 전환하면 수정 내용이 사라집니다. 계속하시겠습니까?`}
        onConfirm={handleConfirmTabChange}
        onClose={handleCancelTabChange}
        confirmText="계속"
        confirmButtonColor="bg-red-500 hover:bg-red-600"
      />
    </>
  );
};

export default TimeTablePage;
