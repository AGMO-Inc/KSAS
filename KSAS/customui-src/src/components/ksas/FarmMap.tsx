import { useEffect, useRef } from 'react'
import type { Farm } from '@/data/farms'
import { useGoogleMaps } from '@/lib/googleMaps'

type FitPadding = { top: number; right: number; bottom: number; left: number }

type FarmMapProps = {
  farms: readonly Farm[]
  /** Omit for a display-only map with no field highlighted. */
  selectedFarmId?: string
  /** Omit to make the outlines non-interactive. */
  onSelectFarm?: (farmId: string) => void
  /** Bump to re-frame the field block, e.g. from the tool rail. */
  fitToken: number
  /** Space to leave around the block; defaults to the field map's overlays. */
  fitPadding?: FitPadding
}

/** Keeps the field block clear of the info card (left) and the tool rail (right). */
const FIELD_MAP_FIT_PADDING: FitPadding = {
  top: 80,
  right: 200,
  bottom: 80,
  left: 642,
}

/** Matches the 5 px / 20 % outline the design draws over the imagery. */
const OUTLINE = {
  strokeWeight: 5,
  selectedStrokeWeight: 9,
  fillOpacity: 0.2,
  selectedFillOpacity: 0.34,
} as const

function createLabelOverlay(
  maps: typeof google.maps,
  position: google.maps.LatLngLiteral,
  text: string,
): google.maps.OverlayView {
  const element = document.createElement('div')
  element.className = 'ksas-field-label'
  element.textContent = text

  const overlay = new maps.OverlayView()

  overlay.onAdd = () => {
    overlay.getPanes()?.floatPane.appendChild(element)
  }

  overlay.draw = () => {
    const point = overlay
      .getProjection()
      ?.fromLatLngToDivPixel(new maps.LatLng(position))
    if (!point) return
    element.style.left = `${point.x}px`
    element.style.top = `${point.y}px`
  }

  overlay.onRemove = () => {
    element.remove()
  }

  return overlay
}

function boundsOf(
  maps: typeof google.maps,
  farms: readonly Farm[],
): google.maps.LatLngBounds {
  const bounds = new maps.LatLngBounds()
  for (const farm of farms) {
    for (const corner of farm.path) bounds.extend(corner)
  }
  return bounds
}

export function FarmMap({
  farms,
  selectedFarmId,
  onSelectFarm,
  fitToken,
  fitPadding = FIELD_MAP_FIT_PADDING,
}: FarmMapProps) {
  const { maps, error } = useGoogleMaps()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const polygonsRef = useRef(new Map<string, google.maps.Polygon>())
  // Held in a ref so re-renders never tear down and rebuild the map.
  const onSelectFarmRef = useRef(onSelectFarm)
  onSelectFarmRef.current = onSelectFarm

  const interactive = onSelectFarm !== undefined

  useEffect(() => {
    const container = containerRef.current
    if (!maps || !container) return

    const map = new maps.Map(container, {
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      clickableIcons: false,
      keyboardShortcuts: false,
      isFractionalZoomEnabled: true,
      tilt: 0,
    })
    mapRef.current = map

    const polygons = new Map<string, google.maps.Polygon>()
    const overlays: google.maps.OverlayView[] = []

    for (const farm of farms) {
      const polygon = new maps.Polygon({
        map,
        paths: farm.path,
        strokeColor: farm.color,
        fillColor: farm.color,
        strokeOpacity: 1,
        strokeWeight: OUTLINE.strokeWeight,
        fillOpacity: OUTLINE.fillOpacity,
        clickable: interactive,
      })
      polygon.addListener('click', () => onSelectFarmRef.current?.(farm.id))
      polygons.set(farm.id, polygon)

      const label = createLabelOverlay(maps, farm.labelAt, farm.name)
      label.setMap(map)
      overlays.push(label)
    }

    polygonsRef.current = polygons
    map.fitBounds(boundsOf(maps, farms), fitPadding)

    return () => {
      for (const polygon of polygons.values()) {
        maps.event.clearInstanceListeners(polygon)
        polygon.setMap(null)
      }
      for (const overlay of overlays) overlay.setMap(null)
      maps.event.clearInstanceListeners(map)
      // Google Maps injects its own DOM into the container; drop it so a
      // remount (React strict mode, hot reload) starts from a clean node.
      container.replaceChildren()
      polygonsRef.current = new Map()
      mapRef.current = null
    }
  }, [farms, fitPadding, interactive, maps])

  useEffect(() => {
    for (const [farmId, polygon] of polygonsRef.current) {
      const selected = farmId === selectedFarmId
      polygon.setOptions({
        strokeWeight: selected
          ? OUTLINE.selectedStrokeWeight
          : OUTLINE.strokeWeight,
        fillOpacity: selected
          ? OUTLINE.selectedFillOpacity
          : OUTLINE.fillOpacity,
        zIndex: selected ? 2 : 1,
      })
    }
  }, [maps, selectedFarmId])

  useEffect(() => {
    if (!maps || !mapRef.current || fitToken === 0) return
    mapRef.current.fitBounds(boundsOf(maps, farms), fitPadding)
  }, [farms, fitPadding, fitToken, maps])

  return (
    <div className="absolute inset-0 bg-[#1c1c1c]">
      <div ref={containerRef} className="size-full" />
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center py-[80px]"
          // Stay inside the strip of map the card and the tool rail leave free.
          style={{
            paddingLeft: fitPadding.left,
            paddingRight: fitPadding.right,
          }}
        >
          <div className="max-w-[720px] rounded-[28px] border border-[#333] bg-[#1c1c1c] p-[38px] text-center">
            <p className="text-[32px] font-semibold text-[#f2f5f7]">
              Satellite map unavailable
            </p>
            <p className="mt-[16px] text-[24px] leading-relaxed break-words text-[#99a1ab]">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
