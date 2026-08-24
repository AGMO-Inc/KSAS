import { createFileRoute, redirect } from '@tanstack/react-router'

/**
 * The device boots straight into KSAS. The template's demo shell (HomePage,
 * Library, Map, Bridge, External API) stays reachable by URL for debugging,
 * but an operator never lands on it.
 */
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/ksas', replace: true })
  },
})
