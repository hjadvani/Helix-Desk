import * as React from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PageContainer } from "@/components/page"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore, categories, requesters } from "@/lib/store"
import { useUiStore } from "@/lib/ui-store"
import { catalogItemById, categoryById } from "@/lib/lookups"
import { MIN_DESCRIPTION_LEN, PRIORITY_ORDER, PRIORITY_LABEL } from "@/lib/constants"
import type { Priority, TicketType } from "@/lib/types"
import { toast } from "sonner"

export default function NewTicket() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const createTicket = useStore((s) => s.createTicket)
  const assets = useStore((s) => s.assets)
  const currentAgentId = useUiStore((s) => s.currentAgentId)

  const catalogItem = catalogItemById(params.get("catalog"))

  const [type, setType] = React.useState<TicketType>(catalogItem?.type ?? "incident")
  const [title, setTitle] = React.useState(catalogItem ? catalogItem.name : "")
  const [description, setDescription] = React.useState("")
  const [requesterId, setRequesterId] = React.useState("")
  const [categoryId, setCategoryId] = React.useState(catalogItem?.categoryId ?? "")
  const [priority, setPriority] = React.useState<Priority>(catalogItem?.defaultPriority ?? "medium")
  const [assetId, setAssetId] = React.useState<string>("none")
  const [submitted, setSubmitted] = React.useState(false)

  const errors = {
    title: title.trim().length === 0,
    requester: requesterId.length === 0,
    category: categoryId.length === 0,
    description: description.trim().length < MIN_DESCRIPTION_LEN,
  }
  const hasErrors = Object.values(errors).some(Boolean)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (hasErrors) return
    const ticket = createTicket(
      {
        type,
        title: title.trim(),
        description: description.trim(),
        requesterId,
        categoryId,
        priority,
        assetId: assetId === "none" ? null : assetId,
        catalogItemId: catalogItem?.id ?? null,
      },
      currentAgentId,
    )
    toast.success(`${ticket.id} created`)
    navigate(`/tickets/${ticket.id}`)
  }

  function onCategoryChange(id: string) {
    setCategoryId(id)
    const cat = categoryById(id)
    if (cat) setPriority(cat.defaultPriority)
  }

  return (
    <PageContainer className="max-w-2xl">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to="/catalog">
            <ArrowLeft className="size-4" />
            Catalog
          </Link>
        </Button>
      </div>
      <h1 className="font-heading text-2xl font-semibold tracking-tight">New ticket</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {catalogItem ? `Starting from: ${catalogItem.name}` : "Log an incident or service request."}
      </p>

      <Card className="p-6">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <ToggleGroup type="single" value={type} onValueChange={(v) => v && setType(v as TicketType)} className="w-full max-w-xs">
              <ToggleGroupItem value="incident">Incident</ToggleGroupItem>
              <ToggleGroupItem value="request">Request</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Field label="Title" error={submitted && errors.title ? "A title is required." : undefined}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary of the issue or request"
              aria-invalid={submitted && errors.title}
            />
          </Field>

          <Field
            label="Description"
            error={submitted && errors.description ? `Please provide at least ${MIN_DESCRIPTION_LEN} characters.` : undefined}
          >
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the problem, steps taken, and any error messages…"
              aria-invalid={submitted && errors.description}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Requester" error={submitted && errors.requester ? "Select a requester." : undefined}>
              <Select value={requesterId} onValueChange={setRequesterId}>
                <SelectTrigger className="w-full" aria-invalid={submitted && errors.requester}>
                  <SelectValue placeholder="Select requester" />
                </SelectTrigger>
                <SelectContent>
                  {requesters.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name} · {r.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Category" error={submitted && errors.category ? "Select a category." : undefined}>
              <Select value={categoryId} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full" aria-invalid={submitted && errors.category}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Priority">
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITY_ORDER.map((p) => (
                    <SelectItem key={p} value={p}>{PRIORITY_LABEL[p]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Linked asset (optional)">
              <Select value={assetId} onValueChange={setAssetId}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {assets.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name} · {a.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit">Create ticket</Button>
          </div>
        </form>
      </Card>
    </PageContainer>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
