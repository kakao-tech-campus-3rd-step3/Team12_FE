import { useState, useEffect } from 'react';
import { everytimeAPI } from '@/apis';
import type { TimetableResponse, TimetableDetailResponse } from '@/apis';

export const useTimetableData = () => {
  // 시간표 목록 관련 상태
  const [timetableList, setTimetableList] = useState<TimetableResponse[]>([]);
  const [selectedTimetable, setSelectedTimetable] = useState<TimetableResponse | null>(null);
  const [timetableError, setTimetableError] = useState<string>('');

  // 시간표 상세 정보 관련 상태
  const [timetableDetail, setTimetableDetail] = useState<TimetableDetailResponse | null>(null);
  const [detailError, setDetailError] = useState<string>('');

  // 시간표 목록 조회
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

  // 시간표 상세 조회
  const getTimetableDetail = (identifier: string) => {
    setTimetableDetail(null);
    setDetailError('');

    everytimeAPI
      .getTimetableDetail({ identifier })
      .then((detail) => {
        setTimetableDetail(detail);
      })
      .catch((error) => {
        console.error('시간표 상세 조회 실패:', error);
        setDetailError('시간표 상세 정보를 불러오는데 실패했습니다.');
      });
  };

  // 시간표가 변경될 때 상세 정보 조회
  useEffect(() => {
    if (selectedTimetable?.identifier) {
      getTimetableDetail(selectedTimetable.identifier);
    }
  }, [selectedTimetable]);

  return {
    timetableList,
    selectedTimetable,
    timetableError,
    timetableDetail,
    detailError,

    getTimetables,
    setSelectedTimetable,
  };
};
