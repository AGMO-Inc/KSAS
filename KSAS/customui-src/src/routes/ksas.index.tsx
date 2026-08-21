import { createFileRoute } from '@tanstack/react-router'
import { FieldMapPage } from '@/pages/ksas/FieldMapPage'

type FieldMapSearch = {
  /** Id of the selected field, so the search screen can hand one over. */
  field?: string
}

export const Route = createFileRoute('/ksas/')({
  validateSearch: (search: Record<string, unknown>): FieldMapSearch => ({
    field: typeof search.field === 'string' ? search.field : undefined,
  }),
  component: FieldMapPage,
})
