import * as React from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { Search, Server } from "lucide-react"
import { PageContainer, PageHeader, EmptyState } from "@/components/page"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"
import { requesterById } from "@/lib/lookups"
import {
  ASSET_STATUS_LABEL,
  ASSET_TYPE_LABEL,
} from "@/lib/constants"
import { isActiveStatus } from "@/lib/store"
import { StatusBadge, PriorityBadge } from "@/components/badges"
import type { Asset, AssetStatus, AssetType, Ticket } from "@/lib/types"
import { cn } from "@/lib/utils"

const ALL = "all"

const ASSET_STATUS_TONE: Record<AssetStatus, string> = {
  in_use: "bg-[color-mix(in_oklch,var(--chart-2),transparent_82%)] text-[oklch(0.5_0.13_150)] dark:text-[oklch(0.72_0.14_150)]",
  in_stock: "bg-[color-mix(in_oklch,var(--chart-5),transparent_82%)] text-[oklch(0.52_0.14_235)] dark:text-[oklch(0.72_0.14_235)]",
  in_repair: "bg-[color-mix(in_oklch,var(--chart-3),transparent_80%)] text-[oklch(0.58_0.16_55)] dark:text-[oklch(0.78_0.16_55)]",
  retired: "bg-muted text-muted-foreground",
}

export default function Assets() {
  const assets = useStore((s) => s.assets)
  const [type, setType] = React.useState(ALL)
  const [status, setStatus] = React.useState(ALL)
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState<Asset | null>(null)
  const q = search.trim().toLowerCase()

  const filtered = assets
    .filter((a) => (type === ALL ? true : a.type === type))
    .filter((a) => (status === ALL ? true : a.status === status))
    .filter((a) => !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q))

  const ASSET_TYPES = Object.keys(ASSET_TYPE_LABEL) as AssetType[]
  const ASSET_STATUSES = Object.keys(ASSET_STATUS_LABEL) as AssetStatus[]

  return (
    <PageContainer>
      <PageHeader title="Assets" description="Configuration items across hardware, software, and services." />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets…" className="pl-8" aria-label="Search assets" />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[140px]" aria-label="Type"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            {ASSET_TYPES.map((t) => <SelectItem key={t} value={t}>{ASSET_TYPE_LABEL[t]}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px]" aria-label="Status"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {ASSET_STATUSES.map((s) => <SelectItem key={s} value={s}>{ASSET_STATUS_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-auto rounded-lg border border-border">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={Server} title="No assets match" description="Adjust the filters to see more configuration items." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[92px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Owner</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => {
                const owner = requesterById(a.ownerId)
                return (
                  <TableRow key={a.id} className="cursor-pointer" onClick={() => setSelected(a)}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{ASSET_TYPE_LABEL[a.type]}</TableCell>
                    <TableCell>
                      <Badge className={cn("rounded-full border-transparent font-medium", ASSET_STATUS_TONE[a.status])}>
                        {ASSET_STATUS_LABEL[a.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{owner?.name ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{a.location}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <AssetSheet asset={selected} onClose={() => setSelected(null)} />
    </PageContainer>
  )
}

function AssetSheet({ asset, onClose }: { asset: Asset | null; onClose: () => void }) {
  const tickets = useStore((s) => s.tickets)
  const linked = asset ? tickets.filter((t) => t.assetId === asset.id) : []
  const owner = requesterById(asset?.ownerId)

  return (
    <Sheet open={!!asset} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        {asset ? (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {asset.name}
              </SheetTitle>
              <SheetDescription className="font-mono">{asset.id} · {ASSET_TYPE_LABEL[asset.type]}</SheetDescription>
            </SheetHeader>

            <div className="space-y-4 px-4 pb-6">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <Spec label="Status" value={ASSET_STATUS_LABEL[asset.status]} />
                <Spec label="Owner" value={owner?.name ?? "Unassigned"} />
                <Spec label="Location" value={asset.location} />
                <Spec label="Serial" value={asset.serialNo} mono />
                <Spec label="Purchased" value={format(new Date(asset.purchasedAt), "d MMM yyyy")} />
                <Spec label="Warranty ends" value={format(new Date(asset.warrantyEndsAt), "d MMM yyyy")} />
              </dl>
              {asset.notes ? <p className="text-sm text-muted-foreground text-pretty">{asset.notes}</p> : null}

              <Separator />

              <div>
                <h3 className="mb-2 text-sm font-semibold">Linked tickets <span className="text-muted-foreground tabular-nums">{linked.length}</span></h3>
                {linked.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
                    No tickets are linked to this asset.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {linked.map((t) => (
                      <li key={t.id}>
                        <Link
                          to={`/tickets/${t.id}`}
                          onClick={onClose}
                          className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted"
                        >
                          <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                          <span className="min-w-0 flex-1 truncate">{t.title}</span>
                          <LinkedTicketBadge ticket={t} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function LinkedTicketBadge({ ticket }: { ticket: Ticket }) {
  return isActiveStatus(ticket.status) ? (
    <PriorityBadge priority={ticket.priority} />
  ) : (
    <StatusBadge status={ticket.status} />
  )
}

function Spec({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5", mono && "font-mono text-xs")}>{value}</dd>
    </div>
  )
}
