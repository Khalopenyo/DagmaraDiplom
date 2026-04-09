import { useState } from 'react'

import {
  transferModes,
  transferSourceAccounts,
  type DemoCbdcRate,
  type DemoCountryBadgeToken,
  type DemoFavoriteRecipient,
  type DemoTransferDraftValidationResult,
  type DemoTransferModeId,
  type DemoTransferQuote,
} from '../../demo'
import { CountryFlagBadge } from '../rates/flagBadges'
import { FavoriteRecipientsStrip } from './FavoriteRecipientsStrip'
import { TransferTypeSelector } from './TransferTypeSelector'

interface TransferDraftFormProps {
  availableCurrencies: readonly DemoCbdcRate[]
  canConfirm: boolean
  debitAmount: string
  identifierError?: string | null
  amountError?: string | null
  onDebitAmountChange: (value: string) => void
  onFavoriteSelect: (favoriteId: DemoFavoriteRecipient['id']) => void
  onConfirm: () => void
  onModeChange: (modeId: DemoTransferModeId) => void
  onRecipientIdentifierChange: (value: string) => void
  onTargetCurrencyChange: (badgeToken: DemoCountryBadgeToken) => void
  quote: DemoTransferQuote
  recipientIdentifier: string
  selectedFavoriteId: DemoFavoriteRecipient['id'] | null
  selectedModeId: DemoTransferModeId
  selectedTargetRate: DemoCbdcRate
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
  symbol: string
  accentClassName: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-[rgba(24,38,58,0.18)] px-1 text-center ${
        symbol.length > 1 ? 'text-[14px] font-semibold' : 'text-[22px] font-medium'
      } ${accentClassName}`}
    >
      {symbol}
    </span>
  )
}

export function TransferDraftForm({
  availableCurrencies,
  canConfirm,
  debitAmount,
  onDebitAmountChange,
  onFavoriteSelect,
  onConfirm,
  onModeChange,
  onRecipientIdentifierChange,
  onTargetCurrencyChange,
  quote,
  recipientIdentifier,
  selectedFavoriteId,
  selectedModeId,
  selectedTargetRate,
  validation,
}: TransferDraftFormProps) {
  const selectedMode =
    transferModes.find((mode) => mode.id === selectedModeId) ?? transferModes[0]
  const identifierError = validation?.identifierError ?? null
  const amountError = validation?.amountError ?? null
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false)

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

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold leading-6 text-[rgba(73,78,101,0.78)]">
            Валюта получения
          </p>

          <div className="relative">
            <button
              aria-label={`Открыть список валют получения. Сейчас ${selectedTargetRate.country} ${selectedTargetRate.targetCurrencyLabel}`}
              className="flex w-full items-center gap-3 rounded-[18px] border border-[rgba(24,38,58,0.12)] bg-white px-4 py-3 text-left shadow-[0_12px_24px_rgba(24,38,58,0.04)] transition-colors duration-150 hover:border-[rgba(62,56,199,0.22)]"
              onClick={() => setIsCurrencyMenuOpen((value) => !value)}
              type="button"
            >
              <CountryFlagBadge
                badgeToken={selectedTargetRate.badgeToken}
                primary={selectedTargetRate.corridor === 'primary'}
              />

              <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-semibold text-[var(--color-text-strong)]">
                  {selectedTargetRate.country}
                </span>
                <span className="block text-sm text-[rgba(73,78,101,0.72)]">
                  {selectedTargetRate.targetCurrencyLabel}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-[18px] text-[rgba(73,78,101,0.5)]"
              >
                {isCurrencyMenuOpen ? '⌃' : '⌄'}
              </span>
            </button>

            {isCurrencyMenuOpen ? (
              <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-30 rounded-[22px] border border-[rgba(24,38,58,0.1)] bg-white p-2 shadow-[0_24px_48px_rgba(24,38,58,0.12)]">
                <div className="flex flex-col gap-1">
                  {availableCurrencies.map((currency) => {
                    const isActive = currency.badgeToken === selectedTargetRate.badgeToken

                    return (
                      <button
                        key={currency.badgeToken}
                        aria-label={`Выбрать валюту ${currency.country} ${currency.targetCurrencyLabel}`}
                        className={`flex items-center gap-3 rounded-[18px] px-3 py-3 text-left transition-colors duration-150 ${
                          isActive
                            ? 'bg-[rgba(62,56,199,0.08)]'
                            : 'hover:bg-[rgba(24,38,58,0.04)]'
                        }`}
                        onClick={() => {
                          setIsCurrencyMenuOpen(false)
                          onTargetCurrencyChange(currency.badgeToken)
                        }}
                        type="button"
                      >
                        <CountryFlagBadge
                          badgeToken={currency.badgeToken}
                          primary={currency.corridor === 'primary'}
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-[var(--color-text-strong)]">
                            {currency.country}
                          </span>
                          <span className="block text-xs text-[rgba(73,78,101,0.6)]">
                            {currency.targetCurrencyLabel}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

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

          <label className="flex items-center gap-3 rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3">
            <CurrencyIcon
              accentClassName="text-[rgba(92,72,57,0.9)]"
              symbol={quote.recipientCurrencySymbol}
            />
            <input
              aria-label={`Сумма получения в ${quote.recipientCurrencyLabel}`}
              className="min-h-10 flex-1 border-0 bg-transparent px-0 py-0 text-base text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
              placeholder="0"
              readOnly
              tabIndex={-1}
              type="text"
              value={stripCurrencyMarker(quote.recipientAmountDisplay)}
            />
          </label>
        </div>

        <div className="grid gap-2 rounded-[18px] bg-[rgba(62,56,199,0.04)] px-4 py-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-[rgba(73,78,101,0.76)]">Курс</span>
            <span className="font-semibold text-[var(--color-text-strong)]">
              {quote.rateLabel}
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
          onClick={onConfirm}
          type="button"
        >
          Подтвердить
        </button>
      </div>
    </section>
  )
}
