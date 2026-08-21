import { createFileRoute } from '@tanstack/react-router'
import { WorkProgressPage } from '@/pages/ksas/WorkProgressPage'

export const Route = createFileRoute('/ksas/work-progress')({
  component: WorkProgressPage,
})
