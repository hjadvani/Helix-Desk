import * as React from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import { Search, BookOpen, Eye, ThumbsUp } from "lucide-react"
import { PageContainer, PageHeader, EmptyState } from "@/components/page"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { agentById } from "@/lib/lookups"
import { KB_CATEGORY_LABEL } from "@/lib/constants"
import type { KbArticle, KbCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

const ALL = "all"

export default function Knowledge() {
  const articles = useStore((s) => s.articles)
  const navigate = useNavigate()
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState<string>(ALL)
  const q = search.trim().toLowerCase()

  const filtered = articles
    .filter((a) => (category === ALL ? true : a.category === category))
    .filter(
      (a) =>
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    )

  const cats = Object.keys(KB_CATEGORY_LABEL) as KbCategory[]

  return (
    <PageContainer>
      <PageHeader title="Knowledge Base" description="Guides, troubleshooting, policies, and known errors for the service desk." />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles…" className="pl-8" aria-label="Search articles" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={category === ALL} onClick={() => setCategory(ALL)}>All</Chip>
          {cats.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {KB_CATEGORY_LABEL[c]}
            </Chip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No articles found"
          description="Try a broader search term or a different category filter."
        />
      ) : (
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(18rem,1fr))]">
          {filtered.map((a) => (
            <ArticleCard key={a.id} article={a} onOpen={() => navigate(`/knowledge/${a.id}`)} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function ArticleCard({ article, onOpen }: { article: KbArticle; onOpen: () => void }) {
  const author = agentById(article.authorId)
  return (
    <button type="button" onClick={onOpen} className="group text-left">
      <Card className="h-full gap-2 p-4 transition-colors group-hover:border-primary/40 group-hover:bg-accent/40">
        <Badge variant="outline" className="w-fit rounded-full text-xs text-muted-foreground">
          {KB_CATEGORY_LABEL[article.category]}
        </Badge>
        <p className="font-medium text-balance">{article.title}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground text-pretty">{article.body}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{author?.name}</span>
          <span className="flex items-center gap-1"><Eye className="size-3" />{article.views}</span>
          <span className="flex items-center gap-1"><ThumbsUp className="size-3" />{article.helpful}</span>
          <span className="ml-auto">{format(new Date(article.updatedAt), "d MMM")}</span>
        </div>
      </Card>
    </button>
  )
}
