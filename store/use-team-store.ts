import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Team } from "@prisma/client";
import { getUserTeamsById } from "@/actions/teams";

interface TeamState {
  teams: Team[];
  activeTeam: Team | null;
  isInitialLoading: boolean;
  isSwitching: boolean;
  error: string | null;
  // Actions
  setTeams: (teams: Team[]) => void;
  setActiveTeam: (team: Team) => void;
  setInitialLoading: (isLoading: boolean) => void;
  setSwitching: (isSwitching: boolean) => void;
  setError: (error: string | null) => void;
  fetchTeams: (userId: string) => Promise<Team[]>;
  getActiveTeamSlug: () => string | null;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teams: [],
      activeTeam: null,
      isInitialLoading: true,
      isSwitching: false,
      error: null,

      setTeams: (teams) => set({ teams }),
      setActiveTeam: (team) => set({ activeTeam: team }),
      setInitialLoading: (isLoading) => set({ isInitialLoading: isLoading }),
      setSwitching: (isSwitching) => set({ isSwitching }),
      setError: (error) => set({ error }),

      getActiveTeamSlug: () => {
        const state = get();
        if (state.activeTeam) {
          return state.activeTeam.slug;
        }
        if (state.teams.length > 0) {
          // If no active team but teams exist, set first team as active
          const firstTeam = state.teams[0];
          set({ activeTeam: firstTeam });
          return firstTeam.slug;
        }
        return null;
      },

      fetchTeams: async (userId: string) => {
        try {
          const data = await getUserTeamsById(userId);
          set({ teams: data, error: null });

          // If we have teams but no active team, set the first team as active
          if (data.length > 0 && !get().activeTeam) {
            set({ activeTeam: data[0] });
          }

          return data;
        } catch (err) {
          set({ error: "Failed to fetch teams" });
          console.error(err);
          throw err;
        } finally {
          set({ isInitialLoading: false });
        }
      },
    }),
    {
      name: "team-storage", // name of the item in localStorage
      partialize: (state) => ({
        teams: state.teams,
        activeTeam: state.activeTeam,
      }),
    }
  )
);
