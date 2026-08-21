import { centroidOf, offsetMeters, type LatLng } from '@/lib/geo'

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
  /** Where the field's name is drawn on the map. */
  labelAt: LatLng
}

/**
 * Ground the design's field block on real farmland — the rice paddies of
 * Banwol-dong, Deokjin-gu, Jeonju (전주시 덕진구 반월동). This is the centre of
 * the block, not a corner.
 */
export const FARM_BLOCK_ORIGIN: LatLng = { lat: 35.88238, lng: 127.0707 }

/**
 * The Figma mock-up draws the fields as a flat vector group (`Group 24341`,
 * 820 x 682 design units). Those corners are kept verbatim and projected onto
 * the ground around `FARM_BLOCK_ORIGIN`, so the block keeps the exact shape and
 * arrangement of the design while sitting on live satellite imagery.
 *
 * The scale is set so Farm 1 comes out at the 36.46 a the design prints on the
 * info card; every other field's area is then measured off its own outline.
 */
const METERS_PER_DESIGN_UNIT = 0.2558443
const DESIGN_BLOCK_CENTER = { u: 410.14, v: 340.61 }

/** Ground area of a design-unit outline, in ares (1 a = 100 m2). */
function areaInAres(corners: readonly [number, number][]): number {
  let twiceArea = 0

  for (let i = 0; i < corners.length; i += 1) {
    const [x1, y1] = corners[i]!
    const [x2, y2] = corners[(i + 1) % corners.length]!
    twiceArea += x1 * y2 - x2 * y1
  }

  const squareMeters =
    (Math.abs(twiceArea) / 2) * METERS_PER_DESIGN_UNIT * METERS_PER_DESIGN_UNIT

  return squareMeters / 100
}

function fromDesignUnits(corners: readonly [number, number][]): LatLng[] {
  return corners.map(([u, v]) =>
    offsetMeters(
      FARM_BLOCK_ORIGIN,
      (u - DESIGN_BLOCK_CENTER.u) * METERS_PER_DESIGN_UNIT,
      // Design y grows downwards, latitude grows northwards.
      -(v - DESIGN_BLOCK_CENTER.v) * METERS_PER_DESIGN_UNIT,
    ),
  )
}

type FarmSeed = Omit<Farm, 'area' | 'path' | 'labelAt'> & {
  corners: readonly [number, number][]
}

const farmSeeds: FarmSeed[] = [
  {
    id: 'farm-1',
    name: 'Farm 1',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    address: '1-2-1 Mishima-cho',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    corners: [
      [393.186, 59.264],
      [306.07, 295.648],
      [80.267, 197.196],
      [162.474, 2.933],
    ],
  },
  {
    id: 'farm-2',
    name: 'Farm 2',
    color: FARM_COLORS.orange,
    district: 'Mishima (A)',
    address: '1-2-2 Mishima-cho',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Akitakomachi 2024', status: 'Planned' },
    corners: [
      [612.825, 140.977],
      [521.077, 400.521],
      [315.131, 299.749],
      [403.468, 62.223],
    ],
  },
  {
    id: 'farm-3',
    name: 'Farm 3',
    color: FARM_COLORS.cyan,
    district: 'Mishima (B)',
    address: '2-1-4 Mishima-cho',
    owner: 'Hanako Sato',
    croppingPlan: { crop: 'Soybean 2024', status: 'Planned' },
    corners: [
      [520.109, 407.644],
      [444.766, 555.415],
      [231.949, 480.562],
      [313.681, 308.342],
    ],
  },
  {
    id: 'farm-4',
    name: 'Farm 4',
    color: FARM_COLORS.magenta,
    district: 'Mishima (B)',
    address: '2-1-5 Mishima-cho',
    owner: 'Hanako Sato',
    croppingPlan: { crop: 'Fallow 2024', status: 'Resting' },
    corners: [
      [529, 404],
      [621, 142],
      [817, 222.5],
      [707, 502.5],
    ],
  },
  {
    id: 'farm-1-2',
    name: 'Farm 1-2',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    address: '1-2-1 Mishima-cho',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    corners: [
      [304.621, 304.268],
      [222.812, 475.191],
      [3.274, 373.264],
      [76.789, 206.275],
    ],
  },
  {
    id: 'farm-1-3',
    name: 'Farm 1-3',
    color: FARM_COLORS.green,
    district: 'Mishima (A)',
    address: '1-2-1 Mishima-cho',
    owner: 'Taro Kubota',
    croppingPlan: { crop: 'Koshihikari 2024', status: 'in Progress' },
    corners: [
      [705.266, 510.582],
      [629.435, 678.285],
      [452.218, 560.141],
      [525.582, 412.439],
    ],
  },
]

export const farms: Farm[] = farmSeeds.map(({ corners, ...farm }) => {
  const path = fromDesignUnits(corners)
  return {
    ...farm,
    area: `${areaInAres(corners).toFixed(2)} a`,
    path,
    labelAt: centroidOf(path),
  }
})

export const defaultFarmId = 'farm-1'
