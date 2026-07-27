// Domain types for Helix Desk (ITSM). No enums (build rejects them) — union types + as-const maps.

export type TicketType = "incident" | "request"
export type TicketStatus = "new" | "in_progress" | "on_hold" | "resolved" | "closed"
export type Priority = "critical" | "high" | "medium" | "low"

export type ActivityKind = "note" | "reply" | "system"

export type ActivityEntry = {
  id: string
  kind: ActivityKind
  actorId: string
  body: string
  createdAt: string
  // system events
  field?: string
  from?: string
  to?: string
}

export type Resolution = {
  note: string
  kbArticleId: string | null
}

export type Ticket = {
  id: string
  type: TicketType
  title: string
  description: string
  status: TicketStatus
  priority: Priority
  categoryId: string
  requesterId: string
  assigneeId: string | null
  assetId: string | null
  catalogItemId: string | null
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  slaResponseDueAt: string
  slaResolutionDueAt: string
  firstRespondedAt: string | null
  onHoldMs: number
  onHoldSince: string | null
  resolution: Resolution | null
  activity: ActivityEntry[]
}

export type AgentRole = "agent" | "lead"

export type Agent = {
  id: string
  name: string
  email: string
  avatarColor: string
  role: AgentRole
  title: string
}

export type Requester = {
  id: string
  name: string
  email: string
  department: string
  avatarColor: string
}

export type Category = {
  id: string
  name: string
  defaultPriority: Priority
}

export type CatalogItem = {
  id: string
  name: string
  description: string
  icon: string
  categoryId: string
  type: TicketType
  defaultPriority: Priority
  slaResolutionMins: number
}

export type AssetType =
  | "laptop"
  | "desktop"
  | "server"
  | "network"
  | "software"
  | "service"
  | "peripheral"

export type AssetStatus = "in_use" | "in_stock" | "in_repair" | "retired"

export type Asset = {
  id: string
  name: string
  type: AssetType
  status: AssetStatus
  ownerId: string | null
  location: string
  serialNo: string
  purchasedAt: string
  warrantyEndsAt: string
  notes: string
}

export type KbCategory = "howto" | "troubleshooting" | "policy" | "known_error"

export type KbArticle = {
  id: string
  title: string
  body: string
  category: KbCategory
  tags: string[]
  authorId: string
  updatedAt: string
  views: number
  helpful: number
}
