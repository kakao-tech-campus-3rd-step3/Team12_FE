/**
 * FullCalendar의 이벤트 ID에서 event_id와 start_time 추출
 */
export const parseEventId = (id: string): { eventId: number; startTime?: string } => {
  const separatorIndex = id.indexOf('_');

  if (separatorIndex === -1) {
    // 일반 일정: "12"
    return { eventId: parseInt(id) };
  }

  // 반복 일정: "12_2025-10-07T00:00:00"
  return {
    eventId: parseInt(id.substring(0, separatorIndex)),
    startTime: id.substring(separatorIndex + 1),
  };
};
