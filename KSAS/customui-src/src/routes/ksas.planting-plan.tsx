import { createFileRoute } from '@tanstack/react-router'
import { PlantingPlanPage } from '@/pages/ksas/PlantingPlanPage'

export const Route = createFileRoute('/ksas/planting-plan')({
  component: PlantingPlanPage,
})
