import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ScreenHeader } from '@/components/ksas/controls'
import { ChevronIcon } from '@/components/ksas/icons'
import {
  instructionForm,
  instructionModes,
  type InstructionField,
  type InstructionMode,
} from '@/data/instructionForm'

function FormRow({ field }: { field: InstructionField }) {
  return (
    <button
      type="button"
      className="flex h-[8.125rem] w-full cursor-pointer items-center justify-between gap-[1.25rem] rounded-[0.875rem] border border-[#3d3d42] bg-[#292a2b] pr-[1.5rem] pl-[1.625rem]"
    >
      <span className="text-[2.25rem] font-semibold whitespace-nowrap text-white">
        {field.label}
      </span>
      <span className="flex min-w-0 items-center gap-[0.875rem]">
        <span
          className={`truncate text-[2rem] font-medium ${
            field.unset ? 'text-[#9ea8b2]' : 'text-[#f2f5f7]'
          }`}
        >
          {field.value}
        </span>
        <ChevronIcon className="size-[3rem] shrink-0 text-[#e3e3e3]" />
      </span>
    </button>
  )
}

export function InstructionPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<InstructionMode>('Instruction')

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#101012] leading-[normal]">
      <ScreenHeader
        title="Instruction & Log"
        onBack={() => void navigate({ to: '/ksas/logs' })}
      />

      <div className="flex min-h-0 flex-1 px-[3rem] py-[2.5rem]">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="ksas-scroll flex min-h-0 w-full flex-col overflow-y-auto rounded-[1.25rem] border border-[#333338] bg-[#1c1c1c] px-[2.5rem] py-[2.25rem]"
        >
          <div className="flex w-fit shrink-0 items-center rounded-[0.875rem] border border-[#3d3d42] bg-[#262629]">
            {instructionModes.map((name) => {
              const active = name === mode
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMode(name)}
                  className={`cursor-pointer rounded-[0.875rem] px-[2.75rem] py-[1rem] text-[2.125rem] font-semibold whitespace-nowrap ${
                    active ? 'bg-[#2ce06b] text-[#0d170f]' : 'text-[#9ea8b2]'
                  }`}
                >
                  {name}
                </button>
              )
            })}
          </div>

          <div className="mt-[1.625rem] flex shrink-0 gap-[1.5rem]">
            {[instructionForm.left, instructionForm.right].map(
              (column, index) => (
                <div
                  key={index === 0 ? 'left' : 'right'}
                  className="flex min-w-0 flex-1 flex-col gap-[1rem]"
                >
                  {column.map((field) => (
                    <FormRow key={field.label} field={field} />
                  ))}
                </div>
              ),
            )}
          </div>

          <button
            type="submit"
            className="mt-[1.625rem] shrink-0 cursor-pointer rounded-[1.125rem] bg-[#2ce06b] py-[1.75rem] text-[2.125rem] font-bold text-[#0d170f]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
