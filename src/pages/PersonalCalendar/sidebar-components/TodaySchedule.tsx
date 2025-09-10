import { MapPin } from 'lucide-react';
const TodaySchedule = () => {
  const schedules = [
    { time: '09:00', title: '데이터구조', location: '6공학관 201' },
    { time: '14:00', title: '웹프로그래밍', location: 'IT관 301' },
    { time: '16:00', title: '조별과제회의', location: '새벽별도서관 스터디룸' },
    { time: '19:00', title: '동아리 정기모임', location: '학생회관' },
  ];

  return (
    <div className="px-3 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">오늘 일정</h3>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex flex-row p-2 pl-0 bg-white rounded-lg">
            <div className="flex justify-between items-center mr-4 mb-1">
              <span className="text-sm font-medium text-mainBlue">{schedule.time}</span>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-[#1C398E]">{schedule.title}</p>
              <p className="flex gap-1 items-center text-xs text-mainBlue">
                <MapPin className="w-4 h-4" />
                {schedule.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
