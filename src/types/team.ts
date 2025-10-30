export interface Member {
  id: number;
  name: string;
  role: 'LEADER' | 'MEMBER';
}

export interface TimeSlot {
  id: number;
  day: string;
  time: string;
  participants: string;
  tag: '최적' | '좋음';
}

export interface Team {
  code: string;
  name: string;
  members: string[];
  meetings: number;
  color: string;
}
