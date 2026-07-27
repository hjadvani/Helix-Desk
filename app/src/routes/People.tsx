import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Person = {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'Active' | 'Invited' | 'Inactive'
}

const PEOPLE_SEED: Person[] = [
  { id: 'u1', name: 'Amara Okafor', email: 'amara@acme.co', role: 'Engineering Manager', department: 'Engineering', status: 'Active' },
  { id: 'u2', name: 'Liam Chen', email: 'liam@acme.co', role: 'Frontend Engineer', department: 'Engineering', status: 'Active' },
  { id: 'u3', name: 'Sofia Rossi', email: 'sofia@acme.co', role: 'Product Designer', department: 'Design', status: 'Active' },
  { id: 'u4', name: 'Noah Patel', email: 'noah@acme.co', role: 'Data Analyst', department: 'Analytics', status: 'Invited' },
  { id: 'u5', name: 'Emma Johansson', email: 'emma@acme.co', role: 'Account Executive', department: 'Sales', status: 'Active' },
  { id: 'u6', name: 'Kofi Mensah', email: 'kofi@acme.co', role: 'Support Lead', department: 'Support', status: 'Inactive' },
  { id: 'u7', name: 'Yuki Tanaka', email: 'yuki@acme.co', role: 'Backend Engineer', department: 'Engineering', status: 'Active' },
  { id: 'u8', name: 'Isabella Cruz', email: 'isabella@acme.co', role: 'Marketing Manager', department: 'Marketing', status: 'Active' },
  { id: 'u9', name: 'Omar Haddad', email: 'omar@acme.co', role: 'Recruiter', department: 'People', status: 'Invited' },
  { id: 'u10', name: 'Grace Kim', email: 'grace@acme.co', role: 'Finance Analyst', department: 'Finance', status: 'Active' },
]

const STATUS_STYLES: Record<Person['status'], string> = {
  Active: 'bg-primary/10 text-primary',
  Invited: 'bg-accent text-accent-foreground',
  Inactive: 'bg-muted text-muted-foreground',
}

export default function People() {
  const { data: people, loading, error } = useData<Person[]>('people', 'seed', PEOPLE_SEED)
  const hasError = Boolean(error)
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const list = people ?? []
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q),
    )
  }, [people, query])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          People
        </h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          Everyone in your workspace, their role and current status.
        </p>
      </header>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people…"
          aria-label="Search people"
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={4}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!loading && hasError && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-destructive">
                  Something went wrong loading people. Please try again.
                </TableCell>
              </TableRow>
            )}

            {!loading && !hasError && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-sm text-muted-foreground">
                  {query ? `No people match “${query}”.` : 'No people yet.'}
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !hasError &&
              rows.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.role}</TableCell>
                  <TableCell className="text-muted-foreground">{p.department}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={STATUS_STYLES[p.status]} variant="secondary">
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
