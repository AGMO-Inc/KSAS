export type WorkBreakdownSegment = {
  label: string
  color: string
  areaAres: number
  fieldCount: number
}

/**
 * Work Progress summary. `progressPercent` is carried as its own value because
 * the design's 55 % is not derivable from the breakdown below.
 */
export const workProgress = {
  workItem: 'Tilling / Plowing',
  plantingPlan: 'All Planting Plans',
  workPeriod: 'All Periods',
  progressPercent: 55,
  breakdown: [
    { label: 'Completed', color: '#03e7bd', areaAres: 190, fieldCount: 5 },
    { label: 'Incomplete', color: '#fbbf24', areaAres: 927, fieldCount: 33 },
    { label: 'Instructed', color: '#ff5117', areaAres: 37, fieldCount: 1 },
    { label: 'In Progress', color: '#495156', areaAres: 60, fieldCount: 1 },
    { label: 'Suspended', color: '#3d9e4d', areaAres: 41, fieldCount: 1 },
  ] satisfies WorkBreakdownSegment[],
}
