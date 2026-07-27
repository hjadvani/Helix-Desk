import { agents, requesters, categories, catalogItems } from "@/lib/store"
import type { Agent, Requester, Category, CatalogItem } from "@/lib/types"

export function agentById(id: string | null | undefined): Agent | undefined {
  if (!id) return undefined
  return agents.find((a) => a.id === id)
}

export function requesterById(id: string | null | undefined): Requester | undefined {
  if (!id) return undefined
  return requesters.find((r) => r.id === id)
}

export function categoryById(id: string | null | undefined): Category | undefined {
  if (!id) return undefined
  return categories.find((c) => c.id === id)
}

export function catalogItemById(id: string | null | undefined): CatalogItem | undefined {
  if (!id) return undefined
  return catalogItems.find((c) => c.id === id)
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}
