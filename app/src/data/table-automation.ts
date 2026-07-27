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

type AutomationObject = { properties?: Record<string, unknown> }
type AutomationBody = { objects?: AutomationObject[]; total?: number }

function toDisplayValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
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

  const body = (data?.response as { body?: AutomationBody } | undefined)?.body
  const objects = body?.objects ?? []

  const rows: TableRow[] = objects.map((obj, index) => {
    const props = obj.properties ?? {}
    return {
      id: toDisplayValue(props.id) || String(index),
      values: props,
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
    total: body?.total ?? rows.length,
    isLoading,
    error,
    refetch,
    formatCell: toDisplayValue,
  }
}
