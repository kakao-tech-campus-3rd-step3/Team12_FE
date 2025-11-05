import type { Lecture } from '@/apis/types/calendar';

interface MyClassProps {
  lectures: Lecture[];
  lectureNames: string[];
}

// 학점별 색상 팔레트
const creditColors: { [key: number]: string } = {
  1: 'bg-blue-500',
  2: 'bg-green-500',
  3: 'bg-purple-500',
  4: 'bg-pink-500',
  5: 'bg-yellow-500',
  6: 'bg-indigo-500',
};

// 학점에 따라 색상 반환
const getLectureColor = (credit?: number): string => {
  if (!credit) return 'bg-gray-500'; // 학점 정보 없을 때 기본 색상
  return creditColors[credit] || 'bg-gray-500'; // 매핑된 색상 또는 기본 색상
};

const MyClass = ({ lectures = [], lectureNames = [] }: MyClassProps) => {
  return (
    <div className="px-3 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">내 수업 ({lectures.length})</h3>
        <button className="p-1 text-sm rounded-md text-mainBlue hover:text-mainBlue/80">
          설정
        </button>
      </div>
      <div className="space-y-3">
        {lectures.length === 0 ? (
          <div className="flex justify-center items-center p-2 pl-0 rounded-lg">
            <p className="text-xs text-gray-500">수업이 없습니다.</p>
          </div>
        ) : (
          lectures.map((lecture) => (
            <div
              key={lecture.lectureId}
              className="flex justify-between items-center p-2 pl-0 rounded-lg"
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getLectureColor(lecture.credit)} mr-2`} />
                <div>
                  <p className="text-xs font-medium text-gray-800">{lecture.name}</p>
                  <p className="text-xs text-gray-500">{lecture.professor}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyClass;
