import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { FarmMap } from '@/components/ksas/FarmMap'
import {
  DropdownButton,
  FilterChip,
  ListSummary,
  ScreenHeader,
  ToolbarButton,
} from '@/components/ksas/controls'
import { ChevronIcon } from '@/components/ksas/icons'
import { farms } from '@/data/farms'
import {
  fieldBlocks,
  fieldLedgerSortOptions,
  ledgerFields,
  type FieldBlock,
  type LedgerField,
} from '@/data/fieldLedger'

// Module scope so FarmMap's effects see a stable dependency.
const PANEL_FIT_PADDING = { top: 50, right: 50, bottom: 50, left: 50 }

function LedgerRow({ field }: { field: LedgerField }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-[1.25rem] rounded-[1rem] border border-[#333338] bg-[#292a2b] py-[1.5625rem] pr-[1.5rem] pl-[1.625rem] text-left"
    >
      <span
        className="size-[1.375rem] shrink-0 rounded-[0.3125rem]"
        style={{ backgroundColor: field.color }}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-[0.5rem]">
        <span className="truncate text-[2.25rem] font-bold text-[#f2f5f7]">
          {field.name}
        </span>
        <span className="flex gap-[1rem] text-[1.75rem] whitespace-nowrap text-[#9ea8b2]">
          <span>{field.block}</span>
          <span className="truncate">
            {field.number} · {field.address}
          </span>
        </span>
        <span className="text-[1.75rem] text-[#9ea8b2]">{field.areaAres}a</span>
      </span>
      <ChevronIcon className="size-[3.3125rem] shrink-0 text-[#e3e3e3]" />
    </button>
  )
}

export function FieldLedgerPage() {
  const navigate = useNavigate()
  const [block, setBlock] = useState<FieldBlock>('All')

  const visibleFields =
    block === 'All'
      ? ledgerFields
      : ledgerFields.filter((field) => field.block === block)
  const totalAres = visibleFields.reduce(
    (sum, field) => sum + field.areaAres,
    0,
  )

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <ScreenHeader
        title="Field Ledger"
        onBack={() => void navigate({ to: '/ksas', search: {} })}
      />

      <div className="flex min-h-0 flex-1 flex-col px-[3rem] pt-[2.5rem] pb-[2.5rem]">
        {/* Wraps to a second row rather than clipping: the design assumes a
            1697 px cockpit and narrower ones must still reach every action. */}
        <div className="flex min-h-[4.75rem] shrink-0 flex-wrap items-center justify-between gap-x-[1.5rem] gap-y-[1rem]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[1rem]">
            <DropdownButton value="Field Color" width={300} />
            <DropdownButton value="Field Block" width={300} />
            <DropdownButton value={fieldLedgerSortOptions[0]} width={300} />
          </div>
          <div className="flex h-[4.75rem] shrink-0 items-center self-start gap-[1.875rem]">
            <ListSummary count={visibleFields.length} totalAres={totalAres} />
            <ToolbarButton>+Add Field</ToolbarButton>
          </div>
        </div>

        <div className="mt-[2rem] flex h-[4.125rem] shrink-0 items-center gap-[1rem]">
          {fieldBlocks.map((name) => (
            <FilterChip
              key={name}
              label={name}
              active={name === block}
              onClick={() => setBlock(name)}
            />
          ))}
        </div>

        <div className="mt-[2rem] flex min-h-0 flex-1 gap-[2rem]">
          <div className="ksas-scroll min-h-0 w-[56.375rem] shrink-0 overflow-y-auto">
            {visibleFields.length === 0 ? (
              <p className="pt-[2.5rem] text-[2.125rem] text-[#9ea8b2]">
                No fields in this block.
              </p>
            ) : (
              <ul className="flex flex-col gap-[0.875rem]">
                {visibleFields.map((field) => (
                  <li key={field.id}>
                    <LedgerRow field={field} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[1.25rem]">
            <FarmMap
              farms={farms}
              fitToken={0}
              fitPadding={PANEL_FIT_PADDING}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
