import { useState } from 'react';
import { everytimeAPI } from '@/apis';
import type { TimetableImageResponse } from '@/apis';

export const useImageParsing = () => {
  // 이미지 파싱 상태
  const [imageParsing, setImageParsing] = useState<boolean>(false);
  const [parsedTimetable, setParsedTimetable] = useState<TimetableImageResponse | null>(null);
  const [imageParseError, setImageParseError] = useState<string>('');

  // 이미지 파싱 함수
  const parseImageTimetable = (file: File) => {
    setImageParsing(true);
    setParsedTimetable(null);
    setImageParseError('');

    return everytimeAPI
      .getTimetableDetailByImage({ image: file })
      .then((result) => {
        setParsedTimetable(result);
      })
      .catch((error) => {
        if (error.response?.status !== 403) {
          setImageParseError(`이미지 분석 실패`);
        }
      })
      .finally(() => {
        setImageParsing(false);
      });
  };

  // 파싱 결과 초기화
  const clearParsedData = () => {
    setParsedTimetable(null);
    setImageParseError('');
  };

  return {
    imageParsing,
    parsedTimetable,
    imageParseError,

    parseImageTimetable,
    clearParsedData,
  };
};
