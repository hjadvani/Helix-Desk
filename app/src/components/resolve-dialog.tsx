import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { useUiStore } from "@/lib/ui-store"
import { MIN_DESCRIPTION_LEN } from "@/lib/constants"
import type { Ticket } from "@/lib/types"
import { toast } from "sonner"

const NO_ARTICLE = "none"

export function ResolveDialog({
  ticket,
  open,
  onOpenChange,
}: {
  ticket: Ticket
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const resolveTicket = useStore((s) => s.resolveTicket)
  const articles = useStore((s) => s.articles)
  const currentAgentId = useUiStore((s) => s.currentAgentId)
  const [note, setNote] = React.useState("")
  const [articleId, setArticleId] = React.useState<string>(NO_ARTICLE)
  const [touched, setTouched] = React.useState(false)

  const tooShort = note.trim().length < MIN_DESCRIPTION_LEN

  function handleResolve() {
    if (tooShort) {
      setTouched(true)
      return
    }
    resolveTicket(ticket.id, note.trim(), articleId === NO_ARTICLE ? null : articleId, currentAgentId)
    toast.success(`${ticket.id} resolved`)
    onOpenChange(false)
    setNote("")
    setArticleId(NO_ARTICLE)
    setTouched(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve {ticket.id}</DialogTitle>
          <DialogDescription>
            Add a resolution note so the requester and future agents understand how this was fixed. The SLA timer will stop.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="resolution-note">Resolution note</Label>
            <Textarea
              id="resolution-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => setTouched(true)}
              rows={4}
              placeholder="Describe the fix applied…"
              aria-invalid={touched && tooShort}
            />
            {touched && tooShort ? (
              <p className="text-xs text-destructive">Please write at least {MIN_DESCRIPTION_LEN} characters.</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label>Link a knowledge base article (optional)</Label>
            <Select value={articleId} onValueChange={setArticleId}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_ARTICLE}>No article</SelectItem>
                {articles.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleResolve}>Resolve ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
