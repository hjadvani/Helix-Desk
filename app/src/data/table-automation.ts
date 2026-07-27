import { useExecuteWorkflowNode } from '@unifyapps/app-builder-sdk/hooks/workflow'

const AUTOMATION_ID = '66ed1b016d04095e3efd9dca'
const DATA_SOURCE_ID = 'e_6a66fc926b52da48e5ac428b'
const RESOURCE_VERSION = 5589
const PAGE_SIZE = '200'
const OFFSET = '0'

const INTERNALS = {
  m: 'BUILDER',
  s: 'global-page-of-code-builder',
  c: 'PLATFORM',
  p: 'browser',
} as const

export type TableRow = {
  id: string
  values: Record<string, unknown>
}

function toDisplayValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// The automation's payload can be nested a few ways depending on how it returns.
// Walk the common envelopes to find the array of record objects.
function findObjectsArray(root: unknown): Record<string, unknown>[] {
  const seen = new Set<unknown>()
  const queue: unknown[] = [root]
  while (queue.length > 0) {
    const node = queue.shift()
    if (!node || seen.has(node)) continue
    seen.add(node)
    if (!isRecord(node)) continue

    const objects = node.objects
    if (Array.isArray(objects) && objects.every(isRecord)) {
      return objects as Record<string, unknown>[]
    }
    for (const value of Object.values(node)) {
      if (isRecord(value) || Array.isArray(value)) queue.push(value)
    }
  }
  return []
}

function findTotal(root: unknown): number | undefined {
  const queue: unknown[] = [root]
  const seen = new Set<unknown>()
  while (queue.length > 0) {
    const node = queue.shift()
    if (!node || seen.has(node) || !isRecord(node)) continue
    seen.add(node)
    if (typeof node.total === 'number') return node.total
    for (const value of Object.values(node)) {
      if (isRecord(value)) queue.push(value)
    }
  }
  return undefined
}

// A record may carry its fields under `.properties` or directly at the top level.
function extractFields(obj: Record<string, unknown>): Record<string, unknown> {
  if (isRecord(obj.properties)) return obj.properties
  return obj
}

export function useAutomationTable(search: string) {
  const { data, isLoading, error, refetch } = useExecuteWorkflowNode({
    context: {
      appName: 'callables',
      resourceName: 'callables_call_automation',
      resourceVersion: RESOURCE_VERSION,
    },
    id: DATA_SOURCE_ID,
    inputs: {
      automationId: AUTOMATION_ID,
      version: '-1',
      runtimeConnections: {},
      parameters: {
        __internals__: INTERNALS,
        searchQuery: search,
        pageSize: PAGE_SIZE,
        offset: OFFSET,
      },
      synchronous: true,
    },
    options: {},
  })

  const objects = findObjectsArray(data)

  const rows: TableRow[] = objects.map((obj, index) => {
    const fields = extractFields(obj)
    return {
      id: toDisplayValue(fields.id ?? obj.id) || String(index),
      values: fields,
    }
  })

  const columns = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row.values).forEach((key) => set.add(key))
      return set
    }, new Set<string>()),
  )

  return {
    rows,
    columns,
    total: findTotal(data) ?? rows.length,
    isLoading,
    error,
    refetch,
    rawResponse: data,
    formatCell: toDisplayValue,
  }
}
