import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useUiStore } from "@/lib/ui-store"
import { useStore } from "@/lib/store"
import { Plus, Ticket as TicketIcon, Server, BookOpen } from "lucide-react"

const MAX_RESULTS = 6

export function CommandPalette() {
  const open = useUiStore((s) => s.commandOpen)
  const setOpen = useUiStore((s) => s.setCommandOpen)
  const tickets = useStore((s) => s.tickets)
  const assets = useStore((s) => s.assets)
  const articles = useStore((s) => s.articles)
  const navigate = useNavigate()

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(!useUiStore.getState().commandOpen)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [setOpen])

  function go(path: string) {
    setOpen(false)
    navigate(path)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tickets, assets, articles, or actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="new ticket create" onSelect={() => go("/tickets/new")}>
            <Plus />
            Create new ticket
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Tickets">
          {tickets.slice(0, MAX_RESULTS).map((t) => (
            <CommandItem
              key={t.id}
              value={`${t.id} ${t.title}`}
              onSelect={() => go(`/tickets/${t.id}`)}
            >
              <TicketIcon />
              <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
              <span className="truncate">{t.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Assets">
          {assets.slice(0, MAX_RESULTS).map((a) => (
            <CommandItem key={a.id} value={`${a.id} ${a.name}`} onSelect={() => go("/assets")}>
              <Server />
              <span className="font-mono text-xs text-muted-foreground">{a.id}</span>
              <span className="truncate">{a.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Knowledge base">
          {articles.slice(0, MAX_RESULTS).map((a) => (
            <CommandItem
              key={a.id}
              value={a.title}
              onSelect={() => go(`/knowledge/${a.id}`)}
            >
              <BookOpen />
              <span className="truncate">{a.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
