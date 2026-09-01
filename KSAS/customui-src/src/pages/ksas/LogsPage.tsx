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
      className="flex w-full cursor-pointer items-center gap-[1.875rem] rounded-[1.25rem] border border-[#333338] bg-[#292a2b] px-[2.5rem] py-[1.625rem] text-left"
    >
      <span className="flex min-w-0 flex-1 items-center gap-[1.875rem]">
        <span
          className="size-[1.625rem] shrink-0 rounded-[0.375rem]"
          style={{ backgroundColor: entry.color }}
        />
        <span className="flex min-w-0 flex-col gap-[0.25rem]">
          <span className="truncate text-[2.25rem] font-bold text-[#f2f5f7]">
            {entry.field}
          </span>
          <span className="truncate text-[1.75rem] font-medium text-[#9ea8b2]">
            {entry.fiscalYear}
          </span>
        </span>
      </span>

      <span className="w-[12.5rem] shrink-0 truncate text-[2rem] font-medium text-[#f2f5f7]">
        {entry.workItem}
      </span>

      <span className="shrink-0 text-[2rem] font-medium whitespace-nowrap text-[#f2f5f7]">
        {entry.period.from} ～ {entry.period.to}
      </span>

      <ChevronIcon className="size-[3.3125rem] shrink-0 text-[#e3e3e3]" />
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

      <div className="flex min-h-0 flex-1 flex-col px-[3rem] pt-[2.5rem]">
        {/* Wraps to a second row rather than clipping: the design assumes a
            1697 px cockpit and narrower ones must still reach every action. */}
        <div className="flex min-h-[4.75rem] shrink-0 flex-wrap items-center justify-between gap-x-[1.5rem] gap-y-[1rem]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[1rem]">
            <DropdownButton value={logSortOptions[0]} width={365} />
            <div className="flex h-[4.75rem] w-[14.0625rem] shrink-0 items-center justify-between rounded-[1.25rem] border border-[#848b90] px-[1.875rem]">
              <span className="text-[1.875rem] font-medium whitespace-nowrap text-[#dae1e9]">
                Photo
              </span>
              <ToggleSwitch
                label="Show photos"
                checked={photoOnly}
                onChange={setPhotoOnly}
              />
            </div>
          </div>

          <div className="flex h-[4.75rem] shrink-0 items-center self-start gap-[1.25rem]">
            <ToolbarButton variant="neutral">
              <FilterIcon className="size-[2.25rem]" />
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
          className="mt-[1.375rem] flex shrink-0 items-center border-b-[0.04375rem] border-[#848b90] pt-[0.125rem]"
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
                className="flex h-[7rem] w-[21.4375rem] cursor-pointer flex-col justify-center"
              >
                <span
                  className={`flex flex-1 items-center justify-center px-[0.25rem] text-center text-[2.25rem] font-medium tracking-[-0.045rem] ${
                    active ? 'text-[#32ff78]' : 'text-[#a9b1b9]'
                  }`}
                >
                  {name}
                </span>
                <span
                  className={`h-[0.125rem] w-full ${active ? 'bg-[#32ff78]' : ''}`}
                />
              </button>
            )
          })}
        </div>

        <div className="ksas-scroll mt-[1.375rem] min-h-0 flex-1 overflow-y-auto pb-[2.5rem]">
          {visibleEntries.length === 0 ? (
            <p className="pt-[2.5rem] text-[2.125rem] text-[#9ea8b2]">
              No {tab.toLowerCase()} entries.
            </p>
          ) : (
            <ul className="flex flex-col gap-[1.125rem]">
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
