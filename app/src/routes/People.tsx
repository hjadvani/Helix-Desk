import { useEffect, useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import { useAutomationTable } from '@/data/table-automation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SEARCH_DEBOUNCE_MS = 350
const SKELETON_ROWS = 6

function humanizeColumn(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function People() {
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { rows, columns, total, isLoading, error, refetch, formatCell } =
    useAutomationTable(search)

  const columnCount = Math.max(columns.length, 1)

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            People
          </h1>
          <p className="max-w-prose text-sm text-muted-foreground">
            Live data from the connected automation.
            {!isLoading && !error ? ` ${total} record${total === 1 ? '' : 's'}.` : ''}
          </p>
        </div>
        <Button variant="secondary" onClick={() => refetch()} disabled={isLoading}>
          <RefreshCw className={cn('size-4', isLoading && 'animate-spin')} />
          Refresh
        </Button>
      </header>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search…"
          aria-label="Search records"
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.length > 0 ? (
                columns.map((col) => <TableHead key={col}>{humanizeColumn(col)}</TableHead>)
              ) : (
                <TableHead>Data</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={columnCount}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && error && (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="py-10 text-center text-sm text-destructive"
                >
                  Couldn’t reach the automation. Try refreshing.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  {search ? `No records match “${search}”.` : 'The automation returned no records.'}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !error &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col} className="text-muted-foreground">
                      {formatCell(row.values[col])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
