import { useNavigate, useParams, Link } from "react-router-dom"
import { format } from "date-fns"
import { ArrowLeft, BookOpen, Eye, ThumbsUp } from "lucide-react"
import { PageContainer, EmptyState } from "@/components/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { agentById } from "@/lib/lookups"
import { KB_CATEGORY_LABEL } from "@/lib/constants"

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const article = useStore((s) => s.articles.find((a) => a.id === id))
  const relatedTickets = useStore((s) =>
    s.tickets.filter((t) => t.resolution?.kbArticleId === id),
  )

  if (!article) {
    return (
      <PageContainer>
        <EmptyState
          icon={BookOpen}
          title="Article not found"
          description="This article may have been removed."
          action={<Button onClick={() => navigate("/knowledge")}>Back to knowledge base</Button>}
        />
      </PageContainer>
    )
  }

  const author = agentById(article.authorId)

  return (
    <PageContainer className="max-w-3xl">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
          <Link to="/knowledge">
            <ArrowLeft className="size-4" />
            Knowledge base
          </Link>
        </Button>
      </div>

      <Badge variant="outline" className="mb-3 rounded-full text-xs text-muted-foreground">
        {KB_CATEGORY_LABEL[article.category]}
      </Badge>
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">{article.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{author?.name}</span>
        <span>Updated {format(new Date(article.updatedAt), "d MMM yyyy")}</span>
        <span className="flex items-center gap-1"><Eye className="size-3.5" />{article.views} views</span>
        <span className="flex items-center gap-1"><ThumbsUp className="size-3.5" />{article.helpful} helpful</span>
      </div>

      <Separator className="my-6" />

      <div className="max-w-[68ch] space-y-4 text-[0.95rem] leading-relaxed text-foreground/90">
        {article.body.split("\n\n").map((para, i) => (
          <p key={i} className="text-pretty">{para}</p>
        ))}
      </div>

      {article.tags.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {article.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full font-normal">#{t}</Badge>
          ))}
        </div>
      ) : null}

      {relatedTickets.length > 0 ? (
        <div className="mt-10">
          <h2 className="mb-2 text-sm font-semibold">Resolved tickets referencing this article</h2>
          <ul className="space-y-1">
            {relatedTickets.map((t) => (
              <li key={t.id}>
                <Link to={`/tickets/${t.id}`} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="truncate">{t.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </PageContainer>
  )
}
