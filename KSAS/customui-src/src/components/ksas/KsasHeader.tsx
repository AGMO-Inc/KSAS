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
    <header className="flex h-[120px] shrink-0 items-center justify-between bg-[#202223] px-[48px]">
      <div className="flex items-center gap-[50px]">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuPress}
          className="relative h-[34px] w-[46px] cursor-pointer"
        >
          <span className="absolute top-[2px] left-0 h-[5px] w-[46px] rounded-[2.5px] bg-white" />
          <span className="absolute top-[15px] left-0 h-[5px] w-[46px] rounded-[2.5px] bg-white" />
          <span className="absolute top-[28px] left-0 h-[5px] w-[46px] rounded-[2.5px] bg-white" />
        </button>

        <div className="relative h-[62px] w-[239px] overflow-hidden">
          <img
            src="./assets/logo/ksas-logo-nega.png"
            alt="KSAS"
            className="absolute top-[-19.83%] left-[-4.35%] h-[168.78%] w-[108.7%] max-w-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-[14px] rounded-[40px] bg-[#2ce06b]/22 py-[14px] pr-[26px] pl-[22px]">
        <span className="size-[18px] shrink-0 rounded-full bg-[#2ce06b]" />
        <span className="text-[28px] font-semibold whitespace-nowrap text-white">
          {status}
        </span>
      </div>
    </header>
  )
}
