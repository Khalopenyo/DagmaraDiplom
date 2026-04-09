import type { DemoTransferMode, DemoTransferModeId } from '../../demo'

interface TransferTypeSelectorProps {
  modes: readonly DemoTransferMode[]
  activeModeId: DemoTransferModeId
  onChange: (modeId: DemoTransferModeId) => void
}

function CardTransferIcon({ active }: { active: boolean }) {
  const iconColor = active ? '#FFFFFF' : '#A0A8C1'

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <rect fill={iconColor} height="18" rx="3.5" width="22" x="3" y="5" />
      <rect fill={active ? '#3E38C7' : '#F2F4FB'} height="2.8" rx="1.4" width="22" x="3" y="10" />
      <rect fill={active ? '#3E38C7' : '#F2F4FB'} height="3.4" rx="1.7" width="7.2" x="7" y="15.5" />
      <rect fill={active ? '#3E38C7' : '#F2F4FB'} height="3.4" rx="1.7" width="5.2" x="16" y="15.5" />
    </svg>
  )
}

function PhoneTransferIcon({ active }: { active: boolean }) {
  const iconColor = active ? '#FFFFFF' : '#A0A8C1'

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="9" fill={iconColor} r="4.5" />
      <path
        d="M7.5 22.5c0-3.8 3.1-6.9 6.9-6.9h0.2c3.8 0 6.9 3.1 6.9 6.9v0.7H7.5v-0.7Z"
        fill={iconColor}
      />
    </svg>
  )
}

function getDisplayLabel(modeId: DemoTransferModeId) {
  return modeId === 'card'
    ? 'Перевести по номеру карты'
    : 'Перевести по номеру телефона'
}

export function TransferTypeSelector({
  modes,
  activeModeId,
  onChange,
}: TransferTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-6 text-[rgba(73,78,101,0.78)]">
        Выберите способ перевода
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {modes.map((mode) => {
          const isActive = mode.id === activeModeId

          return (
            <button
              key={mode.id}
              aria-label={mode.label}
              aria-pressed={isActive}
              className={`flex min-h-[126px] flex-col items-start justify-between rounded-[20px] border px-5 py-5 text-left transition-all duration-150 ease-out ${
                isActive
                  ? 'border-[#3E38C7] bg-[#3E38C7] text-white shadow-[0_18px_32px_rgba(62,56,199,0.22)]'
                  : 'border-[rgba(24,38,58,0.08)] bg-[rgba(243,244,248,0.98)] text-[rgba(73,78,101,0.86)] hover:border-[rgba(62,56,199,0.22)]'
              }`}
              onClick={() => onChange(mode.id)}
              type="button"
            >
              <span className="h-8 w-8">
                {mode.id === 'card' ? (
                  <CardTransferIcon active={isActive} />
                ) : (
                  <PhoneTransferIcon active={isActive} />
                )}
              </span>
              <span className="max-w-[11rem] text-[20px] font-semibold leading-[1.15] tracking-[-0.03em]">
                {getDisplayLabel(mode.id)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
