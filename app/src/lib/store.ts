import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  Ticket,
  Asset,
  KbArticle,
  Priority,
  TicketStatus,
  TicketType,
  ActivityEntry,
  ActivityKind,
} from "@/lib/types"
import { STORAGE_KEY } from "@/lib/constants"
import { slaTargetsFor } from "@/lib/sla"
import {
  AGENTS,
  REQUESTERS,
  CATEGORIES,
  CATALOG_ITEMS,
  ASSETS,
  KB_ARTICLES,
  TICKETS,
} from "@/data/seed"

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function nextTicketId(tickets: Ticket[], type: TicketType): string {
  const prefix = type === "incident" ? "INC" : "REQ"
  const max = tickets.reduce((m, t) => {
    if (!t.id.startsWith(prefix)) return m
    const n = Number(t.id.slice(prefix.length + 1))
    return Number.isFinite(n) ? Math.max(m, n) : m
  }, 1000)
  return `${prefix}-${max + 7}`
}

export type NewTicketInput = {
  type: TicketType
  title: string
  description: string
  requesterId: string
  categoryId: string
  priority: Priority
  assetId: string | null
  catalogItemId: string | null
}

type DataState = {
  tickets: Ticket[]
  assets: Asset[]
  articles: KbArticle[]
}

type StoreActions = {
  createTicket: (input: NewTicketInput, actorId: string) => Ticket
  updateTicketField: (
    id: string,
    field: "status" | "priority" | "assigneeId" | "categoryId" | "assetId",
    value: string | null,
    actorId: string,
  ) => void
  resolveTicket: (id: string, note: string, kbArticleId: string | null, actorId: string) => void
  addActivity: (id: string, kind: Exclude<ActivityKind, "system">, body: string, actorId: string) => void
  resetToSeed: () => void
}

function freshData(): DataState {
  // Deep clone so mutations never touch the module-level seed arrays.
  return {
    tickets: structuredClone(TICKETS),
    assets: structuredClone(ASSETS),
    articles: structuredClone(KB_ARTICLES),
  }
}

const STATUS_ACTIVE: TicketStatus[] = ["new", "in_progress", "on_hold"]

export const useStore = create<DataState & StoreActions>()(
  persist(
    (set, get) => ({
      ...freshData(),

      createTicket: (input, actorId) => {
        const now = new Date().toISOString()
        const targets = slaTargetsFor(input.priority, now)
        const id = nextTicketId(get().tickets, input.type)
        const ticket: Ticket = {
          id,
          type: input.type,
          title: input.title,
          description: input.description,
          status: "new",
          priority: input.priority,
          categoryId: input.categoryId,
          requesterId: input.requesterId,
          assigneeId: null,
          assetId: input.assetId,
          catalogItemId: input.catalogItemId,
          createdAt: now,
          updatedAt: now,
          resolvedAt: null,
          slaResponseDueAt: targets.slaResponseDueAt,
          slaResolutionDueAt: targets.slaResolutionDueAt,
          firstRespondedAt: null,
          onHoldMs: 0,
          onHoldSince: null,
          resolution: null,
          activity: [
            {
              id: uid("act"),
              kind: "system",
              actorId,
              body: "Ticket created",
              createdAt: now,
              field: "status",
              to: "new",
            },
          ],
        }
        set((s) => ({ tickets: [ticket, ...s.tickets] }))
        return ticket
      },

      updateTicketField: (id, field, value, actorId) => {
        set((s) => ({
          tickets: s.tickets.map((t) => {
            if (t.id !== id) return t
            const prev = t[field]
            if (prev === value) return t
            const now = new Date().toISOString()
            const event: ActivityEntry = {
              id: uid("act"),
              kind: "system",
              actorId,
              body: "Field updated",
              createdAt: now,
              field,
              from: prev == null ? undefined : String(prev),
              to: value == null ? undefined : String(value),
            }
            const next: Ticket = { ...t, [field]: value, updatedAt: now, activity: [...t.activity, event] }
            if (field === "status") {
              const status = value as TicketStatus
              // Pause / resume SLA on hold transitions.
              if (status === "on_hold" && t.status !== "on_hold") {
                next.onHoldSince = now
              } else if (t.status === "on_hold" && status !== "on_hold" && t.onHoldSince) {
                next.onHoldMs = t.onHoldMs + (Date.parse(now) - Date.parse(t.onHoldSince))
                next.onHoldSince = null
              }
              if (status === "closed" && !t.resolvedAt) next.resolvedAt = now
            }
            return next
          }),
        }))
      },

      resolveTicket: (id, note, kbArticleId, actorId) => {
        set((s) => ({
          tickets: s.tickets.map((t) => {
            if (t.id !== id) return t
            const now = new Date().toISOString()
            let onHoldMs = t.onHoldMs
            if (t.status === "on_hold" && t.onHoldSince) {
              onHoldMs += Date.parse(now) - Date.parse(t.onHoldSince)
            }
            const event: ActivityEntry = {
              id: uid("act"),
              kind: "system",
              actorId,
              body: `Resolved: ${note}`,
              createdAt: now,
              field: "status",
              from: t.status,
              to: "resolved",
            }
            return {
              ...t,
              status: "resolved",
              resolvedAt: now,
              updatedAt: now,
              onHoldMs,
              onHoldSince: null,
              resolution: { note, kbArticleId },
              activity: [...t.activity, event],
            }
          }),
        }))
      },

      addActivity: (id, kind, body, actorId) => {
        set((s) => ({
          tickets: s.tickets.map((t) => {
            if (t.id !== id) return t
            const now = new Date().toISOString()
            const entry: ActivityEntry = { id: uid("act"), kind, body, actorId, createdAt: now }
            const firstRespondedAt = t.firstRespondedAt ?? (kind === "reply" ? now : null)
            return { ...t, updatedAt: now, firstRespondedAt, activity: [...t.activity, entry] }
          }),
        }))
      },

      resetToSeed: () => set(freshData()),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({ tickets: s.tickets, assets: s.assets, articles: s.articles }),
    },
  ),
)

// Static reference data (never mutated) — exported directly for convenience.
export const agents = AGENTS
export const requesters = REQUESTERS
export const categories = CATEGORIES
export const catalogItems = CATALOG_ITEMS

export function isActiveStatus(status: TicketStatus): boolean {
  return STATUS_ACTIVE.includes(status)
}
