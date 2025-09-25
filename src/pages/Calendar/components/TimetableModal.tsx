import React, { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import ModalHeader from '@/components/atoms/ModalHeader';
import { FormInput } from '@/components/atoms/FormInput';
import ImageInput from '@/pages/Calendar/components/ImageInput';
import { everytimeAPI } from '@/apis';
import type { TimetableResponse } from '@/apis';

interface TimeTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeTableModal: React.FC<TimeTableModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date('2025-03-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2025-12-21'));
  const [everytimeTable, setEverytimeTable] = useState<string>('');

  //시간표 목록
  const [timetableList, setTimetableList] = useState<TimetableResponse[]>([]);
  const [selectedTimetable, setSelectedTimetable] = useState<TimetableResponse | null>(null);
  const [timetableError, setTimetableError] = useState<string>('');

  // 언마운트 시 이미지 URL 정리
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  //시간표 목록 조회
  const getTimetables = (url: string) => {
    if (!url.includes('everytime.kr')) {
      setTimetableError('올바른 url을 입력해주세요.');
      return;
    }
    setTimetableError('');
    setTimetableList([]);
    setSelectedTimetable(null);

    everytimeAPI
      .getTimetables({ url })
      .then((timetables) => {
        setTimetableList(timetables);
        if (timetables.length > 0) {
          setSelectedTimetable(timetables[0]);
        }
      })
      .catch((error) => {
        console.error('시간표 목록 조회 실패:', error);
        setTimetableError('시간표 목록을 불러오는데 실패했습니다.');
      });
  };

  //url 입력 -> 자동 조회
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (everytimeTable && everytimeTable.includes('everytime.kr')) {
        getTimetables(everytimeTable);
      } else {
        setTimetableList([]);
        setSelectedTimetable(null);
        setTimetableError('');
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [everytimeTable]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    if (selectedTimetable) {
      console.log('선택된 시간표:', selectedTimetable);
      console.log('시간표 등록:', {
        selectedImage,
        startDate,
        endDate,
        timetableInfo: selectedTimetable,
        everytimeUrl: everytimeTable,
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
            handleImageSelect={handleImageSelect}
          />
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
              <option value="">시간표를 선택하세요</option>
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
