import type { Farm } from '@/data/farms'

type FarmInfoCardProps = {
  farm: Farm
  onDetailPress?: () => void
  onSettingPress?: () => void
}

const statusStyles: Record<string, string> = {
  'in Progress': 'bg-[#372a08] text-[#fabf24]',
}

const neutralStatusStyle = 'bg-[#2a2c2f] text-[#99a1ab]'

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden text-[32px] whitespace-nowrap">
      <p className="text-[#99a1ab]">{label}</p>
      <p className="font-medium text-[#f2f5f7]">{value}</p>
    </div>
  )
}

export function FarmInfoCard({
  farm,
  onDetailPress,
  onSettingPress,
}: FarmInfoCardProps) {
  const { croppingPlan } = farm

  return (
    <section className="flex size-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#333] bg-[#1c1c1c] p-[38px]">
      <div className="flex w-full flex-col gap-[24px]">
        <div className="flex w-full items-center gap-[24px]">
          <span
            className="size-[36px] shrink-0 rounded-[5px]"
            style={{ backgroundColor: farm.color }}
          />
          <h2 className="text-[38px] font-bold whitespace-nowrap text-[#f2f5f7]">
            {farm.name}
          </h2>
        </div>

        <InfoRow label="Area" value={farm.area} />
        <InfoRow label="District" value={farm.district} />
        <InfoRow label="Address" value={farm.address} />
        <InfoRow label="Owner" value={farm.owner} />

        <div className="h-px w-full bg-[#38383d]" />

        <h3 className="text-[38px] font-semibold whitespace-nowrap text-white">
          Cropping Plan
        </h3>

        <div className="flex w-full items-center justify-between gap-[16px]">
          <div className="flex min-w-0 flex-1 items-center gap-[10px]">
            <span
              className="size-[33px] shrink-0 rounded-[5px]"
              style={{ backgroundColor: farm.color }}
            />
            <p className="truncate text-[32px] font-medium text-[#f2f5f7]">
              {croppingPlan.crop}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-[20px] px-[18px] py-[8px] text-[22px] font-bold whitespace-nowrap ${
              statusStyles[croppingPlan.status] ?? neutralStatusStyle
            }`}
          >
            {croppingPlan.status}
          </span>
        </div>
      </div>

      <div className="flex w-full gap-[20px]">
        <button
          type="button"
          onClick={onDetailPress}
          className="flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[20px] bg-[#2f2f2f] py-[20px] text-[36px] font-bold whitespace-nowrap text-[#dae1e9]"
        >
          Detail
        </button>
        <button
          type="button"
          onClick={onSettingPress}
          className="flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-[20px] bg-[#2f2f2f] py-[20px] text-[36px] font-bold whitespace-nowrap text-[#dae1e9]"
        >
          Setting
        </button>
      </div>
    </section>
  )
}
