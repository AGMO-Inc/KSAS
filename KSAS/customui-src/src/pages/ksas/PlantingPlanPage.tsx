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
      className="flex w-full cursor-pointer items-center gap-[1.875rem] rounded-[1.25rem] border border-[#333338] bg-[#292a2b] px-[2.5rem] py-[1.625rem] text-left"
    >
      <span className="flex shrink-0 items-center gap-[0.625rem] rounded-full bg-[#2ce06b]/20 px-[1.25rem] py-[0.625rem]">
        <span className="size-[0.5625rem] rounded-full bg-[#2ce06b]" />
        <span className="text-[1.5rem] font-medium whitespace-nowrap text-[#2ce06b]">
          {plan.status}
        </span>
      </span>

      <span className="flex min-w-0 flex-1 items-center gap-[1.125rem]">
        <span
          className="size-[1.625rem] shrink-0 rounded-[0.375rem]"
          style={{ backgroundColor: plan.color }}
        />
        <span className="flex min-w-0 flex-col gap-[0.25rem]">
          <span className="truncate text-[2.25rem] font-bold text-[#f2f5f7]">
            {plan.crop}
          </span>
          <span className="truncate text-[1.75rem] text-[#9ea8b2]">
            {plan.fiscalYear}
          </span>
        </span>
      </span>

      <span className="flex w-[12.5rem] shrink-0 flex-col gap-[0.25rem] whitespace-nowrap">
        <span className="text-[2rem] font-medium text-[#f2f5f7]">
          {plan.areaAres} a
        </span>
        <span className="text-[1.75rem] text-[#9ea8b2]">
          {plan.fieldCount} {plan.fieldCount === 1 ? 'field' : 'fields'}
        </span>
      </span>

      <span className="flex shrink-0 flex-col gap-[0.375rem] whitespace-nowrap">
        <span className="text-[2rem] font-medium text-[#f2f5f7]">
          {plan.period.from} ～ {plan.period.to}
        </span>
        <span className="text-[1.75rem] text-[#9ea8b2]">Period</span>
      </span>

      <ChevronIcon className="size-[3.3125rem] shrink-0 text-[#e3e3e3]" />
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

      <div className="flex min-h-0 flex-1 flex-col px-[3rem] pt-[2.5rem]">
        {/* Wraps to a second row rather than clipping: the design assumes a
            1697 px cockpit and narrower ones must still reach every action. */}
        <div className="flex min-h-[4.75rem] shrink-0 flex-wrap items-center justify-between gap-x-[1.5rem] gap-y-[1rem]">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[1rem]">
            <DropdownButton value={plantingPlanStatuses[0]} />
            <DropdownButton value={plantingPlanYears[0]} />
          </div>

          <div className="flex h-[4.75rem] shrink-0 items-center self-start gap-[1.875rem]">
            <ListSummary count={visiblePlans.length} totalAres={totalAres} />
            <ToolbarButton>+Add</ToolbarButton>
          </div>
        </div>

        <div className="mt-[1.625rem] flex h-[4.125rem] shrink-0 items-center gap-[1rem]">
          {cropCategories.map((crop) => (
            <FilterChip
              key={crop}
              label={crop}
              active={crop === category}
              onClick={() => setCategory(crop)}
            />
          ))}
        </div>

        <div className="ksas-scroll mt-[1.625rem] min-h-0 flex-1 overflow-y-auto pb-[2.5rem]">
          {visiblePlans.length === 0 ? (
            <p className="pt-[2.5rem] text-[2.125rem] text-[#9ea8b2]">
              No {category.toLowerCase()} planting plans.
            </p>
          ) : (
            <ul className="flex flex-col gap-[1.125rem]">
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
