import { CalendarPaths } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type ViewType = 'day' | 'week' | 'month';

const Calendar = () => {
  const { date, view } = useParams<{ date?: string; view?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const getToday = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  // URL에서 뷰와 날짜 추출
  const getViewFromPath = (pathname: string): ViewType => {
    if (pathname.includes('/day/')) return 'day';
    if (pathname.includes('/week/')) return 'week';
    if (pathname.includes('/month/')) return 'month';
    return 'day';
  };

  const [currentView, setCurrentView] = useState<ViewType>(() =>
    getViewFromPath(location.pathname),
  );
  const [currentDate, setCurrentDate] = useState(() => date || getToday());

  // 뷰 변경 시 URL 업데이트
  const handleViewChange = (newView: ViewType) => {
    setCurrentView(newView);
    const path = CalendarPaths[newView](currentDate);
    navigate(path);
  };

  // URL 변경 감지하여 상태 업데이트
  useEffect(() => {
    const newView = getViewFromPath(location.pathname);
    if (newView !== currentView) {
      setCurrentView(newView);
    }

    if (date && date !== currentDate) {
      setCurrentDate(date);
    }
  }, [location.pathname, date, currentView, currentDate]);

  const renderCalendarContent = () => {
    switch (currentView) {
      case 'day':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-600">
              선택된 날짜: <span className="font-semibold text-blue-600">{currentDate}</span>
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800">오전</h3>
                <p className="text-sm text-blue-600">일정 없음</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800">오후</h3>
                <p className="text-sm text-green-600">팀 미팅 2:00 PM</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-800">저녁</h3>
                <p className="text-sm text-purple-600">일정 없음</p>
              </div>
            </div>
          </div>
        );

      case 'week':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-600">
              선택된 주: <span className="font-semibold text-green-600">2025년 35주차</span>
            </p>
            <div className="grid grid-cols-7 gap-2">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                <div key={day} className="p-3 text-center bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{day}</div>
                  <div className="text-sm text-gray-600">
                    {currentDate.slice(5, 7)}/{currentDate.slice(8, 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'month':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-600">
              선택된 월: <span className="font-semibold text-purple-600">2025년 8월</span>
            </p>
            <div className="grid grid-cols-7 gap-1">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div
                  key={day}
                  className="p-2 text-sm font-medium text-center text-gray-600 bg-gray-100"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className="p-2 text-sm text-center border border-gray-200 cursor-pointer hover:bg-gray-50"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">캘린더</h2>
        <p className="mb-6 text-gray-600">원하는 뷰를 선택하세요</p>

        {/* 뷰 전환 버튼들 */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => handleViewChange('day')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentView === 'day'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            일간 뷰
          </button>
          <button
            onClick={() => handleViewChange('week')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentView === 'week'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            주간 뷰
          </button>
          <button
            onClick={() => handleViewChange('month')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentView === 'month'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
            }`}
          >
            월간 뷰
          </button>
        </div>
      </div>

      {/* 캘린더 내용 */}
      {renderCalendarContent()}
    </div>
  );
};

export default Calendar;
