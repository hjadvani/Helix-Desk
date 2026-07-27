import type { Ticket, TicketStatus, Priority } from "@/lib/types"
import { computeSla } from "@/lib/sla"
import { isActiveStatus } from "@/lib/store"
import { PRIORITY_ORDER, PRIORITY_LABEL, STATUS_LABEL, STATUS_ORDER } from "@/lib/constants"
import { categories } from "@/lib/store"

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

export type SavedViewId =
  | "my_open"
  | "unassigned"
  | "breaching"
  | "all_open"
  | "recently_resolved"

export const SAVED_VIEWS: { id: SavedViewId; label: string }[] = [
  { id: "all_open", label: "All open" },
  { id: "my_open", label: "My open" },
  { id: "unassigned", label: "Unassigned" },
  { id: "breaching", label: "Breaching soon" },
  { id: "recently_resolved", label: "Recently resolved" },
]

export function applySavedView(tickets: Ticket[], view: SavedViewId, currentAgentId: string): Ticket[] {
  switch (view) {
    case "my_open":
      return tickets.filter((t) => isActiveStatus(t.status) && t.assigneeId === currentAgentId)
    case "unassigned":
      return tickets.filter((t) => isActiveStatus(t.status) && !t.assigneeId)
    case "breaching":
      return tickets.filter((t) => {
        if (!isActiveStatus(t.status)) return false
        const s = computeSla(t).state
        return s === "breaching" || s === "due_soon"
      })
    case "recently_resolved":
      return tickets
        .filter((t) => t.status === "resolved" || t.status === "closed")
        .sort((a, b) => Date.parse(b.resolvedAt ?? b.updatedAt) - Date.parse(a.resolvedAt ?? a.updatedAt))
    case "all_open":
    default:
      return tickets.filter((t) => isActiveStatus(t.status))
  }
}

export function savedViewCount(tickets: Ticket[], view: SavedViewId, currentAgentId: string): number {
  return applySavedView(tickets, view, currentAgentId).length
}

// ---- Dashboard KPIs ----

export type Kpis = {
  open: number
  unassigned: number
  breaching: number
  resolvedToday: number
  avgResolutionHours: number | null
  slaCompliancePct: number | null
}

export function computeKpis(tickets: Ticket[], now: number = Date.now()): Kpis {
  const open = tickets.filter((t) => isActiveStatus(t.status)).length
  const unassigned = tickets.filter((t) => isActiveStatus(t.status) && !t.assigneeId).length
  const breaching = tickets.filter((t) => {
    if (!isActiveStatus(t.status)) return false
    const s = computeSla(t, now).state
    return s === "breaching" || s === "due_soon"
  }).length

  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const resolvedToday = tickets.filter(
    (t) => t.resolvedAt && Date.parse(t.resolvedAt) >= startOfToday.getTime(),
  ).length

  const settled = tickets.filter((t) => t.resolvedAt)
  const avgResolutionHours =
    settled.length === 0
      ? null
      : settled.reduce((sum, t) => sum + (Date.parse(t.resolvedAt as string) - Date.parse(t.createdAt)), 0) /
        settled.length /
        HOUR

  const met = settled.filter((t) => computeSla(t, now).state === "met").length
  const slaCompliancePct = settled.length === 0 ? null : (met / settled.length) * 100

  return { open, unassigned, breaching, resolvedToday, avgResolutionHours, slaCompliancePct }
}

export function ticketsByStatus(tickets: Ticket[]) {
  return STATUS_ORDER.map((status) => ({
    key: status,
    label: STATUS_LABEL[status],
    value: tickets.filter((t) => t.status === status).length,
  }))
}

export function ticketsByPriority(tickets: Ticket[]) {
  return PRIORITY_ORDER.map((priority) => ({
    key: priority,
    label: PRIORITY_LABEL[priority],
    value: tickets.filter((t) => t.status !== "closed" && t.priority === priority).length,
  }))
}

export function ticketsByCategory(tickets: Ticket[]) {
  return categories
    .map((c) => ({
      key: c.id,
      label: c.name,
      value: tickets.filter((t) => isActiveStatus(t.status) && t.categoryId === c.id).length,
    }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value)
}

export function createdVsResolvedTrend(tickets: Ticket[], days = 14, now: number = Date.now()) {
  const out: { day: string; created: number; resolved: number }[] = []
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = start.getTime() - i * DAY
    const dayEnd = dayStart + DAY
    const created = tickets.filter((t) => {
      const c = Date.parse(t.createdAt)
      return c >= dayStart && c < dayEnd
    }).length
    const resolved = tickets.filter((t) => {
      if (!t.resolvedAt) return false
      const r = Date.parse(t.resolvedAt)
      return r >= dayStart && r < dayEnd
    }).length
    const label = new Date(dayStart).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    out.push({ day: label, created, resolved })
  }
  return out
}

export type AgingBucket = { label: string; value: number }

export function agingBuckets(tickets: Ticket[], now: number = Date.now()): AgingBucket[] {
  const open = tickets.filter((t) => isActiveStatus(t.status))
  const buckets: AgingBucket[] = [
    { label: "< 4h", value: 0 },
    { label: "4–24h", value: 0 },
    { label: "1–3d", value: 0 },
    { label: "3–7d", value: 0 },
    { label: "> 7d", value: 0 },
  ]
  for (const t of open) {
    const age = now - Date.parse(t.createdAt)
    if (age < 4 * HOUR) buckets[0].value++
    else if (age < DAY) buckets[1].value++
    else if (age < 3 * DAY) buckets[2].value++
    else if (age < 7 * DAY) buckets[3].value++
    else buckets[4].value++
  }
  return buckets
}

export function activeCountForAgent(tickets: Ticket[], agentId: string): number {
  return tickets.filter((t) => isActiveStatus(t.status) && t.assigneeId === agentId).length
}

export function breachingCountForAgent(tickets: Ticket[], agentId: string, now: number = Date.now()): number {
  return tickets.filter((t) => {
    if (!isActiveStatus(t.status) || t.assigneeId !== agentId) return false
    const s = computeSla(t, now).state
    return s === "breaching" || s === "due_soon"
  }).length
}

export const PRIORITY_CHART_COLOR: Record<Priority, string> = {
  critical: "var(--destructive)",
  high: "var(--chart-3)",
  medium: "var(--chart-5)",
  low: "var(--chart-2)",
}

export function statusColor(status: TicketStatus): string {
  const map: Record<TicketStatus, string> = {
    new: "var(--chart-4)",
    in_progress: "var(--chart-5)",
    on_hold: "var(--muted-foreground)",
    resolved: "var(--chart-2)",
    closed: "var(--muted-foreground)",
  }
  return map[status]
}
