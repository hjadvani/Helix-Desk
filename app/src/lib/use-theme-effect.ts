import * as React from "react"
import { useUiStore } from "@/lib/ui-store"

// Applies the persisted theme to <html> as the `.dark` class. This is a genuine
// external-system sync (the DOM), which is the correct use of useEffect.
export function useThemeEffect() {
  const theme = useUiStore((s) => s.theme)
  React.useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
  }, [theme])
}
