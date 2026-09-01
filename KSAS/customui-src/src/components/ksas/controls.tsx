import type { ReactNode } from 'react'
import { designPx } from '@/lib/scale'
import { ChevronIcon } from './icons'

/** Back chevron + title bar shared by every screen below the field map. */
export function ScreenHeader({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) {
  return (
    <header className="flex h-[7.5rem] shrink-0 items-center gap-[2.5rem] bg-[#101012] px-[3rem]">
      <button
        type="button"
        aria-label="Go back"
        onClick={onBack}
        className="shrink-0 cursor-pointer"
      >
        <ChevronIcon
          direction="left"
          className="size-[3.75rem] text-[#e3e3e3]"
        />
      </button>
      <h1 className="text-[3.25rem] font-semibold tracking-[-0.065rem] text-white">
        {title}
      </h1>
    </header>
  )
}

/**
 * Outlined select-style button. The design gives no menu for any of these, so it
 * renders the current value and nothing opens.
 */
export function DropdownButton({
  value,
  width,
}: {
  value: string
  width?: number
}) {
  return (
    <button
      type="button"
      // `width` is the design width, not a floor: the toolbar has to survive a
      // cockpit narrower than the 1697 px the design assumes, and the dropdowns
      // are what should give way first. The floor keeps the label readable —
      // shrinking past it turns "Field Color" and "Field Block" into the same
      // "Field ...", which is worse than letting the toolbar wrap.
      style={
        width
          ? { flexBasis: designPx(width), minWidth: designPx(260) }
          : undefined
      }
      className={`flex h-[4.75rem] shrink cursor-pointer items-center gap-[0.75rem] rounded-[1.25rem] border border-[#848b90] px-[1.875rem] ${
        width ? 'justify-between' : ''
      }`}
    >
      <span className="truncate text-[1.875rem] font-medium text-[#dae1e9]">
        {value}
      </span>
      <ChevronIcon
        direction="down"
        className="size-[1.6875rem] shrink-0 text-[#e3e3e3]"
      />
    </button>
  )
}

/** Pill filter, used for crop categories and field blocks. */
export function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`cursor-pointer rounded-full px-[1.5rem] py-[0.9375rem] text-[1.875rem] font-medium whitespace-nowrap ${
        active
          ? 'bg-[#2ce06b]/20 text-[#2ce06b]'
          : 'border border-[#848b90] bg-[#212223] text-[#bfbfbf]'
      }`}
    >
      {label}
    </button>
  )
}

/** Toolbar action button — green for the primary action, grey otherwise. */
export function ToolbarButton({
  children,
  variant = 'primary',
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'neutral'
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[4.75rem] cursor-pointer items-center gap-[0.5rem] rounded-[0.875rem] py-[1rem] pr-[1.75rem] pl-[1.625rem] text-[1.875rem] font-semibold whitespace-nowrap ${
        variant === 'primary'
          ? 'bg-[#2ce06b] text-[#0d170f]'
          : 'bg-[#495156] text-[#dae1e9]'
      }`}
    >
      {children}
    </button>
  )
}

/** `N items · Total N a` summary shown at the right of a list toolbar. */
export function ListSummary({
  count,
  totalAres,
}: {
  count: number
  totalAres: number
}) {
  return (
    <p className="flex items-center gap-[1.25rem] text-[1.625rem] font-medium whitespace-nowrap text-[#9ea8b2]">
      <span>
        {count} {count === 1 ? 'item' : 'items'}
      </span>
      <span>·</span>
      <span>Total {totalAres.toFixed(2)} a</span>
    </p>
  )
}

/** 54 x 30 switch. The design only specifies the off state; on turns it green. */
export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[1.875rem] w-[3.375rem] shrink-0 cursor-pointer rounded-full ${
        checked ? 'bg-[#2ce06b]' : 'bg-[#4d4d52]'
      }`}
    >
      <span
        className={`absolute top-[0.1875rem] size-[1.5rem] rounded-full bg-[#f2f5f7] transition-[left] ${
          checked ? 'left-[1.6875rem]' : 'left-[0.1875rem]'
        }`}
      />
    </button>
  )
}
