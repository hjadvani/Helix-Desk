import { useNavigate } from "react-router-dom"
import { Search, Moon, Sun, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUiStore } from "@/lib/ui-store"
import { agents, useStore } from "@/lib/store"
import { agentById } from "@/lib/lookups"
import { toast } from "sonner"

type AppTopbarProps = {
  onOpenMobileNav: () => void
}

export function AppTopbar({ onOpenMobileNav }: AppTopbarProps) {
  const navigate = useNavigate()
  const theme = useUiStore((s) => s.theme)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  const setCommandOpen = useUiStore((s) => s.setCommandOpen)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const setCurrentAgent = useUiStore((s) => s.setCurrentAgent)
  const resetToSeed = useStore((s) => s.resetToSeed)
  const agent = agentById(currentAgentId)

  function handleReset() {
    resetToSeed()
    toast.success("Demo dataset restored")
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:max-w-md"
      >
        <Search className="size-4" />
        <span>Search tickets, assets, articles…</span>
        <kbd className="ml-auto hidden rounded border border-border bg-background px-1.5 font-mono text-[0.7rem] sm:inline">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5">
        <Button size="sm" className="hidden gap-1.5 sm:inline-flex" onClick={() => navigate("/tickets/new")}>
          <Plus className="size-4" />
          New ticket
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <UserAvatar name={agent?.name} />
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-sm font-medium text-foreground">{agent?.name}</span>
                <span className="block text-[0.7rem] text-muted-foreground">{agent?.title}</span>
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Acting as</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={currentAgentId} onValueChange={setCurrentAgent}>
              {agents.map((a) => (
                <DropdownMenuRadioItem key={a.id} value={a.id}>
                  {a.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleReset}>Reset demo data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
