/**
 * Districts offered by the field search screen. Mirrors the list in the design;
 * the two Mishima entries are the ones `farms` actually has fields in.
 */
export const districts = [
  'Mishima (A)',
  'Mishima (B)',
  'Izunokuni',
  'Hakone',
  'Fujinomiya',
  'Numazu',
  'Gotemba',
] as const

export type District = (typeof districts)[number]
