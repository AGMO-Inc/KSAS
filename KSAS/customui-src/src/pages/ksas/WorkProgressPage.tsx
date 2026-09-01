import { useNavigate } from '@tanstack/react-router'
import { FarmMap } from '@/components/ksas/FarmMap'
import { PieChart } from '@/components/ksas/PieChart'
import { ScreenHeader } from '@/components/ksas/controls'
import { farms } from '@/data/farms'
import { workProgress } from '@/data/workProgress'

// Module scope so FarmMap's effects see a stable dependency.
const PANEL_FIT_PADDING = { top: 60, right: 60, bottom: 60, left: 60 }

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-[1.25rem] text-[1.875rem] font-medium">
      <span className="min-w-0 flex-1 text-[#848b90]">{label}</span>
      <span className="min-w-0 flex-1 text-right text-white">{value}</span>
    </div>
  )
}

export function WorkProgressPage() {
  const navigate = useNavigate()
  const { breakdown } = workProgress

  const totalAres = breakdown.reduce((sum, part) => sum + part.areaAres, 0)
  const totalFields = breakdown.reduce((sum, part) => sum + part.fieldCount, 0)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <ScreenHeader
        title="Work Progress"
        onBack={() => void navigate({ to: '/ksas', search: {} })}
      />

      <div className="flex min-h-0 flex-1 gap-[2rem] px-[3rem] py-[2.5rem]">
        <section className="ksas-scroll flex w-[35rem] shrink-0 flex-col gap-[2.5rem] overflow-y-auto rounded-[1.25rem] bg-[#1c1c1c] p-[1.875rem]">
          <div className="flex flex-col gap-[1.0625rem]">
            <SummaryRow label="Work Item" value={workProgress.workItem} />
            <SummaryRow
              label="Planting Plan"
              value={workProgress.plantingPlan}
            />
            <SummaryRow label="Work Period" value={workProgress.workPeriod} />
          </div>

          <div className="h-px w-full bg-[#939393]" />

          <div className="flex h-[13.125rem] items-start justify-between gap-[1.25rem]">
            <div className="flex flex-col gap-[0.625rem]">
              <span className="flex h-[2.75rem] items-center text-[2.25rem] font-medium text-[#c8ced5]">
                Progress
              </span>
              <span className="flex h-[4.5625rem] items-center text-[3.75rem] font-medium text-white">
                {workProgress.progressPercent}%
              </span>
            </div>
            <PieChart
              segments={breakdown.map((part) => ({
                label: part.label,
                value: part.areaAres,
                color: part.color,
              }))}
              className="size-[13.125rem] shrink-0"
            />
          </div>

          <div className="flex flex-col gap-[1.25rem]">
            <p className="text-[2rem] font-medium text-white">
              Total : {totalAres}a ({totalFields} Fields)
            </p>
            {breakdown.map((part) => (
              <div key={part.label} className="flex items-center gap-[1.25rem]">
                <span
                  className="size-[0.9375rem] shrink-0 rounded-full"
                  style={{ backgroundColor: part.color }}
                />
                <span className="text-[1.75rem] font-medium whitespace-nowrap text-[#bfbfbf]">
                  {part.label} : {part.areaAres} a ({part.fieldCount}{' '}
                  {part.fieldCount === 1 ? 'field' : 'fields'})
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="relative min-w-0 flex-1 overflow-hidden rounded-[1.25rem]">
          <FarmMap farms={farms} fitToken={0} fitPadding={PANEL_FIT_PADDING} />
        </div>
      </div>
    </div>
  )
}
