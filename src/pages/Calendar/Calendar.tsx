import { useState, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { CalendarEvent } from '@/types';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

moment.locale('ko');
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  {
    /*mock 일정*/
  }
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: '팀 미팅',
      start: new Date(2025, 8, 10, 14, 0),
      end: new Date(2025, 8, 10, 15, 30),
    },
    {
      id: '2',
      title: '프로젝트 발표',
      start: new Date(2025, 8, 15, 10, 0),
      end: new Date(2025, 8, 15, 12, 0),
    },
    {
      id: '3',
      title: '코드 리뷰',
      start: new Date(2025, 8, 8, 16, 0),
      end: new Date(2025, 8, 8, 17, 0),
    },
  ]);

  const handleSelectSlot = useCallback((slotInfo: any) => {
    setSelectedSlot(slotInfo);
    setShowEventModal(true);
  }, []);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    alert(`이벤트: ${event.title}`);
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
  }, []);

  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const addEvent = useCallback(
    (title: string) => {
      if (selectedSlot && title.trim()) {
        const newEvent: CalendarEvent = {
          id: Date.now().toString(),
          title: title.trim(),
          start: selectedSlot.start,
          end: selectedSlot.end,
        };
        setEvents((prev) => [...prev, newEvent]);
      }
      setShowEventModal(false);
      setSelectedSlot(null);
    },
    [selectedSlot],
  );

  const eventStyleGetter = (event: CalendarEvent) => {
    const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
    const colorIndex = event.id.charCodeAt(0) % colors.length;

    const style = {
      backgroundColor: colors[colorIndex],
      borderRadius: '12px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };
    return { style };
  };

  const messages = {
    allDay: '종일',
    previous: '',
    next: '',
    today: '',
    month: '월',
    week: '주',
    day: '일',
    agenda: '일정',
    date: '날짜',
    time: '시간',
    event: '이벤트',
    noEventsInRange: '이 범위에는 이벤트가 없습니다.',
    showMore: (total: number) => `+${total}개 더보기`,
  };

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === Views.MONTH) {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (currentView === Views.WEEK) {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === Views.MONTH) {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (currentView === Views.WEEK) {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
  };

  const getCurrentPeriod = () => {
    if (currentView === Views.MONTH) {
      return moment(currentDate).format('YYYY년 M월');
    } else if (currentView === Views.WEEK) {
      const start = moment(currentDate).startOf('week');
      const end = moment(currentDate).endOf('week');
      return `${start.format('M월 D일')} - ${end.format('M월 D일')}`;
    } else {
      return moment(currentDate).format('YYYY년 M월 D일');
    }
  };

  return (
    <div className="m-4 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-6xl mx-4">
        {/* 커스텀 툴바 */}
        <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEventModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />새 일정
              </button>
              <button
                onClick={navigateToday}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                오늘
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={navigatePrevious}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{getCurrentPeriod()}</h2>
              </div>
              <button
                onClick={navigateNext}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* 오른쪽: 월간/주간/일간 버튼 */}
            <div className="flex gap-2">
              {[
                { view: Views.MONTH, label: '월간' },
                { view: Views.WEEK, label: '주간' },
                { view: Views.DAY, label: '일간' },
              ].map(({ view, label }) => (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentView === view
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 캘린더 */}
        <div className="w-[900px] bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            onNavigate={handleNavigate}
            onView={handleViewChange}
            view={currentView}
            date={currentDate}
            eventPropGetter={eventStyleGetter}
            messages={messages}
            formats={{
              monthHeaderFormat: 'YYYY년 M월',
              dayHeaderFormat: 'M월 D일 dddd',
              dayRangeHeaderFormat: (range: { start: Date; end: Date }) => {
                const start = moment(range.start).format('M월 D일');
                const end = moment(range.end).format('M월 D일');
                return `${start} - ${end}`;
              },
            }}
          />
        </div>

        {/* 새 일정 모달 */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 mx-4 shadow-xl">
              <h3 className="text-lg font-semibold mb-4">새 일정 추가</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const title = formData.get('title') as string;
                  addEvent(title);
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">일정 제목</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="일정 제목을 입력하세요"
                    autoFocus
                    required
                  />
                </div>
                {selectedSlot && (
                  <div className="mb-4 text-sm text-gray-600">
                    <p>시작: {moment(selectedSlot.start).format('YYYY-MM-DD HH:mm')}</p>
                    <p>종료: {moment(selectedSlot.end).format('YYYY-MM-DD HH:mm')}</p>
                  </div>
                )}
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setSelectedSlot(null);
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
