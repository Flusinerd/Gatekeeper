import { getFlagsOptions } from '@/api/flags'
import { AppSidebarLayout } from '@/components/app-sidebar'
import { DataTable } from '@/components/flags/flags-data-table'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import type { ColumnDef } from '@tanstack/react-table'
import {
  List,
  Percent,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import type { FeatureFlagsRecord } from 'pocketbase-types'

export const columns: ColumnDef<FeatureFlagsRecord>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ cell }) => {
      const data = cell.getValue() as FeatureFlagsRecord['type']
      return (
        <>
          {data === 'boolean' ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleLeft className="text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">Boolean</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : data === 'multivariate' ? (
            <List />
          ) : data === 'percentage' ? (
            <Percent />
          ) : (
            ''
          )}
        </>
      )
    },
  },
  {
    accessorKey: 'is_enabled_anywhere',
    header: 'Enabled',
    size: 50,
    cell: ({ cell }) => {
      const data = cell.getValue() as FeatureFlagsRecord['is_enabled_anywhere']
      return (
        <>
          {data ? (
            <Power className="text-success" />
          ) : (
            <PowerOff className="text-destructive" />
          )}
        </>
      )
    },
  },
]

export const Route = createFileRoute('/flags/')({
  component: () => (
    <ProtectedRoute>
      <AppSidebarLayout>
        <FlagsListComponent></FlagsListComponent>
      </AppSidebarLayout>
    </ProtectedRoute>
  ),
  loader: ({ context }) => {
    const { queryClient } = context
    queryClient.ensureQueryData(getFlagsOptions(1, 10))
  },
})

function FlagsListComponent() {
  const { data } = useQuery(getFlagsOptions(1, 10))
  console.log(data)

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Feature Flags</h1>
      <p className="text-sm text-muted-foreground mb-4 mt-2">
        List of all feature flags in the system and their status.
      </p>
      <DataTable columns={columns} data={data?.items ?? []}></DataTable>
    </div>
  )
}
