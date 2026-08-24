import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownButton,
  FilterChip,
  ListSummary,
  ScreenHeader,
  ToolbarButton,
} from '@/components/ksas/controls'
import { ChevronIcon } from '@/components/ksas/icons'
import {
  cropCategories,
  plantingPlans,
  plantingPlanStatuses,
  plantingPlanYears,
  type CropCategory,
  type PlantingPlan,
} from '@/data/plantingPlans'

function PlanRow({ plan }: { plan: PlantingPlan }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center gap-[30px] rounded-[20px] border border-[#333338] bg-[#292a2b] px-[40px] py-[26px] text-left"
    >
      <span className="flex shrink-0 items-center gap-[10px] rounded-full bg-[#2ce06b]/20 px-[20px] py-[10px]">
        <span className="size-[9px] rounded-full bg-[#2ce06b]" />
        <span className="text-[24px] font-medium whitespace-nowrap text-[#2ce06b]">
          {plan.status}
        </span>
      </span>

      <span className="flex min-w-0 flex-1 items-center gap-[18px]">
        <span
          className="size-[26px] shrink-0 rounded-[6px]"
          style={{ backgroundColor: plan.color }}
        />
        <span className="flex min-w-0 flex-col gap-[4px]">
          <span className="truncate text-[36px] font-bold text-[#f2f5f7]">
            {plan.crop}
          </span>
          <span className="truncate text-[28px] text-[#9ea8b2]">
            {plan.fiscalYear}
          </span>
        </span>
      </span>

      <span className="flex w-[200px] shrink-0 flex-col gap-[4px] whitespace-nowrap">
        <span className="text-[32px] font-medium text-[#f2f5f7]">
          {plan.areaAres} a
        </span>
        <span className="text-[28px] text-[#9ea8b2]">
          {plan.fieldCount} {plan.fieldCount === 1 ? 'field' : 'fields'}
        </span>
      </span>

      <span className="flex shrink-0 flex-col gap-[6px] whitespace-nowrap">
        <span className="text-[32px] font-medium text-[#f2f5f7]">
          {plan.period.from} ～ {plan.period.to}
        </span>
        <span className="text-[28px] text-[#9ea8b2]">Period</span>
      </span>

      <ChevronIcon className="size-[53px] shrink-0 text-[#e3e3e3]" />
    </button>
  )
}

export function PlantingPlanPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState<CropCategory>('Rice')

  const visiblePlans = plantingPlans.filter(
    (plan) => plan.category === category,
  )
  const totalAres = visiblePlans.reduce((sum, plan) => sum + plan.areaAres, 0)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <ScreenHeader
        title="Planting Plan"
        onBack={() => void navigate({ to: '/ksas', search: {} })}
      />

      <div className="flex min-h-0 flex-1 flex-col px-[48px] pt-[40px]">
        {/* Wraps to a second row rather than clipping: the design assumes a
            1697 px cockpit and narrower ones must still reach every action. */}
        <div className="flex min-h-[76px] shrink-0 flex-wrap items-center justify-between gap-x-[24px] gap-y-[16px]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[16px]">
            <DropdownButton value={plantingPlanStatuses[0]} />
            <DropdownButton value={plantingPlanYears[0]} />
          </div>

          <div className="flex h-[76px] shrink-0 items-center self-start gap-[30px]">
            <ListSummary count={visiblePlans.length} totalAres={totalAres} />
            <ToolbarButton>+Add</ToolbarButton>
          </div>
        </div>

        <div className="mt-[26px] flex h-[66px] shrink-0 items-center gap-[16px]">
          {cropCategories.map((crop) => (
            <FilterChip
              key={crop}
              label={crop}
              active={crop === category}
              onClick={() => setCategory(crop)}
            />
          ))}
        </div>

        <div className="ksas-scroll mt-[26px] min-h-0 flex-1 overflow-y-auto pb-[40px]">
          {visiblePlans.length === 0 ? (
            <p className="pt-[40px] text-[34px] text-[#9ea8b2]">
              No {category.toLowerCase()} planting plans.
            </p>
          ) : (
            <ul className="flex flex-col gap-[18px]">
              {visiblePlans.map((plan) => (
                <li key={plan.id}>
                  <PlanRow plan={plan} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
