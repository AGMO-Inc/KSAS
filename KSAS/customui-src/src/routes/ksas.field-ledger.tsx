import { createFileRoute } from '@tanstack/react-router'
import { FieldLedgerPage } from '@/pages/ksas/FieldLedgerPage'

export const Route = createFileRoute('/ksas/field-ledger')({
  component: FieldLedgerPage,
})
