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
    <div className="flex w-full items-center justify-between gap-[20px] text-[30px] font-medium">
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

      <div className="flex min-h-0 flex-1 gap-[32px] px-[48px] py-[40px]">
        <section className="ksas-scroll flex w-[560px] shrink-0 flex-col gap-[40px] overflow-y-auto rounded-[20px] bg-[#1c1c1c] p-[30px]">
          <div className="flex flex-col gap-[17px]">
            <SummaryRow label="Work Item" value={workProgress.workItem} />
            <SummaryRow
              label="Planting Plan"
              value={workProgress.plantingPlan}
            />
            <SummaryRow label="Work Period" value={workProgress.workPeriod} />
          </div>

          <div className="h-px w-full bg-[#939393]" />

          <div className="flex h-[210px] items-start justify-between gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <span className="flex h-[44px] items-center text-[36px] font-medium text-[#c8ced5]">
                Progress
              </span>
              <span className="flex h-[73px] items-center text-[60px] font-medium text-white">
                {workProgress.progressPercent}%
              </span>
            </div>
            <PieChart
              segments={breakdown.map((part) => ({
                label: part.label,
                value: part.areaAres,
                color: part.color,
              }))}
              className="size-[210px] shrink-0"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <p className="text-[32px] font-medium text-white">
              Total : {totalAres}a ({totalFields} Fields)
            </p>
            {breakdown.map((part) => (
              <div key={part.label} className="flex items-center gap-[20px]">
                <span
                  className="size-[15px] shrink-0 rounded-full"
                  style={{ backgroundColor: part.color }}
                />
                <span className="text-[28px] font-medium whitespace-nowrap text-[#bfbfbf]">
                  {part.label} : {part.areaAres} a ({part.fieldCount}{' '}
                  {part.fieldCount === 1 ? 'field' : 'fields'})
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="relative min-w-0 flex-1 overflow-hidden rounded-[20px]">
          <FarmMap farms={farms} fitToken={0} fitPadding={PANEL_FIT_PADDING} />
        </div>
      </div>
    </div>
  )
}
