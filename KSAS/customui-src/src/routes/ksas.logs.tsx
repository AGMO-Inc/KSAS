import { createFileRoute } from '@tanstack/react-router'
import { LogsPage } from '@/pages/ksas/LogsPage'

export const Route = createFileRoute('/ksas/logs')({
  component: LogsPage,
})
