import * as React from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowLeft, Inbox, Send, StickyNote, CheckCircle2 } from "lucide-react"
import { PageContainer, EmptyState } from "@/components/page"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserAvatar } from "@/components/user-avatar"
import { PriorityBadge, StatusBadge, SlaChip, TypeBadge } from "@/components/badges"
import { ResolveDialog } from "@/components/resolve-dialog"
import { useStore, agents, categories } from "@/lib/store"
import { useUiStore } from "@/lib/ui-store"
import { agentById, requesterById, categoryById, initials } from "@/lib/lookups"
import { computeSla, formatRemaining } from "@/lib/sla"
import {
  PRIORITY_ORDER,
  PRIORITY_LABEL,
  STATUS_LABEL,
  STATUS_TRANSITIONS,
} from "@/lib/constants"
import type { ActivityEntry, Ticket } from "@/lib/types"

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const ticket = useStore((s) => s.tickets.find((t) => t.id === id))

  if (!ticket) {
    return (
      <PageContainer>
        <EmptyState
          icon={Inbox}
          title="Ticket not found"
          description="This ticket may have been removed or the link is incorrect."
          action={<Button onClick={() => navigate("/queue")}>Back to queue</Button>}
        />
      </PageContainer>
    )
  }

  return <TicketView ticket={ticket} />
}

function TicketView({ ticket }: { ticket: Ticket }) {
  const updateField = useStore((s) => s.updateTicketField)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const [resolveOpen, setResolveOpen] = React.useState(false)

  const requester = requesterById(ticket.requesterId)
  const sla = computeSla(ticket)
  const transitions = STATUS_TRANSITIONS[ticket.status]

  function quickTransition(to: string) {
    if (to === "resolved") {
      setResolveOpen(true)
      return
    }
    updateField(ticket.id, "status", to, currentAgentId)
  }

  return (
    <PageContainer>
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to="/queue">
            <ArrowLeft className="size-4" />
            Queue
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
            <TypeBadge type={ticket.type} />
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance">{ticket.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            <SlaChip ticket={ticket} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {transitions.map((to) => (
            <Button
              key={to}
              size="sm"
              variant={to === "resolved" ? "default" : "outline"}
              onClick={() => quickTransition(to)}
              className="gap-1.5"
            >
              {to === "resolved" ? <CheckCircle2 className="size-4" /> : null}
              {to === "resolved" ? "Resolve" : `Move to ${STATUS_LABEL[to].toLowerCase()}`}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-5">
          <Card className="p-5">
            <h2 className="mb-2 text-sm font-semibold">Description</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{ticket.description}</p>
          </Card>

          {ticket.resolution ? (
            <Card className="border-[color-mix(in_oklch,var(--chart-2),transparent_70%)] bg-[color-mix(in_oklch,var(--chart-2),transparent_92%)] p-5">
              <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="size-4 text-[oklch(0.55_0.14_150)] dark:text-[oklch(0.72_0.14_150)]" />
                Resolution
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{ticket.resolution.note}</p>
              {ticket.resolution.kbArticleId ? (
                <Link
                  to={`/knowledge/${ticket.resolution.kbArticleId}`}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  View linked article →
                </Link>
              ) : null}
            </Card>
          ) : null}

          <Composer ticketId={ticket.id} />

          <ActivityTimeline entries={[...ticket.activity].reverse()} />
        </div>

        <PropertiesPanel ticket={ticket} />
      </div>

      <ResolveDialog ticket={ticket} open={resolveOpen} onOpenChange={setResolveOpen} />

      <div className="sr-only" aria-hidden>
        {sla.remainingMs !== null ? formatRemaining(sla.remainingMs) : sla.label}
        {requester?.name}
      </div>
    </PageContainer>
  )
}

const COMPOSER_MODES = { reply: "reply", note: "note" } as const

function Composer({ ticketId }: { ticketId: string }) {
  const addActivity = useStore((s) => s.addActivity)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const [mode, setMode] = React.useState<"reply" | "note">("reply")
  const [body, setBody] = React.useState("")

  function handleSubmit() {
    const trimmed = body.trim()
    if (!trimmed) return
    addActivity(ticketId, mode, trimmed, currentAgentId)
    setBody("")
  }

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as "reply" | "note")}
          size="sm"
        >
          <ToggleGroupItem value={COMPOSER_MODES.reply}>
            <Send className="size-3.5" />
            Reply
          </ToggleGroupItem>
          <ToggleGroupItem value={COMPOSER_MODES.note}>
            <StickyNote className="size-3.5" />
            Internal note
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={mode === "reply" ? "Write a reply to the requester…" : "Add an internal note (agents only)…"}
        rows={3}
        className={mode === "note" ? "bg-[color-mix(in_oklch,var(--chart-3),transparent_92%)]" : undefined}
      />
      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={handleSubmit} disabled={!body.trim()}>
          {mode === "reply" ? "Send reply" : "Add note"}
        </Button>
      </div>
    </Card>
  )
}

function ActivityTimeline({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return <p className="px-1 text-sm text-muted-foreground">No activity yet.</p>
  }
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold">Activity</h2>
      <ol className="space-y-4">
        {entries.map((e) => (
          <ActivityRow key={e.id} entry={e} />
        ))}
      </ol>
    </div>
  )
}

function ActivityRow({ entry }: { entry: ActivityEntry }) {
  const actor = agentById(entry.actorId) ?? requesterById(entry.actorId)
  const when = formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })

  if (entry.kind === "system") {
    return (
      <li className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[0.6rem] font-medium">
          {actor ? initials(actor.name) : "•"}
        </span>
        <span>
          <span className="font-medium text-foreground">{actor?.name ?? "System"}</span>{" "}
          {systemLabel(entry)} · {when}
        </span>
      </li>
    )
  }

  const isNote = entry.kind === "note"
  return (
    <li className="flex gap-3">
      <UserAvatar name={actor?.name} />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-xs">
          <span className="font-medium text-foreground">{actor?.name}</span>
          <span className="text-muted-foreground">{isNote ? "internal note" : "replied"}</span>
          <span className="text-muted-foreground">· {when}</span>
        </div>
        <div
          className={
            isNote
              ? "rounded-md border border-[color-mix(in_oklch,var(--chart-3),transparent_75%)] bg-[color-mix(in_oklch,var(--chart-3),transparent_92%)] px-3 py-2 text-sm text-pretty"
              : "rounded-md border border-border bg-card px-3 py-2 text-sm text-pretty"
          }
        >
          {entry.body}
        </div>
      </div>
    </li>
  )
}

function systemLabel(entry: ActivityEntry): string {
  if (entry.field === "status" && entry.to) {
    return `changed status to ${STATUS_LABEL[entry.to as keyof typeof STATUS_LABEL] ?? entry.to}`
  }
  if (entry.body.startsWith("Resolved")) return "resolved the ticket"
  if (entry.field === "assigneeId") return "reassigned the ticket"
  if (entry.field === "priority") return `set priority to ${entry.to}`
  if (entry.field === "categoryId") return "changed the category"
  return entry.body.toLowerCase()
}

function PropertiesPanel({ ticket }: { ticket: Ticket }) {
  const updateField = useStore((s) => s.updateTicketField)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const requester = requesterById(ticket.requesterId)
  const asset = useStore((s) => s.assets.find((a) => a.id === ticket.assetId))
  const sla = computeSla(ticket)

  const settled = ticket.status === "resolved" || ticket.status === "closed"

  return (
    <aside className="space-y-4">
      <Card className="space-y-4 p-4">
        <PanelField label="Priority">
          <Select value={ticket.priority} onValueChange={(v) => updateField(ticket.id, "priority", v, currentAgentId)} disabled={settled}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PRIORITY_ORDER.map((p) => (
                <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PanelField>

        <PanelField label="Assignee">
          <Select
            value={ticket.assigneeId ?? "unassigned"}
            onValueChange={(v) => updateField(ticket.id, "assigneeId", v === "unassigned" ? null : v, currentAgentId)}
          >
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {agents.map((a) => (
                <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PanelField>

        <PanelField label="Category">
          <Select value={ticket.categoryId} onValueChange={(v) => updateField(ticket.id, "categoryId", v, currentAgentId)}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PanelField>
      </Card>

      <Card className="space-y-3 p-4 text-sm">
        <MetaRow label="Requester">
          <div className="flex items-center gap-2">
            <UserAvatar name={requester?.name} className="size-6" />
            <div className="leading-tight">
              <p className="font-medium">{requester?.name}</p>
              <p className="text-xs text-muted-foreground">{requester?.department}</p>
            </div>
          </div>
        </MetaRow>
        <Separator />
        <MetaRow label="Linked asset">
          {asset ? (
            <Link to="/assets" className="font-medium text-primary hover:underline">
              {asset.name} <span className="font-mono text-xs text-muted-foreground">{asset.id}</span>
            </Link>
          ) : (
            <span className="text-muted-foreground">None</span>
          )}
        </MetaRow>
        <Separator />
        <MetaRow label="Created">
          <span className="text-muted-foreground">{format(new Date(ticket.createdAt), "d MMM, HH:mm")}</span>
        </MetaRow>
        <MetaRow label="Updated">
          <span className="text-muted-foreground">{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
        </MetaRow>
      </Card>

      <Card className="space-y-2 p-4 text-sm">
        <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">SLA</h3>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Resolution target</span>
          <span className="font-mono text-xs tabular-nums">{format(new Date(ticket.slaResolutionDueAt), "d MMM, HH:mm")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <SlaChip ticket={ticket} />
        </div>
        {!settled && sla.remainingMs !== null ? (
          <p className="text-xs text-muted-foreground">{formatRemaining(sla.remainingMs)} remaining</p>
        ) : null}
      </Card>
    </aside>
  )
}

function PanelField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="text-right">{children}</div>
    </div>
  )
}
