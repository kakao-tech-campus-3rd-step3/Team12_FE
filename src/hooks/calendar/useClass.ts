import { personalCalendarAPI } from '@/apis';
import type { Lecture } from '@/apis/types/calendar';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useClass = () => {
  const {
    data: lectures,
    isLoading,
    error,
  } = useQuery<Lecture[]>({
    queryKey: queryKeys.lectures,
    queryFn: async () => {
      const response = await personalCalendarAPI.getLectures();
      return response;
    },
  });
  return { lectures, isLoading, error };
};
