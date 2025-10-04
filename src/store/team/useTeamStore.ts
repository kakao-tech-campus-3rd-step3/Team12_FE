import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Team {
  team_id: number;
  team_name: string;
  team_description: string;
  team_code?: string;
}

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;

  setTeams: (teams: Team[]) => void;
  setCurrentTeam: (team: Team | null) => void;
  addTeam: (team: Team) => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set) => ({
      teams: [],
      currentTeam: null,

      setTeams: (teams) => set({ teams }),
      setCurrentTeam: (team) => set({ currentTeam: team }),
      addTeam: (team) => set((state) => ({ teams: [...state.teams, team] })),
    }),
    {
      name: 'team-storage',
      partialize: (state) => ({ teams: state.teams, currentTeam: state.currentTeam }),
    },
  ),
);
