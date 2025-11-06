import type { Subject, SubjectTime } from '@/apis/types/timetable';
import Button from '@/components/atoms/Button';
import { FormInput } from '@/components/atoms/FormInput';
import { WEEKDAYS_MON_FIRST } from '@/constants';
import { formatTime, formatTimeToSeconds } from '@/utils/timetableUtils';

interface TimetableEditFormProps {
  subjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
}

const TimetableEditForm: React.FC<TimetableEditFormProps> = ({ subjects, onSubjectsChange }) => {
  // 과목 추가
  const handleAddSubject = () => {
    const newSubject: Subject = {
      name: '',
      professor: '',
      credit: 0,
      times: [
        {
          dayOfWeek: 1,
          startTime: '09:00:00',
          endTime: '10:00:00',
          place: '',
        },
      ],
    };
    onSubjectsChange([...subjects, newSubject]);
  };

  // 과목 삭제
  const handleDeleteSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    onSubjectsChange(newSubjects);
  };

  // 과목 필드 업데이트
  const handleSubjectFieldChange = (
    index: number,
    field: 'name' | 'professor' | 'credit',
    value: string | number,
  ) => {
    const newSubjects = [...subjects];
    newSubjects[index] = {
      ...newSubjects[index],
      [field]: value,
    };
    onSubjectsChange(newSubjects);
  };

  // 시간 추가
  const handleAddTime = (subjectIndex: number) => {
    const newSubjects = [...subjects];
    const newTime: SubjectTime = {
      dayOfWeek: 1,
      startTime: '09:00:00',
      endTime: '10:00:00',
      place: '',
    };
    newSubjects[subjectIndex].times.push(newTime);
    onSubjectsChange(newSubjects);
  };

  // 시간 삭제
  const handleDeleteTime = (subjectIndex: number, timeIndex: number) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].times = newSubjects[subjectIndex].times.filter(
      (_, i) => i !== timeIndex,
    );
    onSubjectsChange(newSubjects);
  };

  // 시간 필드 업데이트
  const handleTimeFieldChange = (
    subjectIndex: number,
    timeIndex: number,
    field: 'dayOfWeek' | 'startTime' | 'endTime' | 'place',
    value: string | number,
  ) => {
    const newSubjects = [...subjects];
    newSubjects[subjectIndex].times[timeIndex] = {
      ...newSubjects[subjectIndex].times[timeIndex],
      [field]: value,
    };
    onSubjectsChange(newSubjects);
  };

  return (
    <div className="mt-4 space-y-4">
      {/* 과목 목록 */}
      {subjects.map((subject, subjectIndex) => (
        <div key={subjectIndex} className="p-4 rounded-lg border border-gray-200">
          {/* 과목 기본 정보 */}
          <div className="flex flex-col gap-2 md:flex-row md:items-end lg:items-end">
            <FormInput
              id={`subject-name-${subjectIndex}`}
              label="과목명"
              value={subject.name}
              onChange={(value) => handleSubjectFieldChange(subjectIndex, 'name', value)}
              required
              className="w-full md:flex-1"
            />
            <FormInput
              id={`subject-professor-${subjectIndex}`}
              label="교수명"
              value={subject.professor || ''}
              onChange={(value) => handleSubjectFieldChange(subjectIndex, 'professor', value)}
            />
            <Button
              onClick={() => handleAddTime(subjectIndex)}
              text="시간 추가"
              variant="outline"
              size="md"
              noWrapper={true}
              className="mb-1"
            />
            <Button
              onClick={() => handleDeleteSubject(subjectIndex)}
              text="과목 삭제"
              variant="primary"
              size="md"
              noWrapper={true}
              className="mb-1 bg-red-500 hover:bg-red-600"
            />
          </div>

          {/* 시간 정보 */}
          <div className="mt-1 space-y-3">
            {subject.times.map((time, timeIndex) => (
              <div key={timeIndex} className="p-3 bg-white rounded-md border border-gray-300">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <FormInput
                    id={`time-day-${subjectIndex}-${timeIndex}`}
                    label="요일"
                    type="select"
                    value={time.dayOfWeek.toString()}
                    onChange={(value) =>
                      handleTimeFieldChange(subjectIndex, timeIndex, 'dayOfWeek', parseInt(value))
                    }
                    options={WEEKDAYS_MON_FIRST.slice(0, 5).map((day, index) => ({
                      label: day,
                      value: (index + 1).toString(),
                    }))}
                  />

                  <FormInput
                    id={`time-start-${subjectIndex}-${timeIndex}`}
                    label="시작시간"
                    type="time"
                    value={formatTime(time.startTime)}
                    onChange={(value) =>
                      handleTimeFieldChange(
                        subjectIndex,
                        timeIndex,
                        'startTime',
                        formatTimeToSeconds(value),
                      )
                    }
                    className="w-full"
                    required
                  />

                  <FormInput
                    id={`time-end-${subjectIndex}-${timeIndex}`}
                    label="종료시간"
                    type="time"
                    value={formatTime(time.endTime)}
                    onChange={(value) =>
                      handleTimeFieldChange(
                        subjectIndex,
                        timeIndex,
                        'endTime',
                        formatTimeToSeconds(value),
                      )
                    }
                    className="w-full"
                    required
                  />

                  <FormInput
                    id={`time-place-${subjectIndex}-${timeIndex}`}
                    label="장소"
                    value={time.place || ''}
                    onChange={(value) =>
                      handleTimeFieldChange(subjectIndex, timeIndex, 'place', value)
                    }
                    className="[&_input]:py-2"
                  />
                </div>
                {subject.times.length > 0 && (
                  <div className="mt-3">
                    <Button
                      onClick={() => handleDeleteTime(subjectIndex, timeIndex)}
                      text="시간 삭제"
                      variant="primary"
                      size="md"
                      noWrapper={true}
                      className="py-2 bg-gray-400 hover:bg-gray-500 w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleAddSubject} text="+ 과목 추가" variant="outline" className="w-full" />
    </div>
  );
};

export default TimetableEditForm;
