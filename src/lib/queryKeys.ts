export const queryKeys = {
  teams: ['teams'] as const,
  team: (teamId: number) => ['team', teamId] as const,
  teamAvailability: ['teamAvailability'] as const,
  teamRecommendTimes: ['teamRecommendTimes'] as const,
  teamUpcomingSchedule: (teamId: number) => ['teamUpcomingSchedule', teamId] as const,
  teamTodaySchedule: (teamId: number) => ['teamTodaySchedule', teamId] as const,
  lectures: ['lectures'] as const,
  events: ['events'] as const,
  auth: ['auth'] as const,

  // 사용예시
  example: {
    all: ['example'] as const,
    list: () => [...queryKeys.example.all, 'list'] as const,
  },
} as const;
