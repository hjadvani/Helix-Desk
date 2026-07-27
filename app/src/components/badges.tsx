import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  PRIORITY_LABEL,
  PRIORITY_TONE,
  STATUS_LABEL,
  STATUS_TONE,
  TYPE_LABEL,
} from "@/lib/constants"
import type { Priority, TicketStatus, TicketType } from "@/lib/types"
import { computeSla, formatRemaining, SLA_STATE_TONE } from "@/lib/sla"
import type { Ticket } from "@/lib/types"
import { Circle } from "lucide-react"

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  return (
    <Badge className={cn("gap-1 rounded-full font-medium", PRIORITY_TONE[priority], className)}>
      <Circle className="size-1.5 fill-current" strokeWidth={0} />
      {PRIORITY_LABEL[priority]}
    </Badge>
  )
}

export function StatusBadge({ status, className }: { status: TicketStatus; className?: string }) {
  return (
    <Badge className={cn("rounded-full font-medium", STATUS_TONE[status], className)}>
      {STATUS_LABEL[status]}
    </Badge>
  )
}

export function TypeBadge({ type, className }: { type: TicketType; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full font-medium text-muted-foreground", className)}
    >
      {TYPE_LABEL[type]}
    </Badge>
  )
}

export function SlaChip({ ticket, className }: { ticket: Ticket; className?: string }) {
  const sla = computeSla(ticket)
  const text =
    sla.remainingMs === null ? sla.label : `${sla.label} · ${formatRemaining(sla.remainingMs)}`
  return (
    <Badge
      className={cn(
        "rounded-full font-mono text-[0.7rem] font-medium tabular-nums",
        SLA_STATE_TONE[sla.state],
        className,
      )}
    >
      {text}
    </Badge>
  )
}
