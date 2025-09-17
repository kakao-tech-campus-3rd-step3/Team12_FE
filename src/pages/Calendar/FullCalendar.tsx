import { useEvents, useModal } from '@/hooks';
import { formatLocalDate } from '@/hooks/calendar/useEvents';
import DateModal from '@/pages/Calendar/components/DateModal';
import { type CalendarEvent } from '@/types/calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CalendarPage = () => {
  const { setModalType, setIsOpen, isOpen, modalType } = useModal();
  const { events, addEvent, removeEvent, updateEvent, handleEventDrop, handleEventResize } =
    useEvents();

  const calendarRef = useRef<FullCalendar>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  //const navigate = useNavigate();
  const isInitialized = useRef(false);

  const plugins = useMemo(() => [dayGridPlugin, timeGridPlugin, interactionPlugin], []);

  // URL에서 현재 날짜와 뷰 정보 읽기
  const currentDate = searchParams.get('date') || formatLocalDate(new Date());
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

  // 모달에서 이벤트 저장 핸들러
  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (modalType === 'add') {
      addEvent(eventData);
    } else if (modalType === 'edit' && selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
    }
  };

  // 모달에서 이벤트 삭제 핸들러
  const handleDeleteEvent = (eventId: string) => {
    removeEvent(eventId);
  };

  return (
    <div className="p-2">
      <div className="mx-auto max-w-7xl">
        {/* <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">일정 관리</h1>
          <p className="text-gray-600">팀 일정을 효율적으로 관리하세요</p>
        </div> */}

        <div className="overflow-hidden bg-white rounded-2xl shadow-xl">
          <div className="p-1 py-4 sm:p-6">
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
                    addEvent({
                      title,
                      start: formatLocalDate(new Date()),
                      private: false,
                    });
                  },
                },
                today: {
                  text: '오늘',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentView = calendarApi.view.type;
                    const today = formatLocalDate(new Date());
                    calendarApi.gotoDate(today);
                    updateURL(today, currentView);
                  },
                },
                dayGridMonth: {
                  text: '월간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = formatLocalDate(calendarApi.getDate());
                    calendarApi.changeView('dayGridMonth');
                    updateURL(currentDate, 'dayGridMonth');
                  },
                },
                timeGridWeek: {
                  text: '주간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = formatLocalDate(calendarApi.getDate());
                    calendarApi.changeView('timeGridWeek');
                    updateURL(currentDate, 'timeGridWeek');
                  },
                },
                timeGridDay: {
                  text: '일간',
                  click: () => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (!calendarApi) return;
                    const currentDate = formatLocalDate(calendarApi.getDate());
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
                setSelectedDate(info.dateStr);
                setSelectedEvent(undefined);
                setModalType('add');
                setIsOpen(true);
              }}
              eventClick={(info) => {
                const event = events.find((e) => e.id === info.event.id);
                if (event) {
                  setSelectedEvent(event);
                  setSelectedDate(undefined);
                  setModalType('edit');
                  setIsOpen(true);
                }
              }}
              eventDrop={(info) => {
                handleEventDrop(info.event.id, info.event.start!);
              }}
              eventResize={(info) => {
                handleEventResize(info.event.id, info.event.start!);
              }}
              // 날짜 변경 시 URL 업데이트 (무한 루프 방지)
              datesSet={(info) => {
                if (isInitialized.current) {
                  const currentDate = formatLocalDate(info.start);
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
      <DateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalType={modalType}
        selectedEvent={selectedEvent}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onChangeModalType={setModalType}
      />
    </div>
  );
};

export default CalendarPage;
