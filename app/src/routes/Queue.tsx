import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { Inbox, Search, X, ArrowUpDown } from "lucide-react"
import { PageContainer } from "@/components/page"
import { EmptyState } from "@/components/page"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserAvatar } from "@/components/user-avatar"
import { PriorityBadge, StatusBadge, SlaChip, TypeBadge } from "@/components/badges"
import { useStore } from "@/lib/store"
import { useUiStore } from "@/lib/ui-store"
import { agentById, requesterById, categoryById } from "@/lib/lookups"
import {
  SAVED_VIEWS,
  applySavedView,
  savedViewCount,
  type SavedViewId,
} from "@/lib/selectors"
import { computeSla } from "@/lib/sla"
import {
  PRIORITY_ORDER,
  PRIORITY_LABEL,
  STATUS_ORDER,
  STATUS_LABEL,
  TYPE_LABEL,
} from "@/lib/constants"
import type { Ticket, Priority, TicketType } from "@/lib/types"
import { cn } from "@/lib/utils"

const ALL = "all"
type SortKey = "updated" | "priority" | "sla"

const PRIORITY_RANK: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export default function Queue() {
  const tickets = useStore((s) => s.tickets)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const view = (params.get("view") as SavedViewId) ?? "all_open"
  const [status, setStatus] = React.useState<string>(ALL)
  const [priority, setPriority] = React.useState<string>(ALL)
  const [type, setType] = React.useState<string>(ALL)
  const [assignee, setAssignee] = React.useState<string>(ALL)
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<SortKey>("updated")

  function setView(v: SavedViewId) {
    const next = new URLSearchParams(params)
    next.set("view", v)
    setParams(next, { replace: true })
  }

  const scoped = applySavedView(tickets, view, currentAgentId)
  const q = search.trim().toLowerCase()

  const filtered = scoped
    .filter((t) => (status === ALL ? true : t.status === status))
    .filter((t) => (priority === ALL ? true : t.priority === priority))
    .filter((t) => (type === ALL ? true : t.type === type))
    .filter((t) =>
      assignee === ALL
        ? true
        : assignee === "unassigned"
          ? !t.assigneeId
          : t.assigneeId === assignee,
    )
    .filter((t) => {
      if (!q) return true
      const requester = requesterById(t.requesterId)
      return (
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        (requester?.name.toLowerCase().includes(q) ?? false)
      )
    })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "priority") return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]
    if (sort === "sla") {
      const ra = computeSla(a).remainingMs ?? Number.MAX_SAFE_INTEGER
      const rb = computeSla(b).remainingMs ?? Number.MAX_SAFE_INTEGER
      return ra - rb
    }
    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
  })

  const hasFilters = status !== ALL || priority !== ALL || type !== ALL || assignee !== ALL || q.length > 0

  function clearFilters() {
    setStatus(ALL)
    setPriority(ALL)
    setType(ALL)
    setAssignee(ALL)
    setSearch("")
  }

  return (
    <div className="flex h-full min-h-0">
      <SavedViewsRail
        view={view}
        onSelect={setView}
        counts={SAVED_VIEWS.map((v) => ({ id: v.id, label: v.label, count: savedViewCount(tickets, v.id, currentAgentId) }))}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PageContainer className="flex min-h-0 flex-1 flex-col py-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-xl font-semibold">
              {SAVED_VIEWS.find((v) => v.id === view)?.label}
              <span className="ml-2 text-sm font-normal text-muted-foreground tabular-nums">{sorted.length}</span>
            </h1>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID, title, requester…"
                className="pl-8"
                aria-label="Search tickets"
              />
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <FilterSelect value={status} onChange={setStatus} placeholder="Status" options={STATUS_ORDER.map((s) => ({ value: s, label: STATUS_LABEL[s] }))} />
            <FilterSelect value={priority} onChange={setPriority} placeholder="Priority" options={PRIORITY_ORDER.map((p) => ({ value: p, label: PRIORITY_LABEL[p] }))} />
            <FilterSelect value={type} onChange={setType} placeholder="Type" options={(["incident", "request"] as TicketType[]).map((t) => ({ value: t, label: TYPE_LABEL[t] }))} />
            <AssigneeFilter value={assignee} onChange={setAssignee} tickets={tickets} />
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="ml-auto w-[150px]" aria-label="Sort by">
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last updated</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="sla">SLA remaining</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters ? (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="size-3.5" />
                Clear
              </Button>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-border">
            {sorted.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon={Inbox}
                  title="No tickets match these filters"
                  description="Try a different saved view or clear the active filters to see more tickets."
                  action={hasFilters ? <Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button> : undefined}
                />
              </div>
            ) : (
              <QueueTable tickets={sorted} onOpen={(id) => navigate(`/tickets/${id}`)} />
            )}
          </div>
        </PageContainer>
      </div>
    </div>
  )
}

function SavedViewsRail({
  view,
  onSelect,
  counts,
}: {
  view: SavedViewId
  onSelect: (v: SavedViewId) => void
  counts: { id: SavedViewId; label: string; count: number }[]
}) {
  return (
    <aside className="hidden w-52 shrink-0 border-r border-border bg-card/40 p-3 lg:block">
      <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Views</p>
      <ul className="space-y-0.5">
        {counts.map((v) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => onSelect(v.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                view === v.id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {v.label}
              <span className="text-xs tabular-nums">{v.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[130px]" aria-label={placeholder}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All {placeholder.toLowerCase()}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function AssigneeFilter({
  value,
  onChange,
  tickets,
}: {
  value: string
  onChange: (v: string) => void
  tickets: Ticket[]
}) {
  const assigneeIds = Array.from(new Set(tickets.map((t) => t.assigneeId).filter(Boolean))) as string[]
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]" aria-label="Assignee">
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All assignees</SelectItem>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {assigneeIds.map((id) => (
          <SelectItem key={id} value={id}>
            {agentById(id)?.name ?? id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function QueueTable({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (id: string) => void }) {
  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-card">
        <TableRow>
          <TableHead className="w-[92px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Requester</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden lg:table-cell">Assignee</TableHead>
          <TableHead>SLA</TableHead>
          <TableHead className="hidden xl:table-cell text-right">Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((t) => {
          const requester = requesterById(t.requesterId)
          const agent = agentById(t.assigneeId)
          const category = categoryById(t.categoryId)
          return (
            <TableRow key={t.id} className="cursor-pointer" onClick={() => onOpen(t.id)}>
              <TableCell className="font-mono text-xs text-muted-foreground">{t.id}</TableCell>
              <TableCell className="max-w-[320px]">
                <div className="flex items-center gap-2">
                  <TypeBadge type={t.type} className="hidden sm:inline-flex" />
                  <span className="truncate font-medium">{t.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{category?.name}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{requester?.name}</TableCell>
              <TableCell><PriorityBadge priority={t.priority} /></TableCell>
              <TableCell className="hidden sm:table-cell"><StatusBadge status={t.status} /></TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center gap-2">
                  <UserAvatar name={agent?.name} className="size-6" />
                  <span className="text-sm text-muted-foreground">{agent?.name ?? "—"}</span>
                </div>
              </TableCell>
              <TableCell><SlaChip ticket={t} /></TableCell>
              <TableCell className="hidden xl:table-cell text-right text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(t.updatedAt), { addSuffix: true })}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
