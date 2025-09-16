import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type CalendarEvent = {
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
};

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: '팀미팅', start: new Date().toISOString(), allDay: false },
  ]);

  const calendarRef = useRef<FullCalendar>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  //const navigate = useNavigate();
  const isInitialized = useRef(false);

  const plugins = useMemo(() => [dayGridPlugin, timeGridPlugin, interactionPlugin], []);

  // URL에서 현재 날짜와 뷰 정보 읽기
  const currentDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const currentView = searchParams.get('view') || 'dayGridMonth';

  // URL 파라미터 업데이트 함수
  const updateURL = (date: string, view: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('date', date);
    newSearchParams.set('view', view);
    setSearchParams(newSearchParams);
  };

  // 캘린더 초기화 시 URL 파라미터 적용
  useEffect(() => {
    if (calendarRef.current && !isInitialized.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(currentView);
      calendarApi.gotoDate(currentDate);
      isInitialized.current = true;
    }
  }, [currentDate, currentView]);

  return (
    <div className="p-4">
      <div className="mx-auto max-w-7xl">
        {/* <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">일정 관리</h1>
          <p className="text-gray-600">팀 일정을 효율적으로 관리하세요</p>
        </div> */}

        <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
          <div className="p-6">
            <FullCalendar
              ref={calendarRef}
              plugins={plugins}
              initialView={currentView}
              headerToolbar={{
                left: 'prev title next',
                right: 'today dayGridMonth,timeGridWeek,timeGridDay',
              }}
              // 모바일에서 더 작은 헤더 높이
              height="auto"
              aspectRatio={1.8}
              customButtons={{
                addEvent: {
                  text: '+ 새 일정',
                  click: () => {
                    const title = prompt('일정 제목을 입력하세요');
                    if (!title) return;
                    setEvents((prev) => [
                      ...prev,
                      {
                        id: crypto.randomUUID(),
                        title,
                        start: new Date().toISOString(),
                        allDay: true,
                      },
                    ]);
                  },
                },
                today: {
                  text: '오늘',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentView = calendarApi.view.type;
                    const today = new Date().toISOString().split('T')[0];
                    calendarApi.gotoDate(today);
                    updateURL(today, currentView);
                  },
                },
                dayGridMonth: {
                  text: '월간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = calendarApi.getDate().toISOString().split('T')[0];
                    calendarApi.changeView('dayGridMonth');
                    updateURL(currentDate, 'dayGridMonth');
                  },
                },
                timeGridWeek: {
                  text: '주간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = calendarApi.getDate().toISOString().split('T')[0];
                    calendarApi.changeView('timeGridWeek');
                    updateURL(currentDate, 'timeGridWeek');
                  },
                },
                timeGridDay: {
                  text: '일간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = calendarApi.getDate().toISOString().split('T')[0];
                    calendarApi.changeView('timeGridDay');
                    updateURL(currentDate, 'timeGridDay');
                  },
                },
              }}
              locale="ko"
              selectable // 날짜 선택 가능 (새 일정 추가)
              editable // 이벤트 편집 가능 (드래그, 리사이즈)
              events={events}
              dayMaxEvents={3} // 하루에 최대 3개 이벤트만 표시
              moreLinkClick="popover" // 더 많은 이벤트는 팝오버로 표시
              eventDisplay="block" // 이벤트를 블록 형태로 표시
              eventTimeFormat={{
                hour: '2-digit', // 시간을 2자리로 표시 (09, 14)
                minute: '2-digit', // 분을 2자리로 표시 (05, 30)
                meridiem: false, // AM/PM 표시 안함 (24시간 형식)
              }}
              views={{
                dayGridMonth: {
                  dayHeaderFormat: { weekday: 'short' }, // 월 뷰에서는 요일만
                },
                timeGridWeek: {
                  dayHeaderFormat: { weekday: 'short', day: 'numeric' }, // 주 뷰에서는 요일과 날짜
                },
                timeGridDay: {
                  dayHeaderFormat: { weekday: 'short', day: 'numeric' }, // 일 뷰에서는 요일과 날짜
                },
              }}
              titleFormat={{
                year: 'numeric', // 연도를 숫자로 표시 (2024)
                month: 'long', // 월을 긴 형태로 표시 (1월, 2월...)
              }}
              dateClick={(info) => {
                const title = prompt('일정 제목을 입력하세요');
                if (!title) return;
                setEvents((prev) => [
                  ...prev,
                  {
                    id: crypto.randomUUID(), // 고유 ID 생성
                    title,
                    start: info.dateStr, // 클릭한 날짜
                    allDay: true, // 종일 이벤트
                  },
                ]);
              }}
              eventClick={(info) => {
                if (confirm(`"${info.event.title}" 일정을 삭제할까요?`)) {
                  setEvents((prev) => prev.filter((e) => e.id !== info.event.id));
                }
              }}
              eventDrop={(info) => {
                setEvents((prev) =>
                  prev.map((e) =>
                    e.id === info.event.id
                      ? {
                          ...e,
                          start: info.event.start!, // 새로운 시작 시간
                          end: info.event.end ?? undefined, // 새로운 종료 시간
                        }
                      : e,
                  ),
                );
              }}
              eventResize={(info) => {
                setEvents((prev) =>
                  prev.map((e) =>
                    e.id === info.event.id
                      ? {
                          ...e,
                          start: info.event.start!, // 새로운 시작 시간
                          end: info.event.end ?? undefined, // 새로운 종료 시간
                        }
                      : e,
                  ),
                );
              }}
              // 날짜 변경 시 URL 업데이트 (무한 루프 방지)
              datesSet={(info) => {
                if (isInitialized.current) {
                  const currentDate = info.start.toISOString().split('T')[0];
                  const currentView = info.view.type;
                  const urlDate = searchParams.get('date');
                  const urlView = searchParams.get('view');

                  // URL과 현재 상태가 다를 때만 업데이트
                  if (urlDate !== currentDate || urlView !== currentView) {
                    updateURL(currentDate, currentView);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
