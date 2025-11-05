import type { Subject, SubjectTime } from '@/apis/types/timetable';
import { FormInput } from '@/components/atoms/FormInput';
import Button from '@/components/atoms/Button';
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
        <div key={subjectIndex} className="p-4 border border-gray-200 rounded-lg">
          {/* 과목 기본 정보 */}
          <div className="flex flex-col md:flex-row gap-2 lg:items-end">
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
          <div className="space-y-3 mt-1 ">
            {subject.times.map((time, timeIndex) => (
              <div key={timeIndex} className="p-3 border border-gray-300 rounded-md bg-white">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
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
                  {subject.times.length > 0 && (
                    <div className="flex items-end">
                      <Button
                        onClick={() => handleDeleteTime(subjectIndex, timeIndex)}
                        text="시간 삭제"
                        variant="primary"
                        size="md"
                        noWrapper={true}
                        className="py-2 mb-1.5 bg-red-500 hover:bg-red-600 w-full"
                      />
                    </div>
                  )}
                </div>
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
