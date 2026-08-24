import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownButton,
  ScreenHeader,
  ToggleSwitch,
  ToolbarButton,
} from '@/components/ksas/controls'
import { ChevronIcon, FilterIcon } from '@/components/ksas/icons'
import {
  logEntries,
  logSortOptions,
  logTabs,
  type LogEntry,
  type LogTab,
} from '@/data/logs'

function LogRow({ entry }: { entry: LogEntry }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-[30px] rounded-[20px] border border-[#333338] bg-[#292a2b] px-[40px] py-[26px] text-left"
    >
      <span className="flex min-w-0 flex-1 items-center gap-[30px]">
        <span
          className="size-[26px] shrink-0 rounded-[6px]"
          style={{ backgroundColor: entry.color }}
        />
        <span className="flex min-w-0 flex-col gap-[4px]">
          <span className="truncate text-[36px] font-bold text-[#f2f5f7]">
            {entry.field}
          </span>
          <span className="truncate text-[28px] font-medium text-[#9ea8b2]">
            {entry.fiscalYear}
          </span>
        </span>
      </span>

      <span className="w-[200px] shrink-0 truncate text-[32px] font-medium text-[#f2f5f7]">
        {entry.workItem}
      </span>

      <span className="shrink-0 text-[32px] font-medium whitespace-nowrap text-[#f2f5f7]">
        {entry.period.from} ～ {entry.period.to}
      </span>

      <ChevronIcon className="size-[53px] shrink-0 text-[#e3e3e3]" />
    </button>
  )
}

export function LogsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<LogTab>('Diary')
  const [photoOnly, setPhotoOnly] = useState(false)

  const visibleEntries = logEntries.filter((entry) => entry.tab === tab)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <ScreenHeader
        title="Logs"
        onBack={() => void navigate({ to: '/ksas', search: {} })}
      />

      <div className="flex min-h-0 flex-1 flex-col px-[48px] pt-[40px]">
        {/* Wraps to a second row rather than clipping: the design assumes a
            1697 px cockpit and narrower ones must still reach every action. */}
        <div className="flex min-h-[76px] shrink-0 flex-wrap items-center justify-between gap-x-[24px] gap-y-[16px]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[16px]">
            <DropdownButton value={logSortOptions[0]} width={365} />
            <div className="flex h-[76px] w-[225px] shrink-0 items-center justify-between rounded-[20px] border border-[#848b90] px-[30px]">
              <span className="text-[30px] font-medium whitespace-nowrap text-[#dae1e9]">
                Photo
              </span>
              <ToggleSwitch
                label="Show photos"
                checked={photoOnly}
                onChange={setPhotoOnly}
              />
            </div>
          </div>

          <div className="flex h-[76px] shrink-0 items-center self-start gap-[20px]">
            <ToolbarButton variant="neutral">
              <FilterIcon className="size-[36px]" />
              Filter
            </ToolbarButton>
            <ToolbarButton
              onClick={() => void navigate({ to: '/ksas/instruction' })}
            >
              +Tasks &amp; Logs
            </ToolbarButton>
          </div>
        </div>

        <div
          role="tablist"
          className="mt-[22px] flex shrink-0 items-center border-b-[0.7px] border-[#848b90] pt-[2px]"
        >
          {logTabs.map((name) => {
            const active = name === tab
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(name)}
                className="flex h-[112px] w-[343px] cursor-pointer flex-col justify-center"
              >
                <span
                  className={`flex flex-1 items-center justify-center px-[4px] text-center text-[36px] font-medium tracking-[-0.72px] ${
                    active ? 'text-[#32ff78]' : 'text-[#a9b1b9]'
                  }`}
                >
                  {name}
                </span>
                <span
                  className={`h-[2px] w-full ${active ? 'bg-[#32ff78]' : ''}`}
                />
              </button>
            )
          })}
        </div>

        <div className="ksas-scroll mt-[22px] min-h-0 flex-1 overflow-y-auto pb-[40px]">
          {visibleEntries.length === 0 ? (
            <p className="pt-[40px] text-[34px] text-[#9ea8b2]">
              No {tab.toLowerCase()} entries.
            </p>
          ) : (
            <ul className="flex flex-col gap-[18px]">
              {visibleEntries.map((entry) => (
                <li key={entry.id}>
                  <LogRow entry={entry} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
