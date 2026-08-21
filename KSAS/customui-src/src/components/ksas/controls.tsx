import type { ReactNode } from 'react'
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
    <header className="flex h-[120px] shrink-0 items-center gap-[40px] bg-[#101012] px-[48px]">
      <button
        type="button"
        aria-label="Go back"
        onClick={onBack}
        className="shrink-0 cursor-pointer"
      >
        <ChevronIcon direction="left" className="size-[60px] text-[#e3e3e3]" />
      </button>
      <h1 className="text-[52px] font-semibold tracking-[-1.04px] text-white">
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
      style={width ? { width } : undefined}
      className={`flex h-[76px] cursor-pointer items-center gap-[12px] rounded-[20px] border border-[#848b90] px-[30px] ${
        width ? 'justify-between' : ''
      }`}
    >
      <span className="text-[30px] font-medium whitespace-nowrap text-[#dae1e9]">
        {value}
      </span>
      <ChevronIcon direction="down" className="size-[27px] text-[#e3e3e3]" />
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
      className={`cursor-pointer rounded-full px-[24px] py-[15px] text-[30px] font-medium whitespace-nowrap ${
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
      className={`flex h-[76px] cursor-pointer items-center gap-[8px] rounded-[14px] py-[16px] pr-[28px] pl-[26px] text-[30px] font-semibold whitespace-nowrap ${
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
    <p className="flex items-center gap-[20px] text-[26px] font-medium whitespace-nowrap text-[#9ea8b2]">
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
      className={`relative h-[30px] w-[54px] shrink-0 cursor-pointer rounded-full ${
        checked ? 'bg-[#2ce06b]' : 'bg-[#4d4d52]'
      }`}
    >
      <span
        className={`absolute top-[3px] size-[24px] rounded-full bg-[#f2f5f7] transition-[left] ${
          checked ? 'left-[27px]' : 'left-[3px]'
        }`}
      />
    </button>
  )
}
