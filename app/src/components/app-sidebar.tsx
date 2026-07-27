import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Inbox,
  LayoutGrid,
  Server,
  BookOpen,
  Users,
  Hexagon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/queue", label: "Queue", icon: Inbox },
  { to: "/catalog", label: "Catalog", icon: LayoutGrid },
  { to: "/assets", label: "Assets", icon: Server },
  { to: "/knowledge", label: "Knowledge Base", icon: BookOpen },
  { to: "/team", label: "Team", icon: Users },
]

type AppSidebarProps = {
  onNavigate?: () => void
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex h-full w-60 shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar px-3 py-4"
    >
      <div className="flex items-center gap-2 px-2 pb-4">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Hexagon className="size-4.5" strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <p className="font-heading text-sm font-semibold text-sidebar-foreground">Helix Desk</p>
          <p className="text-[0.7rem] text-muted-foreground">Service Management</p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )
              }
            >
              <item.icon className="size-4.5 shrink-0" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
