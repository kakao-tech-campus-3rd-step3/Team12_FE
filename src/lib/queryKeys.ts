export const queryKeys = {
  teams: ['teams'] as const,
  events: ['events'] as const,
  auth: ['auth'] as const,

  // 사용예시
  example: {
    all: ['example'] as const,
    list: () => [...queryKeys.example.all, 'list'] as const,
  },
} as const;
