import { createFileRoute } from '@tanstack/react-router'
import { FieldSearchPage } from '@/pages/ksas/FieldSearchPage'

export const Route = createFileRoute('/ksas/search')({
  component: FieldSearchPage,
})
