import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronIcon, CloseIcon, SearchIcon } from '@/components/ksas/icons'
import { districts } from '@/data/districts'
import { farms } from '@/data/farms'

export function FieldSearchPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const needle = query.trim().toLowerCase()
  const matches = districts.filter((district) =>
    district.toLowerCase().includes(needle),
  )

  const closeSearch = () => {
    void navigate({ to: '/ksas', search: {} })
  }

  const openDistrict = (district: string) => {
    const farm = farms.find((candidate) => candidate.district === district)
    void navigate({ to: '/ksas', search: { field: farm?.id } })
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <header className="flex h-[120px] shrink-0 items-center gap-[40px] bg-[#101012] px-[48px]">
        <button
          type="button"
          aria-label="Close search"
          onClick={closeSearch}
          className="shrink-0 cursor-pointer"
        >
          <CloseIcon className="size-[60px] text-[#e3e3e3]" />
        </button>

        <div className="flex h-[76px] min-w-0 flex-1 items-center gap-[10px] rounded-[10px] border-2 border-[#767676] px-[20px] py-[16px]">
          <SearchIcon className="size-[54px] shrink-0 text-[#848b90]" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by field name"
            aria-label="Search by field name"
            className="min-w-0 flex-1 bg-transparent text-[34px] font-medium text-white outline-none placeholder:text-[#495156]"
          />
        </div>
      </header>

      <div className="ksas-scroll flex-1 overflow-y-auto px-[40px] pt-[20px] pb-[40px]">
        {matches.length === 0 ? (
          <p className="pt-[40px] text-[34px] text-[#9ea8b2]">
            No districts match “{query.trim()}”.
          </p>
        ) : (
          <ul className="flex flex-col gap-[20px]">
            {matches.map((district) => (
              <li key={district}>
                <button
                  type="button"
                  onClick={() => openDistrict(district)}
                  className="flex w-full cursor-pointer items-center gap-[20px] rounded-[16px] bg-[#292a2b] p-[40px] text-left"
                >
                  <span className="min-w-0 flex-1 truncate text-[44px] font-medium tracking-[-0.88px] text-white">
                    {district}
                  </span>
                  <ChevronIcon className="size-[53px] shrink-0 text-[#e3e3e3]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
