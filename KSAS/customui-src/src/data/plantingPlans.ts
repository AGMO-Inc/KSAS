export const cropCategories = [
  'Rice',
  'Wheat',
  'Barley',
  'Vegetable',
  'Other',
] as const

export type CropCategory = (typeof cropCategories)[number]

export type PlantingPlan = {
  id: string
  crop: string
  fiscalYear: string
  category: CropCategory
  /** Swatch colour shown next to the crop name. */
  color: string
  status: string
  areaAres: number
  fieldCount: number
  period: { from: string; to: string }
}

/**
 * The five rows the design shows under the Rice filter, plus a handful of rows
 * in the other categories so the crop chips have something to filter. Replace
 * with the KSAS planting-plan API once it is wired up.
 */
export const plantingPlans: PlantingPlan[] = [
  {
    id: 'plan-1',
    crop: 'Koshihikari 2024',
    fiscalYear: 'FY 2024',
    category: 'Rice',
    color: '#f5a60d',
    status: 'In Progress',
    areaAres: 1225.06,
    fieldCount: 27,
    period: { from: '2024/01/01', to: '2024/12/31' },
  },
  {
    id: 'plan-2',
    crop: 'Akitakomachi 2024',
    fiscalYear: 'FY 2024',
    category: 'Rice',
    color: '#2199cc',
    status: 'In Progress',
    areaAres: 100,
    fieldCount: 1,
    period: { from: '2024/03/01', to: '2024/11/31' },
  },
  {
    id: 'plan-3',
    crop: 'Akitakomachi 2024',
    fiscalYear: 'FY 2024',
    category: 'Rice',
    color: '#2199cc',
    status: 'In Progress',
    areaAres: 100,
    fieldCount: 1,
    period: { from: '2024/03/01', to: '2024/11/31' },
  },
  {
    id: 'plan-4',
    crop: 'New Cropping Plan',
    fiscalYear: 'FY 2024',
    category: 'Rice',
    color: '#e54040',
    status: 'In Progress',
    areaAres: 100,
    fieldCount: 1,
    period: { from: '2024/03/01', to: '2024/11/31' },
  },
  {
    id: 'plan-5',
    crop: 'Koshihikari 2024',
    fiscalYear: 'FY 2024',
    category: 'Rice',
    color: '#f5a60d',
    status: 'In Progress',
    areaAres: 1225.06,
    fieldCount: 27,
    period: { from: '2024/01/01', to: '2024/12/31' },
  },
  {
    id: 'plan-6',
    crop: 'Yumechikara 2024',
    fiscalYear: 'FY 2024',
    category: 'Wheat',
    color: '#c8a24a',
    status: 'In Progress',
    areaAres: 412.8,
    fieldCount: 9,
    period: { from: '2024/10/01', to: '2025/06/30' },
  },
  {
    id: 'plan-7',
    crop: 'Kitahonami 2024',
    fiscalYear: 'FY 2024',
    category: 'Wheat',
    color: '#c8a24a',
    status: 'In Progress',
    areaAres: 208.4,
    fieldCount: 5,
    period: { from: '2024/10/15', to: '2025/07/15' },
  },
  {
    id: 'plan-8',
    crop: 'Sukai Golden 2024',
    fiscalYear: 'FY 2024',
    category: 'Barley',
    color: '#9bd14a',
    status: 'In Progress',
    areaAres: 96.5,
    fieldCount: 2,
    period: { from: '2024/11/01', to: '2025/06/10' },
  },
  {
    id: 'plan-9',
    crop: 'Cabbage 2024',
    fiscalYear: 'FY 2024',
    category: 'Vegetable',
    color: '#2ce06b',
    status: 'In Progress',
    areaAres: 58.2,
    fieldCount: 3,
    period: { from: '2024/08/01', to: '2024/12/20' },
  },
  {
    id: 'plan-10',
    crop: 'Green Manure 2024',
    fiscalYear: 'FY 2024',
    category: 'Other',
    color: '#7a8590',
    status: 'In Progress',
    areaAres: 141.7,
    fieldCount: 4,
    period: { from: '2024/04/01', to: '2024/09/30' },
  },
]

export const plantingPlanStatuses = ['In Progress', 'Planned', 'Done'] as const
export const plantingPlanYears = ['2026', '2025', '2024'] as const
