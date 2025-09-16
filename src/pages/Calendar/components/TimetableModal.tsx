import Button from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import ModalHeader from '@/components/atoms/ModalHeader';
import { FormInput } from '@/components/form/FormInput';
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
  const [evrytimeTable, setEvrytimeTable] = useState<string>('');
  // 언마운트 시 이미지 URL 정리
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
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    console.log('시간표 등록:', { selectedImage, startDate, endDate });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="시간표 추가하기" />

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
          <FormInput
            id="evrytimeTable"
            label="에브리타임 시간표 링크"
            value={evrytimeTable}
            onChange={setEvrytimeTable}
            placeholder="https://everytime.kr/@..."
            type="text"
            className="mt-4"
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
      <Button handleSubmit={handleSubmit} text="등록하기" className="flex justify-center w-full" />
    </Modal>
  );
};

export default TimeTableModal;
