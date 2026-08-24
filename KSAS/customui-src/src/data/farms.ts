import type { LatLng } from '@/lib/geo'

export const FARM_COLORS = {
  green: '#04FF60',
  orange: '#FF9704',
  cyan: '#04F2FF',
  magenta: '#FF046D',
} as const

export type FarmColor = (typeof FARM_COLORS)[keyof typeof FARM_COLORS]

export type Farm = {
  id: string
  name: string
  color: FarmColor
  /** Ground area of `path`, formatted in ares — the unit KSAS reports fields in. */
  area: string
  district: string
  address: string
  owner: string
  croppingPlan: { crop: string; status: string }
  /** Field outline, clockwise. */
  path: LatLng[]
}

/**
 * The outlines below are real cadastral parcel boundaries, not drawn shapes.
 *
 * 出典：「登記所備付地図データ 三島市」（法務省）
 * https://www.geospatial.jp/ckan/dataset/houmusyouchizu-2026-1-1059
 * （2026年8月24日に利用）を加工して作成
 *
 * Processing applied: six parcels were selected from sheet `22206-0801-2026`;
 * their plane-rectangular zone VIII coordinates (JGD2011, origin 36°N
 * 138°30'E, m0 = 0.9999) were reprojected to WGS84 and the rings rewound
 * clockwise. Nothing else about the geometry was altered.
 *
 * The parcels are adjacent rice paddies in Umena, Mishima City, Shizuoka
 * (静岡県三島市梅名) — the district the design's `Mishima (A)` / `Mishima (B)`
 * labels stand in for.
 *
 * Owners and cropping plans are FICTIONAL. The registry map carries boundaries
 * and lot numbers only — no ownership, no land use. Do not read `owner` as a
 * claim about who holds the real parcel.
 */
type FarmSeed = Omit<Farm, 'area'>

const farmSeeds: FarmSeed[] = [
  {
    id: 'farm-1',
    name: 'Farm 1',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    // 三島市梅名664-1 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '664-1 Umena, Mishima',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    path: [
      { lat: 35.095771, lng: 138.919664 },
      { lat: 35.096256, lng: 138.91942 },
      { lat: 35.096539, lng: 138.919278 },
      { lat: 35.096617, lng: 138.919239 },
      { lat: 35.096739, lng: 138.919576 },
      { lat: 35.09644, lng: 138.919727 },
      { lat: 35.095892, lng: 138.92 },
    ],
  },
  {
    id: 'farm-2',
    name: 'Farm 2',
    color: FARM_COLORS.orange,
    district: 'Mishima (A)',
    // 三島市梅名688-1 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '688-1 Umena, Mishima',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Akitakomachi 2024', status: 'Planned' },
    path: [
      { lat: 35.095141, lng: 138.921056 },
      { lat: 35.09535, lng: 138.920951 },
      { lat: 35.095524, lng: 138.920865 },
      { lat: 35.095651, lng: 138.9208 },
      { lat: 35.095783, lng: 138.920734 },
      { lat: 35.096042, lng: 138.920604 },
      { lat: 35.09612, lng: 138.92086 },
      { lat: 35.095435, lng: 138.921222 },
      { lat: 35.095346, lng: 138.921269 },
      { lat: 35.095231, lng: 138.92133 },
      { lat: 35.09516, lng: 138.921109 },
    ],
  },
  {
    id: 'farm-3',
    name: 'Farm 3',
    color: FARM_COLORS.cyan,
    district: 'Mishima (B)',
    // 三島市梅名697 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '697 Umena, Mishima',
    owner: 'Hanako Sato',
    croppingPlan: { crop: 'Soybean 2024', status: 'Planned' },
    path: [
      { lat: 35.094632, lng: 138.919546 },
      { lat: 35.094876, lng: 138.919431 },
      { lat: 35.095301, lng: 138.919229 },
      { lat: 35.095379, lng: 138.919192 },
      { lat: 35.095526, lng: 138.919123 },
      { lat: 35.095606, lng: 138.91934 },
      { lat: 35.095381, lng: 138.919458 },
      { lat: 35.09524, lng: 138.919534 },
      { lat: 35.095048, lng: 138.919638 },
      { lat: 35.095016, lng: 138.919654 },
      { lat: 35.094936, lng: 138.919697 },
      { lat: 35.094916, lng: 138.919708 },
      { lat: 35.094786, lng: 138.919778 },
      { lat: 35.094716, lng: 138.919815 },
    ],
  },
  {
    id: 'farm-4',
    name: 'Farm 4',
    color: FARM_COLORS.magenta,
    district: 'Mishima (B)',
    // 三島市梅名693-1 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '693-1 Umena, Mishima',
    owner: 'Hanako Sato',
    croppingPlan: { crop: 'Fallow 2024', status: 'Resting' },
    path: [
      { lat: 35.094832, lng: 138.920151 },
      { lat: 35.094793, lng: 138.920051 },
      { lat: 35.094969, lng: 138.919965 },
      { lat: 35.09508, lng: 138.919912 },
      { lat: 35.095129, lng: 138.919887 },
      { lat: 35.095244, lng: 138.91983 },
      { lat: 35.095284, lng: 138.919811 },
      { lat: 35.095416, lng: 138.919746 },
      { lat: 35.095451, lng: 138.91973 },
      { lat: 35.09569, lng: 138.919614 },
      { lat: 35.095694, lng: 138.919612 },
      { lat: 35.095697, lng: 138.919619 },
      { lat: 35.095767, lng: 138.919819 },
      { lat: 35.095557, lng: 138.91992 },
      { lat: 35.09554, lng: 138.919929 },
      { lat: 35.095374, lng: 138.920007 },
      { lat: 35.094867, lng: 138.920251 },
    ],
  },
  {
    id: 'farm-1-2',
    name: 'Farm 1-2',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    // 三島市梅名690-1 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '690-1 Umena, Mishima',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    path: [
      { lat: 35.094935, lng: 138.920465 },
      { lat: 35.095084, lng: 138.9204 },
      { lat: 35.095402, lng: 138.92026 },
      { lat: 35.095444, lng: 138.920387 },
      { lat: 35.095893, lng: 138.920174 },
      { lat: 35.095941, lng: 138.920306 },
      { lat: 35.09586, lng: 138.920342 },
      { lat: 35.095479, lng: 138.920511 },
      { lat: 35.095117, lng: 138.920676 },
      { lat: 35.09502, lng: 138.920719 },
      { lat: 35.094958, lng: 138.920537 },
    ],
  },
  {
    id: 'farm-1-3',
    name: 'Farm 1-3',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    // 三島市梅名689-1 — 登記所備付地図 (法務省, 22206-0801-2026) の筆界
    address: '689-1 Umena, Mishima',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    path: [
      { lat: 35.09502, lng: 138.920719 },
      { lat: 35.095117, lng: 138.920676 },
      { lat: 35.095479, lng: 138.920511 },
      { lat: 35.09586, lng: 138.920342 },
      { lat: 35.095941, lng: 138.920306 },
      { lat: 35.095998, lng: 138.920464 },
      { lat: 35.09554, lng: 138.920694 },
      { lat: 35.095369, lng: 138.920778 },
      { lat: 35.095089, lng: 138.920916 },
      { lat: 35.095069, lng: 138.92086 },
    ],
  },
]

const METERS_PER_DEGREE_LAT = 111_320

/**
 * Ground area of an outline, in ares (1 a = 100 m2). Projects onto a local
 * tangent plane first, which is exact to well under a square metre at the
 * hundred-metre scale of a paddy.
 */
function areaInAres(path: readonly LatLng[]): number {
  const metersPerDegreeLng =
    METERS_PER_DEGREE_LAT * Math.cos((path[0]!.lat * Math.PI) / 180)
  let twiceArea = 0

  for (let i = 0; i < path.length; i += 1) {
    const current = path[i]!
    const next = path[(i + 1) % path.length]!

    twiceArea +=
      current.lng * metersPerDegreeLng * (next.lat * METERS_PER_DEGREE_LAT) -
      next.lng * metersPerDegreeLng * (current.lat * METERS_PER_DEGREE_LAT)
  }

  return Math.abs(twiceArea) / 2 / 100
}

export const farms: Farm[] = farmSeeds.map((farm) => ({
  ...farm,
  area: `${areaInAres(farm.path).toFixed(2)} a`,
}))

export const defaultFarmId = 'farm-1'
