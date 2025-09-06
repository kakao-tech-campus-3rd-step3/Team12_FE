import Button from '@/components/atoms/Button';
import ModalHeader from '@/components/common/Modal/ModalHeader';
import ImageInput from '@/pages/Calendar/components/TimetableModal/ImageInput';
import React, { useEffect, useState } from 'react';

interface TimeTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeTableModal: React.FC<TimeTableModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date('2025-03-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2025-12-21'));

  // 컴포넌트 언마운트 시 이미지 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // 이미지 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log('선택된 이미지:', file.name);
    }
  };

  const handleSubmit = () => {
    console.log('시간표 등록:', { selectedImage, startDate, endDate });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center m-auto w-full h-full bg-gray-200/60"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md bg-white rounded-lg max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <ModalHeader title="시간표 추가하기" />

        {/* 회색 보더 내부 컨텐츠 */}
        <div className="p-6 m-4 rounded-lg border border-gray-200">
          {/* 이미지 업로드 섹션 */}
          <div className="mb-8">
            <label className="block mb-3 text-lg font-bold text-gray-700">
              에브리타임 시간표 업로드
            </label>
            <ImageInput
              selectedImage={selectedImage}
              imagePreview={imagePreview}
              handleImageSelect={handleImageSelect}
            />
          </div>

          {/* 날짜 입력 필드 */}
          <div className="space-y-4">
            <div className="flex flex-row space-x-2">
              <label className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700 text-nowrap">
                학기 시작일 :
              </label>
              <input
                type="date"
                value={startDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  setStartDate(new Date(e.target.value));
                  console.log(e.target.value);
                }}
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

        {/* 하단 버튼 */}
        <Button handleSubmit={handleSubmit} text="등록하기" />
      </div>
    </div>
  );
};

export default TimeTableModal;
