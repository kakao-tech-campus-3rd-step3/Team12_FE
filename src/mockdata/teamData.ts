import type { Member, TimeSlot, Team } from '@/types/team';

export const mockMembers: Member[] = [
  { id: 1, name: '김민수', status: '온라인' },
  { id: 2, name: '박지영', status: '바쁨' },
  { id: 3, name: '강민재', status: '바쁨' },
  { id: 4, name: '송하늘', status: '온라인' },
  { id: 5, name: '이도윤', status: '온라인' },
  { id: 6, name: '최서연', status: '바쁨' },
  { id: 7, name: '정우진', status: '온라인' },
  { id: 8, name: '한지민', status: '바쁨' },
];

export const mockTimeSlots: TimeSlot[] = [
  {
    id: 1,
    day: '9월 8일 월요일',
    time: '10:00-12:00',
    participants: '8/8명 참석 가능',
    tag: '최적',
  },
  {
    id: 2,
    day: '9월 9일 화요일',
    time: '14:00-16:00',
    participants: '8/8명 참석 가능',
    tag: '최적',
  },
  {
    id: 3,
    day: '9월 10일 수요일',
    time: '09:00-11:00',
    participants: '7/8명 참석 가능',
    tag: '좋음',
  },
  {
    id: 4,
    day: '9월 11일 목요일',
    time: '15:00-17:00',
    participants: '6/8명 참석 가능',
    tag: '좋음',
  },
];

export const mockTeams: Team[] = [
  {
    id: 'WEB2024',
    name: '웹개발 팀플',
    members: ['푸름이', '김철수', '이영희', '박민수'],
    meetings: 2,
    color: 'blue',
  },
  {
    id: 'AI2024',
    name: 'AI 공모전',
    members: ['푸름이', '최지훈', '정수연'],
    meetings: 1,
    color: 'emerald',
  },
  {
    id: 'STUDY2024',
    name: '스터디 그룹',
    members: ['푸름이', '한지민'],
    meetings: 0,
    color: 'amber',
  },
  {
    id: 'STUDY2024',
    name: '스터디 그룹',
    members: ['푸름이', '한지민'],
    meetings: 0,
    color: 'amber',
  },
  {
    id: 'STUDY2024',
    name: '스터디 그룹',
    members: ['푸름이', '한지민'],
    meetings: 0,
    color: 'amber',
  },
];
