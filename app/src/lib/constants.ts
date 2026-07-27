import type {
  Priority,
  TicketStatus,
  TicketType,
  AssetStatus,
  AssetType,
  KbCategory,
} from "@/lib/types"

export const STORAGE_KEY = "helix-desk-store-v1"
export const CURRENT_AGENT_KEY = "helix-desk-current-agent-v1"
export const MIN_DESCRIPTION_LEN = 10
export const SLA_DUE_SOON_RATIO = 0.25

// SLA policy per priority — response + resolution minutes.
export const SLA_POLICY: Record<Priority, { responseMins: number; resolutionMins: number }> = {
  critical: { responseMins: 15, resolutionMins: 240 },
  high: { responseMins: 30, resolutionMins: 480 },
  medium: { responseMins: 120, resolutionMins: 1440 },
  low: { responseMins: 240, resolutionMins: 2880 },
}

export const PRIORITY_ORDER: Priority[] = ["critical", "high", "medium", "low"]
export const STATUS_ORDER: TicketStatus[] = [
  "new",
  "in_progress",
  "on_hold",
  "resolved",
  "closed",
]

export const PRIORITY_LABEL: Record<Priority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
}

export const STATUS_LABEL: Record<TicketStatus, string> = {
  new: "New",
  in_progress: "In progress",
  on_hold: "On hold",
  resolved: "Resolved",
  closed: "Closed",
}

export const TYPE_LABEL: Record<TicketType, string> = {
  incident: "Incident",
  request: "Request",
}

// Valid status transitions (workflow). Closed is terminal; resolved can reopen or close.
export const STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  new: ["in_progress", "on_hold"],
  in_progress: ["on_hold", "resolved"],
  on_hold: ["in_progress"],
  resolved: ["closed", "in_progress"],
  closed: [],
}

export const ASSET_TYPE_LABEL: Record<AssetType, string> = {
  laptop: "Laptop",
  desktop: "Desktop",
  server: "Server",
  network: "Network",
  software: "Software",
  service: "Service",
  peripheral: "Peripheral",
}

export const ASSET_STATUS_LABEL: Record<AssetStatus, string> = {
  in_use: "In use",
  in_stock: "In stock",
  in_repair: "In repair",
  retired: "Retired",
}

export const KB_CATEGORY_LABEL: Record<KbCategory, string> = {
  howto: "How-to",
  troubleshooting: "Troubleshooting",
  policy: "Policy",
  known_error: "Known error",
}

// Semantic token mapping for badges. Colors come from theme tokens via arbitrary classes.
export const PRIORITY_TONE: Record<Priority, string> = {
  critical: "border-transparent bg-destructive/15 text-destructive",
  high: "border-transparent bg-[color-mix(in_oklch,var(--chart-3),transparent_82%)] text-[oklch(0.62_0.16_55)] dark:text-[oklch(0.78_0.16_55)]",
  medium: "border-transparent bg-[color-mix(in_oklch,var(--chart-5),transparent_82%)] text-[oklch(0.52_0.14_235)] dark:text-[oklch(0.72_0.14_235)]",
  low: "border-transparent bg-[color-mix(in_oklch,var(--chart-2),transparent_82%)] text-[oklch(0.5_0.13_150)] dark:text-[oklch(0.72_0.14_150)]",
}

export const STATUS_TONE: Record<TicketStatus, string> = {
  new: "border-transparent bg-[color-mix(in_oklch,var(--chart-4),transparent_82%)] text-[oklch(0.52_0.14_285)] dark:text-[oklch(0.74_0.14_285)]",
  in_progress: "border-transparent bg-[color-mix(in_oklch,var(--chart-5),transparent_82%)] text-[oklch(0.52_0.14_235)] dark:text-[oklch(0.72_0.14_235)]",
  on_hold: "border-transparent bg-muted text-muted-foreground",
  resolved: "border-transparent bg-[color-mix(in_oklch,var(--chart-2),transparent_82%)] text-[oklch(0.5_0.13_150)] dark:text-[oklch(0.72_0.14_150)]",
  closed: "border-transparent bg-muted text-muted-foreground",
}
