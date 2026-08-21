const tools = [
  { id: 'search', label: 'Search fields', icon: 'search' },
  { id: 'recenter', label: 'Re-centre on fields', icon: 'autorenew' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'pinned', label: 'Pinned fields', icon: 'keep' },
  { id: 'route', label: 'Work route', icon: 'conversion-path' },
] as const

export type ToolId = (typeof tools)[number]['id'] | 'report'

type MapToolbarProps = {
  onToolPress: (toolId: ToolId) => void
}

const buttonClass =
  'flex size-[120px] cursor-pointer items-center justify-center rounded-[30px]'

export function MapToolbar({ onToolPress }: MapToolbarProps) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-[12px]">
        {tools.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            aria-label={label}
            onClick={() => onToolPress(id)}
            className={`${buttonClass} bg-[#202223]`}
          >
            <img
              src={`./assets/icons/${icon}.svg`}
              alt=""
              className="size-[60px]"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Work report"
        onClick={() => onToolPress('report')}
        className={`${buttonClass} bg-[#2ce06b]`}
      >
        <img
          src="./assets/icons/description.svg"
          alt=""
          className="size-[60px]"
        />
      </button>
    </div>
  )
}
