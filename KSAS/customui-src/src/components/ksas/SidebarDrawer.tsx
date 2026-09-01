import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  AccountCircleIcon,
  AddIcon,
  ChevronIcon,
  DescriptionIcon,
  FieldLedgerIcon,
  FieldMapIcon,
  FolderIcon,
  LogoutIcon,
  PieChartIcon,
} from './icons'

type NavRoute =
  | '/ksas'
  | '/ksas/planting-plan'
  | '/ksas/work-progress'
  | '/ksas/logs'
  | '/ksas/field-ledger'

type NavEntry = {
  label: string
  Icon: (props: { className?: string }) => React.JSX.Element
  /** Omitted for entries whose screen is not designed yet. */
  to?: NavRoute
}

const primaryNav: NavEntry[] = [
  { label: 'Field Map', Icon: FieldMapIcon, to: '/ksas' },
  { label: 'Planting Plan', Icon: FolderIcon, to: '/ksas/planting-plan' },
  { label: 'Work Progress', Icon: PieChartIcon, to: '/ksas/work-progress' },
  { label: 'Logs', Icon: DescriptionIcon, to: '/ksas/logs' },
  { label: 'Field Ledger', Icon: FieldLedgerIcon, to: '/ksas/field-ledger' },
]

const secondaryNav: NavEntry[] = [
  { label: 'KSAS Market Place', Icon: AddIcon },
  { label: 'Taro Kubota', Icon: AccountCircleIcon },
  { label: 'Log Out', Icon: LogoutIcon },
]

function NavRow({ label, Icon, active }: NavEntry & { active: boolean }) {
  return (
    <span className="flex items-center gap-[1rem]">
      <Icon
        className={`size-[3.75rem] shrink-0 ${active ? 'text-[#04ff60]' : 'text-[#939da9]'}`}
      />
      <span
        className={`text-[2.5rem] font-medium whitespace-nowrap ${active ? 'text-[#04ff60]' : 'text-[#c8ced5]'}`}
      >
        {label}
      </span>
    </span>
  )
}

function NavItem({ entry, pathname }: { entry: NavEntry; pathname: string }) {
  const active = entry.to !== undefined && entry.to === pathname

  if (!entry.to) {
    return (
      <button type="button" className="cursor-pointer text-left">
        <NavRow {...entry} active={false} />
      </button>
    )
  }

  return (
    <Link to={entry.to}>
      <NavRow {...entry} active={active} />
    </Link>
  )
}

type SidebarDrawerProps = {
  open: boolean
  onClose: () => void
}

/**
 * How long the drawer takes to slide in or out.
 *
 * Held here rather than in a utility class because the closing drawer has to
 * stay mounted for exactly as long as it is still moving, and a duration split
 * across a class and a timer drifts apart the moment one of them is edited.
 */
const SLIDE_MS = 280

export function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  const { location } = useRouterState()

  // `mounted` outlives `open` by one slide so the exit has something to animate.
  const [mounted, setMounted] = useState(open)
  // Drives the transition itself, a frame behind `mounted` on the way in.
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      // Paint once off-screen first; a node that mounts already open has no
      // start position to travel from and would appear in place.
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }

    setShown(false)
    const timer = setTimeout(() => setMounted(false), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-10 leading-[normal]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-black/40 transition-opacity ease-out motion-reduce:transition-none ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDuration: `${SLIDE_MS}ms` }}
      />

      <nav
        className={`absolute inset-y-0 left-0 flex w-[37.875rem] flex-col justify-between overflow-hidden border-r border-[#495156] bg-[#202223] px-[2.3125rem] py-[2.5rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform ease-out motion-reduce:transition-none ${
          shown ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ transitionDuration: `${SLIDE_MS}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="relative h-[3.0625rem] w-[11.875rem] overflow-hidden">
            <img
              src="./assets/logo/ksas-logo-nega.png"
              alt="KSAS"
              className="absolute top-[-19.83%] left-[-4.35%] h-[168.78%] w-[108.7%] max-w-none"
            />
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="cursor-pointer"
          >
            <ChevronIcon
              direction="left"
              className="size-[2.5rem] text-[#e3e3e3]"
            />
          </button>
        </div>

        {primaryNav.map((entry) => (
          <NavItem
            key={entry.label}
            entry={entry}
            pathname={location.pathname}
          />
        ))}

        <div className="h-px w-full bg-[#939393]" />

        {secondaryNav.map((entry) => (
          <NavItem
            key={entry.label}
            entry={entry}
            pathname={location.pathname}
          />
        ))}
      </nav>
    </div>
  )
}
