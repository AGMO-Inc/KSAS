import { useEffect } from 'react'
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
    <span className="flex items-center gap-[16px]">
      <Icon
        className={`size-[60px] shrink-0 ${active ? 'text-[#04ff60]' : 'text-[#939da9]'}`}
      />
      <span
        className={`text-[40px] font-medium whitespace-nowrap ${active ? 'text-[#04ff60]' : 'text-[#c8ced5]'}`}
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

export function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  const { location } = useRouterState()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-10 leading-[normal]">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40"
      />

      <nav className="absolute inset-y-0 left-0 flex w-[606px] flex-col justify-between overflow-hidden border-r border-[#495156] bg-[#202223] px-[37px] py-[40px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between">
          <div className="relative h-[49px] w-[190px] overflow-hidden">
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
              className="size-[40px] text-[#e3e3e3]"
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
