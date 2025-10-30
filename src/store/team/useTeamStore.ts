import { teamAPI } from '@/apis/services/team';
import type { TeamData } from '@/apis/types/team';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TeamState {
  teams: TeamData[];
  currentTeam: TeamData | null;

  setTeams: (teams: TeamData[]) => void;
  setCurrentTeam: (team: TeamData | null) => void;
  addTeam: (team: TeamData) => void;
  refreshTeams: () => Promise<void>;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teams: [],
      currentTeam: null,

      setTeams: (teams) => set({ teams }),
      setCurrentTeam: (team) => set({ currentTeam: team }),
      addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
      refreshTeams: async () => {
        try {
          const response = await teamAPI.getTeams();
          set({ teams: response.content });
        } catch (error) {
          console.error('팀 목록 새로고침 실패:', error);
        }
      },
    }),
    {
      name: 'team-storage',
      partialize: (state) => ({ teams: state.teams, currentTeam: state.currentTeam }),
    },
  ),
);
