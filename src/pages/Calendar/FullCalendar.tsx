import { calendarAPI } from '@/apis';
import { useEvents, useModal } from '@/hooks';
import DateModal from '@/pages/Calendar/components/DateModal';
import { type CalendarEvent, type modifyCalendarEventRequest } from '@/types/calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CalendarPage = () => {
  const { setModalType, setIsOpen, isOpen, modalType } = useModal();
  const {
    events,
    getEvents,
    addEvent,
    removeEvent,
    updateEvent,
    handleEventDrop,
    handleEventResize,
  } = useEvents();

  const notNull = <T,>(value: T | null): value is T => value !== null;

  // 날짜를 YYYY-MM-DD 형식으로 변환하는 헬퍼 함수
  const formatLocalDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // CalendarEvent를 FullCalendar 형식으로 변환
  const formatEventsForCalendar = (events: CalendarEvent[]) => {
    return events
      .map((event) => {
        // ISO 문자열을 FullCalendar가 이해할 수 있는 형식으로 변환
        const startDate = new Date(event.start_time);
        const endDate = new Date(event.end_time);

        // 유효한 날짜인지 확인
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.warn('Invalid date format:', event);
          return null;
        }

        // 시간이 없는 경우 (종일 이벤트) 처리
        const hasTime = event.start_time.includes('T') && event.end_time.includes('T');

        return {
          id: event.event_id.toString(),
          title: event.title,
          start: hasTime ? startDate.toISOString() : formatLocalDate(startDate),
          end: hasTime ? endDate.toISOString() : formatLocalDate(endDate),
          allDay: !hasTime, // 시간이 없으면 종일 이벤트로 처리
        };
      })
      .filter(notNull); // null 값 제거 (타입 가드)
  };

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

  // 마운트 시 이벤트 초기 로딩
  useEffect(() => {
    void getEvents();
  }, [getEvents]);

  // 모달에서 이벤트 저장 핸들러
  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'event_id'>) => {
    if (modalType === 'add') {
      calendarAPI.addEvent({
        title: eventData.title,
        description: eventData.description,
        start_time: eventData.start_time,
        end_time: eventData.end_time,
        is_private: eventData.is_private,
      });
      addEvent(eventData);
    } else if (modalType === 'edit' && selectedEvent) {
      // API 명세서에 따라 event_id만 필수, 나머지는 수정할 필드만 포함
      const modifyData: modifyCalendarEventRequest = { event_id: selectedEvent.event_id };

      // 변경된 필드만 포함
      if (eventData.title !== selectedEvent.title) {
        modifyData.title = eventData.title;
      }
      if (eventData.description !== selectedEvent.description) {
        modifyData.description = eventData.description;
      }
      if (eventData.start_time !== selectedEvent.start_time) {
        modifyData.start_time = eventData.start_time;
      }
      if (eventData.end_time !== selectedEvent.end_time) {
        modifyData.end_time = eventData.end_time;
      }
      if (eventData.is_private !== selectedEvent.is_private) {
        modifyData.is_private = eventData.is_private;
      }

      console.log('modify payload:', modifyData);

      calendarAPI.modifyEvent(modifyData);
      updateEvent(selectedEvent.event_id, eventData);
    }
  };

  // 모달에서 이벤트 삭제 핸들러
  const handleDeleteEvent = (eventId: number) => {
    removeEvent(eventId);
    calendarAPI.deleteEvent(eventId);
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
                    const today = formatLocalDate(new Date());
                    addEvent({
                      title,
                      description: '',
                      start_time: `${today}T09:00:00`,
                      end_time: `${today}T10:00:00`,
                      is_private: false,
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
              events={events ? formatEventsForCalendar(events) : []}
              dayMaxEvents={false} // 모든 이벤트 표시 (끊김 방지)
              eventDisplay="block" // 이벤트를 블록 형태로 표시
              displayEventTime={true} // 이벤트 시간 표시
              eventMinHeight={30} // 최소 높이 설정
              eventOrderStrict={true} // 이벤트 순서 고정
              nextDayThreshold="00:00:00" // 다음 날 기준점 설정
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
                if (!events) return;
                const event = events.find((e) => e.event_id.toString() === info.event.id);
                if (event) {
                  setSelectedEvent(event);
                  setSelectedDate(undefined);
                  setModalType('edit');
                  setIsOpen(true);
                }
              }}
              eventDrop={(info) => {
                const eventId = parseInt(info.event.id);
                handleEventDrop(eventId, info.event.start!, info.event.end || undefined);
              }}
              eventResize={(info) => {
                const eventId = parseInt(info.event.id);
                handleEventResize(eventId, info.event.start!, info.event.end || undefined);
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
