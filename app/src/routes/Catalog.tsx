import * as React from "react"
import { useNavigate } from "react-router-dom"
import * as Icons from "lucide-react"
import { Search, LayoutGrid, Plus } from "lucide-react"
import { PageContainer, PageHeader, EmptyState } from "@/components/page"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PriorityBadge } from "@/components/badges"
import { catalogItems, categories } from "@/lib/store"
import type { CatalogItem } from "@/lib/types"

function CatalogIcon({ name }: { name: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Wrench
  return <Cmp className="size-5 text-primary" />
}

export default function Catalog() {
  const navigate = useNavigate()
  const [search, setSearch] = React.useState("")
  const q = search.trim().toLowerCase()

  const filtered = catalogItems.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
  )

  const groups = categories
    .map((cat) => ({ cat, items: filtered.filter((c) => c.categoryId === cat.id) }))
    .filter((g) => g.items.length > 0)

  return (
    <PageContainer>
      <PageHeader
        title="Service Catalog"
        description="Pick a request type to start a pre-filled ticket, or log a free-form incident."
        actions={
          <Button variant="outline" className="gap-1.5" onClick={() => navigate("/tickets/new")}>
            <Plus className="size-4" />
            Free-form ticket
          </Button>
        }
      />

      <div className="relative mb-6 max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search request types…" className="pl-8" aria-label="Search catalog" />
      </div>

      {groups.length === 0 ? (
        <EmptyState icon={LayoutGrid} title="No request types found" description="Try a different search term." />
      ) : (
        <div className="space-y-8">
          {groups.map(({ cat, items }) => (
            <section key={cat.id}>
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{cat.name}</h2>
              <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))]">
                {items.map((item) => (
                  <CatalogCard key={item.id} item={item} onSelect={() => navigate(`/tickets/new?catalog=${item.id}`)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

function CatalogCard({ item, onSelect }: { item: CatalogItem; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} className="group text-left">
      <Card className="h-full gap-0 p-4 transition-colors group-hover:border-primary/40 group-hover:bg-accent/40">
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary/10">
            <CatalogIcon name={item.icon} />
          </span>
          <PriorityBadge priority={item.defaultPriority} />
        </div>
        <p className="font-medium">{item.name}</p>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">{item.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Target SLA · <span className="font-mono tabular-nums">{Math.round(item.slaResolutionMins / 60)}h</span>
        </p>
      </Card>
    </button>
  )
}
