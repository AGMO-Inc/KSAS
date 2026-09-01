type KsasHeaderProps = {
  onMenuPress?: () => void
  /** Machine state shown in the header pill. */
  status?: string
}

export function KsasHeader({
  onMenuPress,
  status = 'Working',
}: KsasHeaderProps) {
  return (
    <header className="flex h-[7.5rem] shrink-0 items-center justify-between bg-[#202223] px-[3rem]">
      <div className="flex items-center gap-[3.125rem]">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuPress}
          className="relative h-[2.125rem] w-[2.875rem] cursor-pointer"
        >
          <span className="absolute top-[0.125rem] left-0 h-[0.3125rem] w-[2.875rem] rounded-[0.15625rem] bg-white" />
          <span className="absolute top-[0.9375rem] left-0 h-[0.3125rem] w-[2.875rem] rounded-[0.15625rem] bg-white" />
          <span className="absolute top-[1.75rem] left-0 h-[0.3125rem] w-[2.875rem] rounded-[0.15625rem] bg-white" />
        </button>

        <div className="relative h-[3.875rem] w-[14.9375rem] overflow-hidden">
          <img
            src="./assets/logo/ksas-logo-nega.png"
            alt="KSAS"
            className="absolute top-[-19.83%] left-[-4.35%] h-[168.78%] w-[108.7%] max-w-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-[0.875rem] rounded-[2.5rem] bg-[#2ce06b]/22 py-[0.875rem] pr-[1.625rem] pl-[1.375rem]">
        <span className="size-[1.125rem] shrink-0 rounded-full bg-[#2ce06b]" />
        <span className="text-[1.75rem] font-semibold whitespace-nowrap text-white">
          {status}
        </span>
      </div>
    </header>
  )
}
