import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useMemo, useRef, useState } from 'react';

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

  const calendarRef = useRef<any>(null);

  const plugins = useMemo(() => [dayGridPlugin, timeGridPlugin, interactionPlugin], []);

  return (
    <div className="p-4 min-h-screen">
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
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'addEvent today', // 새 일정, 오늘 버튼
                center: 'prev title next', // 이전, 제목, 다음 버튼
                right: 'dayGridMonth,timeGridWeek,timeGridDay', // 월/주/일 뷰
              }}
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
                    calendarRef.current?.getApi().gotoToday();
                  },
                },
                dayGridMonth: {
                  text: '월간',
                  click: () => {
                    calendarRef.current?.getApi().changeView('dayGridMonth');
                  },
                },
                timeGridWeek: {
                  text: '주간',
                  click: () => {
                    calendarRef.current?.getApi().changeView('timeGridWeek');
                  },
                },
                timeGridDay: {
                  text: '일간',
                  click: () => {
                    calendarRef.current?.getApi().changeView('timeGridDay');
                  },
                },
              }}
              locale="ko"
              height="auto"
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
