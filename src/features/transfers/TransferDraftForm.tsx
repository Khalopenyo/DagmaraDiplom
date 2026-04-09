import {
  LOCKED_TRANSFER_RATE_LABEL,
  transferModes,
  transferSourceAccounts,
  type DemoFavoriteRecipient,
  type DemoTransferDraftValidationResult,
  type DemoTransferModeId,
  type DemoTransferQuote,
} from '../../demo'
import { FavoriteRecipientsStrip } from './FavoriteRecipientsStrip'
import { TransferTypeSelector } from './TransferTypeSelector'

interface TransferDraftFormProps {
  canConfirm: boolean
  debitAmount: string
  identifierError?: string | null
  amountError?: string | null
  onDebitAmountChange: (value: string) => void
  onFavoriteSelect: (favoriteId: DemoFavoriteRecipient['id']) => void
  onModeChange: (modeId: DemoTransferModeId) => void
  onRecipientIdentifierChange: (value: string) => void
  quote: DemoTransferQuote
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

function stripCurrencyMarker(value: string) {
  return value.replace(/[^\d.\s]/g, '').trim()
}

function CurrencyIcon({
  symbol,
  accentClassName,
}: {
  symbol: '¥' | '₽'
  accentClassName: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(24,38,58,0.18)] text-[22px] font-medium ${accentClassName}`}
    >
      {symbol}
    </span>
  )
}

export function TransferDraftForm({
  canConfirm,
  debitAmount,
  onDebitAmountChange,
  onFavoriteSelect,
  onModeChange,
  onRecipientIdentifierChange,
  quote,
  recipientIdentifier,
  selectedFavoriteId,
  selectedModeId,
  validation,
}: TransferDraftFormProps) {
  const selectedMode =
    transferModes.find((mode) => mode.id === selectedModeId) ?? transferModes[0]
  const identifierError = validation?.identifierError ?? null
  const amountError = validation?.amountError ?? null

  if (!SOURCE_ACCOUNT) {
    throw new Error('Transfer source account seed is missing.')
  }

  return (
    <section className="rounded-[32px] border border-[rgba(24,38,58,0.08)] bg-white px-5 py-6 shadow-[0_24px_48px_rgba(24,38,58,0.08)] sm:px-6 sm:py-7">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div
            aria-label="Счет списания"
            className="flex items-center justify-between rounded-[18px] border border-[rgba(24,38,58,0.12)] bg-white px-4 py-3 text-[22px] font-medium tracking-[0.02em] text-[var(--color-text-strong)] shadow-[0_12px_24px_rgba(24,38,58,0.04)]"
          >
            <span>{SOURCE_ACCOUNT.maskedAccountNumber}</span>
            <span aria-hidden="true" className="text-[18px] text-[rgba(73,78,101,0.5)]">
              ⌄
            </span>
          </div>

          <p className="text-sm font-semibold leading-6 text-[#3E38C7]">
            Остаток по счету: {SOURCE_ACCOUNT.availableBalanceLabel}
          </p>
        </div>

        <TransferTypeSelector
          activeModeId={selectedMode.id}
          modes={transferModes}
          onChange={onModeChange}
        />

        <FavoriteRecipientsStrip
          onSelect={onFavoriteSelect}
          selectedFavoriteId={selectedFavoriteId}
        />

        <div className="grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold leading-6 text-[rgba(73,78,101,0.78)]">
              {selectedMode.id === 'card' ? 'Номер счета' : selectedMode.inputLabel}
            </span>
            <input
              aria-label={selectedMode.id === 'card' ? 'Номер счета' : selectedMode.inputLabel}
              className="min-h-12 rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-colors duration-150 ease-out placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7]"
              inputMode={selectedMode.id === 'phone' ? 'tel' : 'numeric'}
              onChange={(event) => onRecipientIdentifierChange(event.target.value)}
              placeholder={selectedMode.placeholder}
              type="text"
              value={recipientIdentifier}
            />
          </label>

          {identifierError ? <ValidationHint message={identifierError} /> : null}

          <label className="flex items-center gap-3 rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3">
            <CurrencyIcon accentClassName="text-[rgba(92,72,57,0.9)]" symbol="¥" />
            <input
              aria-label="Сумма получения"
              className="min-h-10 flex-1 border-0 bg-transparent px-0 py-0 text-base text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
              placeholder="0"
              readOnly
              tabIndex={-1}
              type="text"
              value={stripCurrencyMarker(quote.recipientAmountDisplay)}
            />
          </label>

          <label className="flex items-center gap-3 rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3">
            <CurrencyIcon accentClassName="text-[rgba(92,72,57,0.9)]" symbol="₽" />
            <input
              aria-label="Сумма списания"
              className="min-h-10 flex-1 border-0 bg-transparent px-0 py-0 text-base text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
              inputMode="decimal"
              onChange={(event) => onDebitAmountChange(event.target.value)}
              placeholder="100"
              type="text"
              value={debitAmount}
            />
          </label>

          {amountError ? <ValidationHint message={amountError} /> : null}
        </div>

        <div className="grid gap-2 rounded-[18px] bg-[rgba(62,56,199,0.04)] px-4 py-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-[rgba(73,78,101,0.76)]">Курс</span>
            <span className="font-semibold text-[var(--color-text-strong)]">
              {quote.rateLabel || LOCKED_TRANSFER_RATE_LABEL}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-[rgba(73,78,101,0.76)]">Комиссия</span>
            <span className="font-semibold text-[var(--color-text-strong)]">
              {quote.feeAmountDisplay}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[var(--color-text-strong)]">Итого</span>
            <span className="text-base font-semibold text-[var(--color-text-strong)]">
              {quote.totalAmountDisplay}
            </span>
          </div>
        </div>

        <button
          className={`inline-flex min-h-[56px] items-center justify-center rounded-[18px] px-5 py-4 text-lg font-semibold transition-colors duration-150 ease-out ${
            canConfirm
              ? 'bg-[#3E38C7] text-white shadow-[0_18px_32px_rgba(62,56,199,0.24)] hover:bg-[#312cab]'
              : 'cursor-not-allowed bg-[rgba(62,56,199,0.18)] text-white/80'
          }`}
          disabled={!canConfirm}
          type="button"
        >
          Подтвердить
        </button>
      </div>
    </section>
  )
}
