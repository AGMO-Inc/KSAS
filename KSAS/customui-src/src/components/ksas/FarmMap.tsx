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

/**
 * The design draws a 5 px / 20 % outline at the zoom where the field block
 * fills the map. `strokeWeight` is a screen-pixel width, so holding it constant
 * makes the outline swallow the parcel as you zoom out — these paddies are
 * narrow strips. Scale it with the zoom instead so the outline keeps a roughly
 * constant width on the ground, clamped so it neither vanishes when far out nor
 * exceeds the design when close in.
 */
const OUTLINE = {
  strokeWeight: 5,
  selectedStrokeWeight: 9,
  minStrokeWeight: 0.8,
  minSelectedStrokeWeight: 1.4,
  /** Zoom the design's 5 px outline is drawn at. */
  referenceZoom: 19,
  fillOpacity: 0.2,
  selectedFillOpacity: 0.34,
} as const

function strokeWeightsAt(zoom: number | undefined) {
  const scale = 2 ** ((zoom ?? OUTLINE.referenceZoom) - OUTLINE.referenceZoom)

  const clamp = (design: number, floor: number) =>
    Math.min(design, Math.max(floor, design * scale))

  return {
    base: clamp(OUTLINE.strokeWeight, OUTLINE.minStrokeWeight),
    selected: clamp(
      OUTLINE.selectedStrokeWeight,
      OUTLINE.minSelectedStrokeWeight,
    ),
  }
}

/** Restyles every outline for the current selection and zoom. */
function applyOutlines(
  polygons: ReadonlyMap<string, google.maps.Polygon>,
  selectedFarmId: string | undefined,
  zoom: number | undefined,
) {
  const weights = strokeWeightsAt(zoom)

  for (const [farmId, polygon] of polygons) {
    const selected = farmId === selectedFarmId
    polygon.setOptions({
      strokeWeight: selected ? weights.selected : weights.base,
      fillOpacity: selected ? OUTLINE.selectedFillOpacity : OUTLINE.fillOpacity,
      zIndex: selected ? 2 : 1,
    })
  }
}

/** Gap between a field's southern tip and its label, and between labels. */
const LABEL_GAP = 8

/** Southernmost vertex — the label hangs below this point. */
function southTip(
  path: readonly google.maps.LatLngLiteral[],
): google.maps.LatLngLiteral {
  let lowest = path[0]!
  for (const point of path) if (point.lat < lowest.lat) lowest = point
  return lowest
}

/**
 * Draws every field label in one overlay.
 *
 * The labels sit under their field rather than on it: these paddies are 20–34 m
 * wide strips, so a label centred on one spills over its neighbours. Owning all
 * of them together also lets `draw` de-collide — neighbouring fields can be
 * 19 m apart, closer than the labels are tall, so anchoring alone is not enough.
 * Overlapping labels are pushed straight down, which keeps each one under its
 * own field.
 */
function createLabelLayer(
  maps: typeof google.maps,
  farms: readonly Farm[],
): google.maps.OverlayView {
  const entries = farms.map((farm) => {
    const element = document.createElement('div')
    element.className = 'ksas-field-label'
    element.textContent = farm.name
    return { element, anchor: southTip(farm.path) }
  })

  const overlay = new maps.OverlayView()

  overlay.onAdd = () => {
    const pane = overlay.getPanes()?.floatPane
    for (const entry of entries) pane?.appendChild(entry.element)
  }

  overlay.draw = () => {
    const projection = overlay.getProjection()
    if (!projection) return

    const points = entries.flatMap((entry) => {
      const point = projection.fromLatLngToDivPixel(
        new maps.LatLng(entry.anchor),
      )
      return point ? [{ entry, point }] : []
    })

    // Settle from the top down so a label is only ever pushed away from a
    // neighbour that is already final.
    points.sort((a, b) => a.point.y - b.point.y)

    const placed: {
      left: number
      right: number
      top: number
      bottom: number
    }[] = []

    for (const { entry, point } of points) {
      const width = entry.element.offsetWidth
      const height = entry.element.offsetHeight
      let top = point.y + LABEL_GAP

      for (let attempt = 0; attempt <= placed.length; attempt += 1) {
        const box = {
          left: point.x - width / 2,
          right: point.x + width / 2,
          top,
          bottom: top + height,
        }
        const hit = placed.find(
          (other) =>
            box.left < other.right &&
            box.right > other.left &&
            box.top < other.bottom &&
            box.bottom > other.top,
        )
        if (!hit) {
          placed.push(box)
          break
        }
        top = hit.bottom + LABEL_GAP
      }

      entry.element.style.left = `${point.x}px`
      entry.element.style.top = `${top}px`
    }
  }

  overlay.onRemove = () => {
    for (const entry of entries) entry.element.remove()
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
  // Read by the zoom listener, which outlives any one selection.
  const selectedFarmIdRef = useRef(selectedFarmId)
  selectedFarmIdRef.current = selectedFarmId

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
    }

    const labelLayer = createLabelLayer(maps, farms)
    labelLayer.setMap(map)
    overlays.push(labelLayer)

    polygonsRef.current = polygons

    const restyle = () =>
      applyOutlines(polygons, selectedFarmIdRef.current, map.getZoom())
    map.addListener('zoom_changed', restyle)
    // fitBounds settles asynchronously; pick up the zoom it lands on.
    map.addListener('idle', restyle)

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
    applyOutlines(
      polygonsRef.current,
      selectedFarmId,
      mapRef.current?.getZoom(),
    )
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
