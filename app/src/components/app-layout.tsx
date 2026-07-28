import * as React from "react"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { CommandPalette } from "@/components/command-palette"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useThemeEffect } from "@/lib/use-theme-effect"
import { useUiStore } from "@/lib/ui-store"

export function AppLayout() {
  useThemeEffect()
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const backgroundImage = useUiStore((s) => s.backgroundImage)

  return (
    <div
      className={
        "relative flex h-screen w-full overflow-hidden text-foreground " +
        (backgroundImage ? "bg-transparent" : "bg-background")
      }
    >
      {backgroundImage ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-background/70"
          />
        </>
      ) : null}
      <aside className="hidden md:block">
        <AppSidebar />
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <AppSidebar onNavigate={() => setMobileNavOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
