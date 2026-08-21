import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { FarmInfoCard } from '@/components/ksas/FarmInfoCard'
import { FarmMap } from '@/components/ksas/FarmMap'
import { KsasHeader } from '@/components/ksas/KsasHeader'
import { MapToolbar, type ToolId } from '@/components/ksas/MapToolbar'
import { SidebarDrawer } from '@/components/ksas/SidebarDrawer'
import { farms } from '@/data/farms'

const route = getRouteApi('/ksas/')

export function FieldMapPage() {
  const { field } = route.useSearch()
  const navigate = route.useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [fitToken, setFitToken] = useState(0)

  // The selected field lives in the URL so the search screen can hand one over.
  const selectedFarm = farms.find((farm) => farm.id === field) ?? farms[0]!

  const selectFarm = (farmId: string) => {
    void navigate({ to: '/ksas', search: { field: farmId }, replace: true })
  }

  const handleToolPress = (toolId: ToolId) => {
    if (toolId === 'recenter') setFitToken((token) => token + 1)
    if (toolId === 'search') void navigate({ to: '/ksas/search' })
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#202223] leading-[normal]">
      <KsasHeader onMenuPress={() => setMenuOpen(true)} />

      <div className="relative flex-1 overflow-hidden">
        <FarmMap
          farms={farms}
          selectedFarmId={selectedFarm.id}
          onSelectFarm={selectFarm}
          fitToken={fitToken}
        />

        <div className="absolute top-[40px] bottom-[40px] left-[40px] w-[562px]">
          <FarmInfoCard farm={selectedFarm} />
        </div>

        <div className="absolute top-[40px] right-[40px] bottom-[40px] w-[120px]">
          <MapToolbar onToolPress={handleToolPress} />
        </div>
      </div>

      <SidebarDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
