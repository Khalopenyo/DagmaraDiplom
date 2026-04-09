import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'

import { cbdcRates, formatRateValue } from '../demo'
import { ExchangeHeroIllustration } from '../features/exchange/ExchangeHeroIllustration'
import { CountryFlagBadge } from '../features/rates/flagBadges'

const DEFAULT_DEBIT_AMOUNT = '1000'

function sanitizeAmountInput(value: string) {
  const normalizedValue = value.replace(',', '.')
  let nextValue = ''
  let hasDecimalSeparator = false

  for (const character of normalizedValue) {
    if (/\d/.test(character)) {
      nextValue += character
      continue
    }

    if (character === '.' && !hasDecimalSeparator) {
      nextValue += character
      hasDecimalSeparator = true
    }
  }

  return nextValue
}

function parseAmount(value: string) {
  if (value.trim().length === 0) {
    return Number.NaN
  }

  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN
}

function formatExchangeAmount(value: number) {
  return value.toFixed(3).replace(/\.?0+$/, '')
}

export function CurrencyExchangePage() {
  const { badgeToken } = useParams()
  const selectedRate = cbdcRates.find(
    (rate) => rate.badgeToken === badgeToken,
  )
  const [debitAmount, setDebitAmount] = useState(DEFAULT_DEBIT_AMOUNT)

  if (!selectedRate) {
    return <Navigate replace to="/rates" />
  }

  const parsedDebitAmount = parseAmount(debitAmount)
  const recipientAmount = useMemo(() => {
    if (!Number.isFinite(parsedDebitAmount)) {
      return ''
    }

    return formatExchangeAmount(parsedDebitAmount * selectedRate.rateValue)
  }, [parsedDebitAmount, selectedRate.rateValue])
  const rateLabel = `1 ЦР = ${formatRateValue(selectedRate.rateValue)} ${selectedRate.targetCurrencyLabel}`
  const transferPath =
    debitAmount.trim().length > 0
      ? `/transfers?amount=${encodeURIComponent(debitAmount)}`
      : '/transfers'

  return (
    <section className="flex w-full flex-col gap-4 pb-4">
      <div className="flex items-start gap-3">
        <Link
          aria-label="Назад к курсам валют"
          className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none text-[var(--color-text-strong)] transition-colors duration-150 hover:bg-[rgba(66,54,198,0.08)]"
          to="/rates"
        >
          <span aria-hidden="true">‹</span>
        </Link>

        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-[var(--color-text-strong)]">
            Обмен
          </h1>

          <div className="flex items-center gap-3 self-start rounded-full bg-[rgba(66,54,198,0.06)] px-3 py-2">
            <CountryFlagBadge
              badgeToken={selectedRate.badgeToken}
              primary={selectedRate.corridor === 'primary'}
            />
            <span className="text-sm font-medium text-[var(--color-text-strong)]">
              {selectedRate.country}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-2 pt-0 pb-1 sm:px-6">
        <div className="w-full max-w-[700px]">
          <ExchangeHeroIllustration />
        </div>
      </div>

      <section className="-mt-2 w-full rounded-[34px] border-[3px] border-[#2F80ED] bg-white px-4 py-4 shadow-[0_24px_64px_rgba(47,128,237,0.12)] sm:-mt-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-5 rounded-[28px] bg-white">
          <label className="flex items-center rounded-[18px] border border-[rgba(43,56,92,0.16)] bg-white px-4 py-3.5 shadow-[0_12px_24px_rgba(24,38,58,0.04)]">
            <input
              aria-label="Сумма списания в ЦР"
              className="min-w-0 flex-1 border-0 bg-transparent text-[28px] font-medium leading-none text-[var(--color-text-strong)] outline-none placeholder:text-[rgba(43,56,92,0.36)]"
              inputMode="decimal"
              onChange={(event) => setDebitAmount(sanitizeAmountInput(event.target.value))}
              placeholder="0"
              value={debitAmount}
            />
            <span
              aria-hidden="true"
              className="mx-4 h-11 w-px shrink-0 bg-[rgba(43,56,92,0.12)]"
            />
            <span className="inline-flex items-center gap-2 text-[24px] font-medium text-[var(--color-text-strong)]">
              ЦР
              <span aria-hidden="true" className="text-[18px] text-[rgba(43,56,92,0.45)]">
                ⌄
              </span>
            </span>
          </label>

          <div className="flex items-center justify-center gap-7 text-[44px] leading-none">
            <span aria-hidden="true" className="text-[#3E38C7]">
              ↓
            </span>
            <span aria-hidden="true" className="text-[#FF5A72]">
              ↑
            </span>
          </div>

          <label className="flex items-center rounded-[18px] border border-[rgba(43,56,92,0.16)] bg-white px-4 py-3.5 shadow-[0_12px_24px_rgba(24,38,58,0.04)]">
            <input
              aria-label={`Сумма получения в ${selectedRate.targetCurrencyLabel}`}
              className="min-w-0 flex-1 border-0 bg-transparent text-[28px] font-medium leading-none text-[var(--color-text-strong)] outline-none"
              readOnly
              tabIndex={-1}
              value={recipientAmount}
            />
            <span
              aria-hidden="true"
              className="mx-4 h-11 w-px shrink-0 bg-[rgba(43,56,92,0.12)]"
            />
            <span className="inline-flex items-center gap-2 text-[24px] font-medium text-[var(--color-text-strong)]">
              {selectedRate.targetCurrencyLabel}
              <span aria-hidden="true" className="text-[18px] text-[rgba(43,56,92,0.45)]">
                ⌄
              </span>
            </span>
          </label>

          <div className="flex items-end justify-between gap-4 pt-2">
            <p className="text-sm font-semibold text-[#3E38C7] sm:text-[15px]">
              Валютный курс
            </p>
            <p className="text-right text-sm font-semibold text-[var(--color-text-strong)] sm:text-[15px]">
              {rateLabel}
            </p>
          </div>

          <Link
            className="inline-flex min-h-[58px] items-center justify-center rounded-[16px] bg-[#3E38C7] px-5 py-4 text-lg font-medium text-white shadow-[0_18px_32px_rgba(62,56,199,0.24)] transition-transform duration-150 hover:-translate-y-0.5"
            to={transferPath}
          >
            Перевести
          </Link>
        </div>
      </section>
    </section>
  )
}
