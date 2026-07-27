import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  PolarAngleAxis,
} from "recharts"
import { Inbox, UserX, AlarmClock, CheckCircle2, Timer, ShieldCheck, Activity } from "lucide-react"
import { PageContainer, PageHeader } from "@/components/page"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import {
  computeKpis,
  ticketsByStatus,
  ticketsByPriority,
  ticketsByCategory,
  createdVsResolvedTrend,
  agingBuckets,
  PRIORITY_CHART_COLOR,
  statusColor,
} from "@/lib/selectors"
import type { Priority } from "@/lib/types"
import { agentById } from "@/lib/lookups"
import { STATUS_LABEL, PRIORITY_LABEL } from "@/lib/constants"

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export default function Dashboard() {
  const tickets = useStore((s) => s.tickets)
  const navigate = useNavigate()

  const kpis = computeKpis(tickets)
  const byStatus = ticketsByStatus(tickets)
  const byPriority = ticketsByPriority(tickets)
  const byCategory = ticketsByCategory(tickets)
  const trend = createdVsResolvedTrend(tickets)
  const aging = agingBuckets(tickets)
  const recent = [...tickets]
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, 6)

  const compliance = kpis.slaCompliancePct ?? 0

  const stats = [
    { label: "Open tickets", value: kpis.open, icon: Inbox, to: "/queue?view=all_open" },
    { label: "Unassigned", value: kpis.unassigned, icon: UserX, to: "/queue?view=unassigned" },
    { label: "SLA at risk", value: kpis.breaching, icon: AlarmClock, to: "/queue?view=breaching", danger: true },
    { label: "Resolved today", value: kpis.resolvedToday, icon: CheckCircle2, to: "/queue?view=recently_resolved" },
    {
      label: "Avg resolution",
      value: kpis.avgResolutionHours == null ? "—" : `${kpis.avgResolutionHours.toFixed(1)}h`,
      icon: Timer,
    },
    {
      label: "SLA compliance",
      value: kpis.slaCompliancePct == null ? "—" : `${Math.round(kpis.slaCompliancePct)}%`,
      icon: ShieldCheck,
    },
  ]

  return (
    <PageContainer>
      <PageHeader title="Team Pulse" description="Live overview of queue load and SLA health across the service desk." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {stats.map((s) => (
          <button
            key={s.label}
            type="button"
            disabled={!s.to}
            onClick={() => s.to && navigate(s.to)}
            className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-left transition-colors enabled:hover:border-primary/40 enabled:hover:bg-accent/40 disabled:cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <s.icon className={s.danger ? "size-4 text-destructive" : "size-4 text-muted-foreground"} />
            </div>
            <span className="font-heading text-2xl font-semibold tabular-nums">{s.value}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold">Created vs resolved · last 14 days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={1} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} width={32} />
                <RechartsTooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="created" name="Created" stroke="var(--chart-1)" strokeWidth={2} fill="url(#gCreated)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="var(--chart-2)" strokeWidth={2} fill="url(#gResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center p-5">
          <h2 className="mb-2 self-start text-sm font-semibold">SLA compliance</h2>
          <div className="relative h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="72%"
                outerRadius="100%"
                data={[{ name: "compliance", value: compliance, fill: "var(--chart-2)" }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-3xl font-semibold tabular-nums">{Math.round(compliance)}%</span>
              <span className="text-xs text-muted-foreground">on resolved</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <ChartCard title="Tickets by status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStatus} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} width={28} />
              <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar dataKey="value" name="Tickets" radius={[4, 4, 0, 0]}>
                {byStatus.map((d) => (
                  <Cell key={d.key} fill={statusColor(d.key)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Open by priority">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byPriority} dataKey="value" nameKey="label" innerRadius={44} outerRadius={72} paddingAngle={2} strokeWidth={0}>
                {byPriority.map((d) => (
                  <Cell key={d.key} fill={PRIORITY_CHART_COLOR[d.key as Priority]} />
                ))}
              </Pie>
              <RechartsTooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {byPriority.map((d) => (
              <span key={d.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <LegendDot color={PRIORITY_CHART_COLOR[d.key as Priority]} />
                {PRIORITY_LABEL[d.key as Priority]}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Open by category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCategory} layout="vertical" margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis type="category" dataKey="label" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={92} />
              <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar dataKey="value" name="Open" radius={[0, 4, 4, 0]} fill="var(--chart-1)" barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <h2 className="mb-4 text-sm font-semibold">Aging · open tickets</h2>
          <ul className="space-y-3">
            {aging.map((b, i) => {
              const max = Math.max(...aging.map((x) => x.value), 1)
              return (
                <li key={b.label} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-xs text-muted-foreground">{b.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <BarFill pct={(b.value / max) * 100} color={CHART_COLORS[i % CHART_COLORS.length]} />
                  </div>
                  <span className="w-6 text-right text-sm font-medium tabular-nums">{b.value}</span>
                </li>
              )
            })}
          </ul>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <Activity className="size-4 text-muted-foreground" />
            Recent activity
          </h2>
          <ul className="divide-y divide-border">
            {recent.map((t) => {
              const agent = agentById(t.assigneeId)
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => navigate(`/tickets/${t.id}`)}
                    className="flex w-full items-center gap-3 py-2.5 text-left transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{t.title}</span>
                    <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{STATUS_LABEL[t.status]}</span>
                    <span className="hidden shrink-0 text-xs text-muted-foreground md:block">{agent?.name ?? "Unassigned"}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(t.updatedAt), { addSuffix: true })}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
    </PageContainer>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold">{title}</h2>
      <div className="h-56">{children}</div>
    </Card>
  )
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      {label ? <p className="mb-1 font-medium text-foreground">{label}</p> : null}
      {payload.map((p) => (
        <p key={p.name} className="text-muted-foreground">
          {p.name}: <span className="font-medium text-foreground tabular-nums">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

function LegendDot({ color }: { color: string }) {
  return <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
}

function BarFill({ pct, color }: { pct: number; color: string }) {
  return <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
}
