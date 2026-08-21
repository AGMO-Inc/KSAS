export type LatLng = { lat: number; lng: number }

const METERS_PER_DEGREE_LAT = 111_320

/**
 * Offsets `origin` by a local east/north displacement in metres. Uses a flat
 * approximation, which is accurate to a few centimetres over the sub-kilometre
 * distances a field block spans.
 */
export function offsetMeters(
  origin: LatLng,
  east: number,
  north: number,
): LatLng {
  const metersPerDegreeLng =
    METERS_PER_DEGREE_LAT * Math.cos((origin.lat * Math.PI) / 180)

  return {
    lat: origin.lat + north / METERS_PER_DEGREE_LAT,
    lng: origin.lng + east / metersPerDegreeLng,
  }
}

/** Area-weighted centroid of a simple polygon, used to place its label. */
export function centroidOf(path: readonly LatLng[]): LatLng {
  let twiceArea = 0
  let lat = 0
  let lng = 0

  for (let i = 0; i < path.length; i += 1) {
    const current = path[i]!
    const next = path[(i + 1) % path.length]!
    const cross = current.lng * next.lat - next.lng * current.lat

    twiceArea += cross
    lat += (current.lat + next.lat) * cross
    lng += (current.lng + next.lng) * cross
  }

  if (twiceArea === 0) return path[0]!

  return { lat: lat / (3 * twiceArea), lng: lng / (3 * twiceArea) }
}
