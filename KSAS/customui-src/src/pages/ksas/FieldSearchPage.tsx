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
      <header className="flex h-[7.5rem] shrink-0 items-center gap-[2.5rem] bg-[#101012] px-[3rem]">
        <button
          type="button"
          aria-label="Close search"
          onClick={closeSearch}
          className="shrink-0 cursor-pointer"
        >
          <CloseIcon className="size-[3.75rem] text-[#e3e3e3]" />
        </button>

        <div className="flex h-[4.75rem] min-w-0 flex-1 items-center gap-[0.625rem] rounded-[0.625rem] border-2 border-[#767676] px-[1.25rem] py-[1rem]">
          <SearchIcon className="size-[3.375rem] shrink-0 text-[#848b90]" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by field name"
            aria-label="Search by field name"
            className="min-w-0 flex-1 bg-transparent text-[2.125rem] font-medium text-white outline-none placeholder:text-[#495156]"
          />
        </div>
      </header>

      <div className="ksas-scroll flex-1 overflow-y-auto px-[2.5rem] pt-[1.25rem] pb-[2.5rem]">
        {matches.length === 0 ? (
          <p className="pt-[2.5rem] text-[2.125rem] text-[#9ea8b2]">
            No districts match “{query.trim()}”.
          </p>
        ) : (
          <ul className="flex flex-col gap-[1.25rem]">
            {matches.map((district) => (
              <li key={district}>
                <button
                  type="button"
                  onClick={() => openDistrict(district)}
                  className="flex w-full cursor-pointer items-center gap-[1.25rem] rounded-[1rem] bg-[#292a2b] p-[2.5rem] text-left"
                >
                  <span className="min-w-0 flex-1 truncate text-[2.75rem] font-medium tracking-[-0.055rem] text-white">
                    {district}
                  </span>
                  <ChevronIcon className="size-[3.3125rem] shrink-0 text-[#e3e3e3]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
