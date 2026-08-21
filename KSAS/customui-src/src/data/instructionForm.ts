export const instructionModes = ['Instruction', 'Log'] as const

export type InstructionMode = (typeof instructionModes)[number]

export type InstructionField = {
  label: string
  value: string
  /** Rendered muted, for fields the operator has not filled in yet. */
  unset?: boolean
}

/**
 * The Instruction & Log form as the design specifies it. Every row opens its own
 * picker in the real app; none of those pickers are designed yet.
 */
export const instructionForm: {
  left: InstructionField[]
  right: InstructionField[]
} = {
  left: [
    { label: 'Field', value: 'Mishima 001' },
    { label: 'Work Item', value: 'Rice Planting' },
    { label: 'Cropping Plan', value: 'Akita Komachi 2025' },
    { label: 'Worker', value: 'Taro Kubota' },
  ],
  right: [
    { label: 'Date', value: '2025-01-12' },
    { label: 'Machine', value: 'Kubota Tractor' },
    { label: 'Implement', value: '6-row Transplanter' },
    { label: 'Pesticide', value: 'Not set', unset: true },
  ],
}
