import { useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import { BackgroundControl } from '@/components/background-control'
import { useUiStore } from '@/lib/ui-store'
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

const SKELETON_ROWS = 6

function humanizeColumn(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export default function People() {
  const [search, setSearch] = useState('')

  const { rows, columns, total, isLoading, error, refetch, formatCell, rawResponse } =
    useAutomationTable()

  const query = search.trim().toLowerCase()
  const visibleRows = query
    ? rows.filter((row) =>
        columns.some((col) => formatCell(row.values[col]).toLowerCase().includes(query)),
      )
    : rows

  const columnCount = Math.max(columns.length, 1)
  const backgroundImage = useUiStore((s) => s.backgroundImage)

  return (
    <div className="relative min-h-full">
      {backgroundImage ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background/70" />
        </>
      ) : null}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                                Table data
                              </h1>
          <p className="max-w-prose text-sm text-muted-foreground">
            Live data from the connected automation.
            {!isLoading && !error
              ? ` ${query ? `${visibleRows.length} of ${total}` : total} record${total === 1 ? '' : 's'}.`
              : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BackgroundControl />
          <Button variant="secondary" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={cn('size-4', isLoading && 'animate-spin')} />
            Refresh
          </Button>
        </div>
      </header>
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

            {!isLoading && !error && visibleRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  {query ? `No records match “${search}”.` : 'The automation returned no records.'}
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !error &&
              visibleRows.map((row) => (
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
      {!isLoading && !error && rows.length === 0 && rawResponse !== undefined && (
        <details className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <summary className="cursor-pointer font-medium text-foreground">
            No rows parsed — inspect the raw automation response
          </summary>
          <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words text-xs text-muted-foreground">
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        </details>
      )}
      </div>
    </div>
  );
}
