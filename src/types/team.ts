export interface Member {
  id: number;
  name: string;
  status: '온라인' | '바쁨' | '오프라인';
  avatar?: string;
  email?: string;
}

export interface TimeSlot {
  id: number;
  day: string;
  time: string;
  participants: string;
  tag: '최적' | '좋음';
}
