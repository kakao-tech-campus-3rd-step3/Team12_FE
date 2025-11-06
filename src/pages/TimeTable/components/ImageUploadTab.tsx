import React from 'react';
import ImageInput from '@/pages/TimeTable/components/ImageInput';
import type { TimetableImageResponse } from '@/apis';
import { validateTimetableData } from '@/utils/timetableUtils';
import TimetableGrid from '@/pages/TimeTable/components/TimatableGrid';

interface ImageUploadTabProps {
  selectedImage: File | null;
  imagePreview: string | null;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageParsing: boolean;
  imageParseError: string | null;
  parsedTimetable: TimetableImageResponse | null;
}

const ImageUploadTab: React.FC<ImageUploadTabProps> = ({
  selectedImage,
  imagePreview,
  handleImageSelect,
  imageParsing,
  imageParseError,
  parsedTimetable,
}) => {
  return (
    <div className="mb-3">
      <label className="block mb-3 text-lg font-bold text-gray-700">에브리타임 시간표 이미지</label>

      <ImageInput
        selectedImage={selectedImage}
        imagePreview={imagePreview}
        handleImageSelect={handleImageSelect}
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
      {imageParseError && <div className="mt-2 text-center text-red-600">{imageParseError}</div>}

      {/* 파싱된 시간표 정보 */}
      {parsedTimetable && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            시간표 정보
            {parsedTimetable.year &&
              parsedTimetable.semester &&
              ` (${parsedTimetable.year} ${parsedTimetable.semester})`}
          </label>
          {(() => {
            const validation = validateTimetableData(parsedTimetable.subjects);
            if (!validation.isValid) {
              return <div className="text-center text-red-500 py-4">{validation.message}</div>;
            }
            return <TimetableGrid subjects={parsedTimetable.subjects} />;
          })()}
        </div>
      )}
    </div>
  );
};

export default ImageUploadTab;
