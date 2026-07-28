import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CURRENT_AGENT_KEY } from "@/lib/constants"
import { AGENTS } from "@/data/seed"

type Theme = "dark" | "light"

type UiState = {
  theme: Theme
  currentAgentId: string
  commandOpen: boolean
  backgroundImage: string | null
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setCurrentAgent: (id: string) => void
  setCommandOpen: (open: boolean) => void
  setBackgroundImage: (dataUrl: string | null) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      currentAgentId: AGENTS[0].id,
      commandOpen: false,
      backgroundImage: null,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setCurrentAgent: (currentAgentId) => set({ currentAgentId }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
    }),
    {
      name: CURRENT_AGENT_KEY,
      partialize: (s) => ({
        theme: s.theme,
        currentAgentId: s.currentAgentId,
        backgroundImage: s.backgroundImage,
      }),
    },
  ),
)
