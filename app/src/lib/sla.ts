import type { Ticket } from "@/lib/types"
import { SLA_DUE_SOON_RATIO, SLA_POLICY } from "@/lib/constants"

export type SlaState = "on_track" | "due_soon" | "breaching" | "met" | "missed"

export type SlaInfo = {
  state: SlaState
  // Positive = time remaining, negative = overdue. In milliseconds. null when settled.
  remainingMs: number | null
  dueAt: string
  label: string
}

const MIN = 60 * 1000

export function slaTargetsFor(priority: Ticket["priority"], createdAt: string) {
  const base = new Date(createdAt).getTime()
  const policy = SLA_POLICY[priority]
  return {
    slaResponseDueAt: new Date(base + policy.responseMins * MIN).toISOString(),
    slaResolutionDueAt: new Date(base + policy.resolutionMins * MIN).toISOString(),
  }
}

// Effective "now" for a ticket accounts for paused (on-hold) time. We push the due date
// forward by accumulated on-hold time so the countdown freezes while on hold.
function effectiveDueAt(ticket: Ticket, now: number): number {
  const due = new Date(ticket.slaResolutionDueAt).getTime()
  let holdMs = ticket.onHoldMs
  if (ticket.status === "on_hold" && ticket.onHoldSince) {
    holdMs += now - new Date(ticket.onHoldSince).getTime()
  }
  return due + holdMs
}

export function computeSla(ticket: Ticket, now: number = Date.now()): SlaInfo {
  const dueAt = ticket.slaResolutionDueAt
  const totalMs = SLA_POLICY[ticket.priority].resolutionMins * MIN

  if (ticket.status === "resolved" || ticket.status === "closed") {
    const settledAt = ticket.resolvedAt ? new Date(ticket.resolvedAt).getTime() : now
    const effDue = effectiveDueAt(ticket, settledAt)
    const met = settledAt <= effDue
    return {
      state: met ? "met" : "missed",
      remainingMs: null,
      dueAt,
      label: met ? "Met" : "Missed",
    }
  }

  const effDue = effectiveDueAt(ticket, now)
  const remainingMs = effDue - now

  if (remainingMs < 0) {
    return { state: "breaching", remainingMs, dueAt, label: "Breaching" }
  }
  if (remainingMs < totalMs * SLA_DUE_SOON_RATIO) {
    return { state: "due_soon", remainingMs, dueAt, label: "Due soon" }
  }
  return { state: "on_track", remainingMs, dueAt, label: "On track" }
}

export function formatRemaining(ms: number): string {
  const overdue = ms < 0
  const abs = Math.abs(ms)
  const totalMins = Math.floor(abs / MIN)
  const days = Math.floor(totalMins / (60 * 24))
  const hours = Math.floor((totalMins % (60 * 24)) / 60)
  const mins = totalMins % 60
  let core: string
  if (days > 0) core = `${days}d ${hours}h`
  else if (hours > 0) core = `${hours}h ${mins}m`
  else core = `${mins}m`
  return overdue ? `${core} over` : core
}

export const SLA_STATE_TONE: Record<SlaState, string> = {
  on_track: "border-transparent bg-[color-mix(in_oklch,var(--chart-2),transparent_82%)] text-[oklch(0.5_0.13_150)] dark:text-[oklch(0.72_0.14_150)]",
  due_soon: "border-transparent bg-[color-mix(in_oklch,var(--chart-3),transparent_80%)] text-[oklch(0.58_0.16_55)] dark:text-[oklch(0.78_0.16_55)]",
  breaching: "border-transparent bg-destructive/15 text-destructive",
  met: "border-transparent bg-[color-mix(in_oklch,var(--chart-2),transparent_85%)] text-[oklch(0.5_0.13_150)] dark:text-[oklch(0.72_0.14_150)]",
  missed: "border-transparent bg-destructive/10 text-destructive",
}
