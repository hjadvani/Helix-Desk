import { PageContainer, PageHeader } from "@/components/page"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user-avatar"
import { agents, useStore } from "@/lib/store"
import { activeCountForAgent, breachingCountForAgent } from "@/lib/selectors"

export default function Team() {
  const tickets = useStore((s) => s.tickets)

  const roster = agents
    .map((a) => ({
      agent: a,
      active: activeCountForAgent(tickets, a.id),
      breaching: breachingCountForAgent(tickets, a.id),
    }))
    .sort((x, y) => y.active - x.active)

  const maxLoad = Math.max(...roster.map((r) => r.active), 1)

  return (
    <PageContainer>
      <PageHeader title="Team" description="Support roster and current workload across the service desk." />

      <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(17rem,1fr))]">
        {roster.map(({ agent, active, breaching }) => (
          <Card key={agent.id} className="gap-3 p-4">
            <div className="flex items-center gap-3">
              <UserAvatar name={agent.name} className="size-10 text-sm" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{agent.name}</p>
                  {agent.role === "lead" ? (
                    <Badge className="rounded-full bg-primary/15 text-primary" >Lead</Badge>
                  ) : null}
                </div>
                <p className="truncate text-xs text-muted-foreground">{agent.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-md bg-muted/60 py-2">
                <p className="font-heading text-xl font-semibold tabular-nums">{active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="rounded-md bg-muted/60 py-2">
                <p className={breaching > 0 ? "font-heading text-xl font-semibold tabular-nums text-destructive" : "font-heading text-xl font-semibold tabular-nums"}>
                  {breaching}
                </p>
                <p className="text-xs text-muted-foreground">At risk</p>
              </div>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <LoadBar pct={(active / maxLoad) * 100} />
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  )
}

function LoadBar({ pct }: { pct: number }) {
  return <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
}
