import type { DemoTransferMode, DemoTransferModeId } from '../../demo'

interface TransferTypeSelectorProps {
  modes: readonly DemoTransferMode[]
  activeModeId: DemoTransferModeId
  onChange: (modeId: DemoTransferModeId) => void
}

export function TransferTypeSelector({
  modes,
  activeModeId,
  onChange,
}: TransferTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-6 text-[var(--color-text-strong)]">
        Тип перевода
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => {
          const isActive = mode.id === activeModeId

          return (
            <button
              key={mode.id}
              aria-pressed={isActive}
              className={`flex min-h-11 items-center justify-center rounded-[16px] border px-4 py-3 text-sm font-semibold transition-colors duration-150 ease-out ${
                isActive
                  ? 'border-[var(--color-accent)] bg-[rgba(15,108,189,0.12)] text-[var(--color-accent)]'
                  : 'border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[rgba(15,108,189,0.24)] hover:text-[var(--color-text-strong)]'
              }`}
              onClick={() => onChange(mode.id)}
              type="button"
            >
              {mode.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
