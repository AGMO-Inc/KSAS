export const fieldBlocks = [
  'All',
  'Mishima(A)',
  'Shimotsuke (B)',
  'Komorino (C)',
  'Sukagawa Nishi (D)',
] as const

export type FieldBlock = (typeof fieldBlocks)[number]

export type LedgerField = {
  id: string
  name: string
  block: Exclude<FieldBlock, 'All'>
  number: string
  address: string
  areaAres: number
  color: string
}

/**
 * The four Mishima(A) rows the design shows, plus rows in the other blocks so
 * the block chips have something to filter. Replace with the KSAS field API.
 */
export const ledgerFields: LedgerField[] = [
  {
    id: 'ledger-1',
    name: 'Mishima 001',
    block: 'Mishima(A)',
    number: 'No.A001',
    address: '1-2-1 Mishima-cho',
    areaAres: 36.46,
    color: '#338cd9',
  },
  {
    id: 'ledger-2',
    name: 'Mishima 002',
    block: 'Mishima(A)',
    number: 'No.A002',
    address: '1-2-1 Mishima-cho',
    areaAres: 36.46,
    color: '#ff5117',
  },
  {
    id: 'ledger-3',
    name: 'Mishima 003',
    block: 'Mishima(A)',
    number: 'No.A003',
    address: '1-2-1 Mishima-cho',
    areaAres: 36.46,
    color: '#f5a60d',
  },
  {
    id: 'ledger-4',
    name: 'Mishima 004',
    block: 'Mishima(A)',
    number: 'No.A004',
    address: '1-2-1 Mishima-cho',
    areaAres: 36.46,
    color: '#338cd9',
  },
  {
    id: 'ledger-5',
    name: 'Shimotsuke 001',
    block: 'Shimotsuke (B)',
    number: 'No.B001',
    address: '3-4-2 Shimotsuke-shi',
    areaAres: 52.18,
    color: '#03e7bd',
  },
  {
    id: 'ledger-6',
    name: 'Shimotsuke 002',
    block: 'Shimotsuke (B)',
    number: 'No.B002',
    address: '3-4-8 Shimotsuke-shi',
    areaAres: 41.9,
    color: '#f5a60d',
  },
  {
    id: 'ledger-7',
    name: 'Komorino 001',
    block: 'Komorino (C)',
    number: 'No.C001',
    address: '5-1-1 Komorino',
    areaAres: 63.04,
    color: '#338cd9',
  },
  {
    id: 'ledger-8',
    name: 'Sukagawa Nishi 001',
    block: 'Sukagawa Nishi (D)',
    number: 'No.D001',
    address: '7-2-5 Sukagawa-shi',
    areaAres: 28.7,
    color: '#3d9e4d',
  },
]

export const fieldLedgerSortOptions = ['Newest', 'Oldest'] as const
