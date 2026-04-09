import {
  transferModes,
  transferSourceAccounts,
  type DemoFavoriteRecipient,
  type DemoTransferDraftValidationResult,
  type DemoTransferModeId,
} from '../../demo'
import { ShellCard } from '../../shell/ShellCard'
import { FavoriteRecipientsStrip } from './FavoriteRecipientsStrip'
import { TransferTypeSelector } from './TransferTypeSelector'

interface TransferDraftFormProps {
  debitAmount: string
  identifierError?: string | null
  amountError?: string | null
  onDebitAmountChange: (value: string) => void
  onFavoriteSelect: (favoriteId: DemoFavoriteRecipient['id']) => void
  onModeChange: (modeId: DemoTransferModeId) => void
  onRecipientIdentifierChange: (value: string) => void
  recipientIdentifier: string
  selectedFavoriteId: DemoFavoriteRecipient['id'] | null
  selectedModeId: DemoTransferModeId
  validation?: DemoTransferDraftValidationResult
}

const SOURCE_ACCOUNT = transferSourceAccounts[0]

function ValidationHint({ message }: { message: string }) {
  return (
    <p className="text-sm leading-6 text-[var(--color-danger)]">{message}</p>
  )
}

export function TransferDraftForm({
  debitAmount,
  identifierError,
  amountError,
  onDebitAmountChange,
  onFavoriteSelect,
  onModeChange,
  onRecipientIdentifierChange,
  recipientIdentifier,
  selectedFavoriteId,
  selectedModeId,
  validation,
}: TransferDraftFormProps) {
  const selectedMode =
    transferModes.find((mode) => mode.id === selectedModeId) ?? transferModes[0]

  if (!SOURCE_ACCOUNT) {
    throw new Error('Transfer source account seed is missing.')
  }

  return (
    <ShellCard className="gap-6 p-8 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Черновик перевода
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
          Сценарий Россия → Китай
        </h2>
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Заполните реквизиты и сумму списания, чтобы проверить simulated quote
          по фиксированному corridor без серверных вызовов.
        </p>
      </div>

      <section
        aria-label="Счет списания"
        className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border-soft)] bg-[color-mix(in_srgb,var(--color-surface)_92%,rgba(15,108,189,0.08))] p-5"
      >
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold leading-6 text-[var(--color-text-strong)]">
            Счет списания
          </p>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            Единственный executable account для MVP демонстрации.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-[18px] border border-[rgba(15,108,189,0.14)] bg-[var(--color-surface)] p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-[var(--color-text-strong)]">
                {SOURCE_ACCOUNT.ownerName}
              </p>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                {SOURCE_ACCOUNT.maskedAccountNumber}
              </p>
            </div>
            <span className="rounded-full bg-[rgba(15,108,189,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              Цифровой рубль
            </span>
          </div>

          <div className="flex flex-col gap-1 border-t border-[var(--color-border-soft)] pt-4">
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Доступный остаток
            </p>
            <p className="text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--color-accent)]">
              {SOURCE_ACCOUNT.availableBalanceLabel}
            </p>
          </div>
        </div>
      </section>

      <TransferTypeSelector
        activeModeId={selectedMode.id}
        modes={transferModes}
        onChange={onModeChange}
      />

      <FavoriteRecipientsStrip
        onSelect={onFavoriteSelect}
        selectedFavoriteId={selectedFavoriteId}
      />

      <div className="grid gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold leading-6 text-[var(--color-text-strong)]">
            {selectedMode.inputLabel}
          </span>
          <input
            className="min-h-12 rounded-[16px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-colors duration-150 ease-out placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
            inputMode={selectedMode.id === 'phone' ? 'tel' : 'numeric'}
            onChange={(event) => onRecipientIdentifierChange(event.target.value)}
            placeholder={selectedMode.placeholder}
            type="text"
            value={recipientIdentifier}
          />
        </label>

        {identifierError ? <ValidationHint message={identifierError} /> : null}

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold leading-6 text-[var(--color-text-strong)]">
            Сумма списания
          </span>
          <input
            className="min-h-12 rounded-[16px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-colors duration-150 ease-out placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
            inputMode="decimal"
            onChange={(event) => onDebitAmountChange(event.target.value)}
            placeholder="100"
            type="text"
            value={debitAmount}
          />
        </label>

        {amountError ? <ValidationHint message={amountError} /> : null}

        {validation && !validation.isValid && !identifierError && !amountError ? (
          <ValidationHint message="Проверьте реквизиты и сумму перед подтверждением." />
        ) : null}
      </div>
    </ShellCard>
  )
}
