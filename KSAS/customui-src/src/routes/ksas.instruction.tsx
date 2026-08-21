import { createFileRoute } from '@tanstack/react-router'
import { InstructionPage } from '@/pages/ksas/InstructionPage'

export const Route = createFileRoute('/ksas/instruction')({
  component: InstructionPage,
})
