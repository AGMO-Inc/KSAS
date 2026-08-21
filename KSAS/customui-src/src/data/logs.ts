export const logTabs = ['Diary', 'Instructions'] as const

export type LogTab = (typeof logTabs)[number]

export type LogEntry = {
  id: string
  tab: LogTab
  /** Work-status colour, same palette as the Work Progress breakdown. */
  color: string
  field: string
  fiscalYear: string
  workItem: string
  period: { from: string; to: string }
}

const fullYear = { from: '2024/01/01', to: '2024/12/31' }

/**
 * The five diary rows the design shows, plus a few instruction rows so the
 * Instructions tab has content. Replace with the KSAS log API.
 */
export const logEntries: LogEntry[] = [
  {
    id: 'log-1',
    tab: 'Diary',
    color: '#f5a60d',
    field: 'Field 02 (55.08a)',
    fiscalYear: 'FY 2024',
    workItem: 'Harvest',
    period: fullYear,
  },
  {
    id: 'log-2',
    tab: 'Diary',
    color: '#ff5117',
    field: 'Field 02 (55.08a)',
    fiscalYear: 'FY 2024',
    workItem: 'Harvest',
    period: fullYear,
  },
  {
    id: 'log-3',
    tab: 'Diary',
    color: '#ff5117',
    field: 'Field 02 (55.08a)',
    fiscalYear: 'FY 2024',
    workItem: 'Harvest',
    period: fullYear,
  },
  {
    id: 'log-4',
    tab: 'Diary',
    color: '#03e7bd',
    field: 'Field 02 (55.08a)',
    fiscalYear: 'FY 2024',
    workItem: 'Harvest',
    period: fullYear,
  },
  {
    id: 'log-5',
    tab: 'Diary',
    color: '#f5a60d',
    field: 'Field 02 (55.08a)',
    fiscalYear: 'FY 2024',
    workItem: 'Harvest',
    period: fullYear,
  },
  {
    id: 'log-6',
    tab: 'Instructions',
    color: '#ff5117',
    field: 'Field 01 (36.46a)',
    fiscalYear: 'FY 2024',
    workItem: 'Rice Planting',
    period: { from: '2024/05/01', to: '2024/05/20' },
  },
  {
    id: 'log-7',
    tab: 'Instructions',
    color: '#495156',
    field: 'Field 03 (28.71a)',
    fiscalYear: 'FY 2024',
    workItem: 'Plowing',
    period: { from: '2024/04/10', to: '2024/04/25' },
  },
  {
    id: 'log-8',
    tab: 'Instructions',
    color: '#3d9e4d',
    field: 'Field 04 (45.88a)',
    fiscalYear: 'FY 2024',
    workItem: 'Fertilising',
    period: { from: '2024/06/01', to: '2024/06/12' },
  },
]

export const logSortOptions = ['Latest First', 'Oldest First'] as const
