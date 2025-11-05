import { useMemo } from 'react';
import type { Subject } from '@/apis';
import { WEEKDAYS_MON_FIRST } from '@/constants';

interface TimetableGirdProps {
  subjects: Subject[];
}

const TimetableGrid: React.FC<TimetableGirdProps> = ({ subjects }) => {
  const START_HOUR = 9;
  const MIN_END_HOUR = 23;
  const CONTAINER_HEIGHT = 600;

  //시간 -> 분
  const convertTimetoMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  //최대 종료 시간 계산
  const endHour = useMemo(() => {
    let maxTime = START_HOUR * 60;

    subjects.forEach((subject) => {
      subject.times.forEach((time) => {
        const end = convertTimetoMinutes(time.endTime);
        maxTime = Math.max(maxTime, end);
      });
    });
    return Math.max(MIN_END_HOUR, Math.ceil(maxTime / 60));
  }, [subjects]);

  //시간대 생성
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = START_HOUR; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }, [endHour]);

  //시간 -> height
  const heightPerHour = CONTAINER_HEIGHT / (endHour - START_HOUR);
  const heightPerMinute = heightPerHour / 60;

  //수업 위치 및 높이 계산
  const getSubjectPosition = (time: any) => {
    const start = convertTimetoMinutes(time.startTime);
    const end = convertTimetoMinutes(time.endTime);
    const top = (start - START_HOUR * 60) * heightPerMinute;
    const height = (end - start) * heightPerMinute;

    return { top, height };
  };

  //요일별 수업 그룹화
  const dayOfWeekToDay = useMemo(() => {
    const grouped: { [key: number]: Array<{ subject: Subject; time: any }> } = {};
    for (let day = 0; day < 5; day++) {
      grouped[day] = [];
    }
    subjects.forEach((subject) => {
      subject.times.forEach((time) => {
        if (time.dayOfWeek >= 1 && time.dayOfWeek <= 5) {
          const dayIndex = time.dayOfWeek - 1;
          if (!grouped[dayIndex]) grouped[dayIndex] = [];
          grouped[dayIndex].push({ subject, time });
        }
      });
    });
    return grouped;
  }, [subjects]);

  //색상 선언
  const getSubjectColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-orange-100 text-orange-800',
      'bg-pink-100 text-pink-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
    ];
    return colors[index % colors.length];
  };

  // 과목별 색상 인덱스 계산
  const subjectColorMap = useMemo(() => {
    const map = new Map<string, number>();
    let colorIndex = 0;
    subjects.forEach((subject) => {
      if (!map.has(subject.name)) {
        map.set(subject.name, colorIndex++);
      }
    });
    return map;
  }, [subjects]);

  return (
    <div className="relative w-full border border-gray-200 rounded-md bg-white overflow-hidden">
      {/* 요일 헤더 */}
      <div className="flex border-gray-200">
        <div className="w-12 border-r border-gray-200"></div>
        {WEEKDAYS_MON_FIRST.slice(0, 5).map((day, index) => (
          <div
            key={index}
            className="flex-1 py-2 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      {/* 시간표 그리드 */}
      <div className="relative" style={{ height: `${CONTAINER_HEIGHT}px` }}>
        {/* 시간 라벨 */}
        <div className="absolute -mt-2 left-0 top-0 bottom-0 w-12 border-r border-gray-200">
          {timeSlots.map((time, index) => (
            <div
              key={time}
              className="absolute left-0 right-0 text-xs text-gray-500 text-right pr-2"
              style={{ top: `${index * heightPerHour}px`, height: `${heightPerHour}px` }}
            >
              {time}
            </div>
          ))}
        </div>
        {/* 요일별 컬럼 */}
        <div className="ml-12 flex">
          {[0, 1, 2, 3, 4].map((dayIndex) => (
            <div
              key={dayIndex}
              className="flex-1 relative border-r border-gray-200 last:border-r-0"
              style={{ height: `${CONTAINER_HEIGHT}px` }}
            >
              {/* 시간 구분선 */}
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="absolute left-0 right-0 border-b border-gray-200"
                  style={{ top: `${index * heightPerHour}px` }}
                />
              ))}
              {/* 수업 블록 */}
              {dayOfWeekToDay[dayIndex]?.map((item, idx) => {
                const { top, height } = getSubjectPosition(item.time);
                const colorIndex = subjectColorMap.get(item.subject.name) || 0;
                const colorClass = getSubjectColor(colorIndex);
                return (
                  <div
                    key={`${item.subject.name}-${dayIndex}-${idx}`}
                    className={`absolute left-1 mt-1 right-1 text-center py-2 text-xs ${colorClass} rounded-sm overflow-hidden`}
                    style={{
                      top: `${top}px`,
                      height: `${Math.max(height, 20)}px`,
                      minHeight: '20px',
                    }}
                    title={`${item.subject.name} (${item.subject.professor}) - ${item.time.startTime.substring(0, 5)} - ${item.time.endTime.substring(0, 5)}`}
                  >
                    <div className="font-semibold truncate">{item.subject.name}</div>
                    <div className="text-xs opacity-75 truncate">
                      {item.time.startTime.substring(0, 5)} - {item.time.endTime.substring(0, 5)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableGrid;
