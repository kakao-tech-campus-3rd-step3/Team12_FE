import { personalCalendarAPI } from '@/apis/services/calendar';
import { type Lecture } from '@/apis/types/calendar';
import { create } from 'zustand';
interface ClassState {
  lectures: Lecture[] | null;
  lectureNames: string[];
  getLectures: () => Promise<Lecture[] | null>;
  removeEvent: () => Promise<void>;
}

export const useClassStore = create<ClassState>((set) => ({
  lectures: [],
  lectureNames: [],
  getLectures: async () => {
    try {
      const response = await personalCalendarAPI.getLectures();
      const fetchedEvents = response ?? null;
      if (fetchedEvents) {
        set({ lectures: fetchedEvents });
        set({ lectureNames: fetchedEvents.map((lecture) => lecture.name) });
      } else {
        set({ lectures: [] });
      }
      return fetchedEvents;
    } catch (error) {
      return null;
    }
  },

  removeEvent: async () => {
    set({ lectures: [], lectureNames: [] });
  },
}));
