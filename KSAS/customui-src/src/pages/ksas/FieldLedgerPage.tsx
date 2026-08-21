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
      className="flex w-full cursor-pointer items-center gap-[20px] rounded-[16px] border border-[#333338] bg-[#292a2b] py-[25px] pr-[24px] pl-[26px] text-left"
    >
      <span
        className="size-[22px] shrink-0 rounded-[5px]"
        style={{ backgroundColor: field.color }}
      />
      <span className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <span className="truncate text-[36px] font-bold text-[#f2f5f7]">
          {field.name}
        </span>
        <span className="flex gap-[16px] text-[28px] whitespace-nowrap text-[#9ea8b2]">
          <span>{field.block}</span>
          <span className="truncate">
            {field.number} · {field.address}
          </span>
        </span>
        <span className="text-[28px] text-[#9ea8b2]">{field.areaAres}a</span>
      </span>
      <ChevronIcon className="size-[53px] shrink-0 text-[#e3e3e3]" />
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

      <div className="flex min-h-0 flex-1 flex-col px-[48px] pt-[40px] pb-[40px]">
        <div className="flex h-[76px] shrink-0 items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <DropdownButton value="Field Color" width={300} />
            <DropdownButton value="Field Block" width={300} />
            <DropdownButton value={fieldLedgerSortOptions[0]} width={300} />
          </div>
          <div className="flex items-center gap-[30px]">
            <ListSummary count={visibleFields.length} totalAres={totalAres} />
            <ToolbarButton>+Add Field</ToolbarButton>
          </div>
        </div>

        <div className="mt-[32px] flex h-[66px] shrink-0 items-center gap-[16px]">
          {fieldBlocks.map((name) => (
            <FilterChip
              key={name}
              label={name}
              active={name === block}
              onClick={() => setBlock(name)}
            />
          ))}
        </div>

        <div className="mt-[32px] flex min-h-0 flex-1 gap-[32px]">
          <div className="ksas-scroll min-h-0 w-[902px] shrink-0 overflow-y-auto">
            {visibleFields.length === 0 ? (
              <p className="pt-[40px] text-[34px] text-[#9ea8b2]">
                No fields in this block.
              </p>
            ) : (
              <ul className="flex flex-col gap-[14px]">
                {visibleFields.map((field) => (
                  <li key={field.id}>
                    <LedgerRow field={field} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative min-w-0 flex-1 overflow-hidden rounded-[20px]">
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
