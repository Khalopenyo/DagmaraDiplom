import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router'

import { cbdcRates, formatRateValue, type DemoCountryBadgeToken } from '../demo'
import { ExchangeHeroIllustration } from '../features/exchange/ExchangeHeroIllustration'
import { CountryFlagBadge } from '../features/rates/flagBadges'

const DEFAULT_DEBIT_AMOUNT = '1000'
const BASE_CURRENCY_LABEL = 'ЦР'
const BASE_COUNTRY_LABEL = 'Россия'

type ExchangeSelectorSide = 'source' | 'recipient'

interface BaseCurrencyOption {
  badgeToken: 'russia'
  country: typeof BASE_COUNTRY_LABEL
  currencyLabel: typeof BASE_CURRENCY_LABEL
  primary: false
}

interface ForeignCurrencyOption {
  badgeToken: DemoCountryBadgeToken
  country: (typeof cbdcRates)[number]['country']
  currencyLabel: (typeof cbdcRates)[number]['targetCurrencyLabel']
  primary: boolean
}

type ExchangeCurrencyOption = BaseCurrencyOption | ForeignCurrencyOption

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

function buildExchangeSearch(amount: string, isReverseDirection: boolean) {
  const searchParams = new URLSearchParams()
  const normalizedAmount = sanitizeAmountInput(amount)

  if (normalizedAmount.length > 0) {
    searchParams.set('amount', normalizedAmount)
  }

  if (isReverseDirection) {
    searchParams.set('direction', 'reverse')
  }

  const search = searchParams.toString()

  return search.length > 0 ? `?${search}` : ''
}

function RubleBadge() {
  return (
    <span className="inline-flex h-[26px] w-[42px] items-center justify-center rounded-[4px] bg-[rgba(62,56,199,0.08)] text-[11px] font-semibold tracking-[0.08em] text-[#3E38C7] shadow-[0_0_0_1px_rgba(24,38,58,0.06)]">
      РФ
    </span>
  )
}

export function CurrencyExchangePage() {
  const { badgeToken } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedRate = cbdcRates.find(
    (rate) => rate.badgeToken === badgeToken,
  )
  const [debitAmount, setDebitAmount] = useState(DEFAULT_DEBIT_AMOUNT)
  const [isReverseDirection, setIsReverseDirection] = useState(false)
  const [openSelector, setOpenSelector] = useState<ExchangeSelectorSide | null>(null)

  if (!selectedRate) {
    return <Navigate replace to="/rates" />
  }

  const directionParam = searchParams.get('direction')
  const amountParam = searchParams.get('amount')

  useEffect(() => {
    const normalizedAmount = sanitizeAmountInput(amountParam ?? DEFAULT_DEBIT_AMOUNT)

    setDebitAmount(normalizedAmount.length > 0 ? normalizedAmount : DEFAULT_DEBIT_AMOUNT)
    setIsReverseDirection(directionParam === 'reverse')
    setOpenSelector(null)
  }, [amountParam, badgeToken, directionParam])

  const parsedDebitAmount = parseAmount(debitAmount)
  const sourceCurrencyLabel = isReverseDirection
    ? selectedRate.targetCurrencyLabel
    : BASE_CURRENCY_LABEL
  const recipientCurrencyLabel = isReverseDirection
    ? BASE_CURRENCY_LABEL
    : selectedRate.targetCurrencyLabel
  const recipientAmount = useMemo(() => {
    if (!Number.isFinite(parsedDebitAmount)) {
      return ''
    }

    const nextValue = isReverseDirection
      ? parsedDebitAmount / selectedRate.rateValue
      : parsedDebitAmount * selectedRate.rateValue

    return formatExchangeAmount(nextValue)
  }, [isReverseDirection, parsedDebitAmount, selectedRate.rateValue])
  const rateLabel = isReverseDirection
    ? `1 ${selectedRate.targetCurrencyLabel} = ${formatRateValue(1 / selectedRate.rateValue)} ${BASE_CURRENCY_LABEL}`
    : `1 ${BASE_CURRENCY_LABEL} = ${formatRateValue(selectedRate.rateValue)} ${selectedRate.targetCurrencyLabel}`
  const transferSeedAmount = isReverseDirection ? recipientAmount : debitAmount.trim()
  const transferPath =
    transferSeedAmount.length > 0
      ? `/transfers?amount=${encodeURIComponent(transferSeedAmount)}`
      : '/transfers'
  const currencyOptions: ExchangeCurrencyOption[] = [
    {
      badgeToken: 'russia',
      country: BASE_COUNTRY_LABEL,
      currencyLabel: BASE_CURRENCY_LABEL,
      primary: false,
    },
    ...cbdcRates.map((rate) => ({
      badgeToken: rate.badgeToken,
      country: rate.country,
      currencyLabel: rate.targetCurrencyLabel,
      primary: rate.corridor === 'primary',
    })),
  ]

  function handleSwapCurrencies() {
    setOpenSelector(null)

    if (recipientAmount.length > 0) {
      setDebitAmount(recipientAmount)
    }

    setIsReverseDirection((value) => !value)
  }

  function handleCurrencySelection(
    side: ExchangeSelectorSide,
    option: ExchangeCurrencyOption,
  ) {
    const nextIsReverseDirection = option.badgeToken === 'russia'
      ? side === 'recipient'
      : side === 'source'
    const nextBadgeToken = option.badgeToken === 'russia'
      ? selectedRate.badgeToken
      : option.badgeToken
    const isDirectionChanging = nextIsReverseDirection !== isReverseDirection
    const isRateChanging = nextBadgeToken !== selectedRate.badgeToken
    const nextAmount = isRateChanging && isDirectionChanging
      ? DEFAULT_DEBIT_AMOUNT
      : isDirectionChanging
        ? (recipientAmount.length > 0 ? recipientAmount : debitAmount)
        : debitAmount

    setOpenSelector(null)

    if (!isRateChanging) {
      setDebitAmount(nextAmount.length > 0 ? nextAmount : DEFAULT_DEBIT_AMOUNT)
      setIsReverseDirection(nextIsReverseDirection)
      return
    }

    navigate(
      `/rates/exchange/${nextBadgeToken}${buildExchangeSearch(
        nextAmount.length > 0 ? nextAmount : DEFAULT_DEBIT_AMOUNT,
        nextIsReverseDirection,
      )}`,
    )
  }

  function renderCurrencyMenu(side: ExchangeSelectorSide) {
    const activeCurrencyLabel = side === 'source'
      ? sourceCurrencyLabel
      : recipientCurrencyLabel

    return (
      <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-[min(320px,calc(100vw-3rem))] rounded-[24px] border border-[rgba(43,56,92,0.12)] bg-white p-2 shadow-[0_24px_48px_rgba(24,38,58,0.12)]">
        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[rgba(43,56,92,0.45)]">
          Все валюты
        </p>

        <div className="flex flex-col gap-1">
          {currencyOptions.map((option) => {
            const isActive = option.currencyLabel === activeCurrencyLabel
              && (
                option.badgeToken === 'russia'
                  || option.badgeToken === selectedRate.badgeToken
              )

            return (
              <button
                aria-label={`Выбрать валюту ${option.country} ${option.currencyLabel}`}
                className={`flex items-center gap-3 rounded-[18px] px-3 py-3 text-left transition-colors duration-150 ${
                  isActive
                    ? 'bg-[rgba(62,56,199,0.08)]'
                    : 'hover:bg-[rgba(43,56,92,0.04)]'
                }`}
                key={`${side}-${option.badgeToken}`}
                onClick={() => handleCurrencySelection(side, option)}
                type="button"
              >
                {option.badgeToken === 'russia' ? (
                  <RubleBadge />
                ) : (
                  <CountryFlagBadge
                    badgeToken={option.badgeToken}
                    primary={option.primary}
                  />
                )}

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[var(--color-text-strong)]">
                    {option.country}
                  </span>
                  <span className="block text-xs text-[rgba(43,56,92,0.52)]">
                    {option.currencyLabel}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

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
          <div className="flex items-center rounded-[18px] border border-[rgba(43,56,92,0.16)] bg-white px-4 py-3.5 shadow-[0_12px_24px_rgba(24,38,58,0.04)]">
            <input
              aria-label={`Сумма списания в ${sourceCurrencyLabel}`}
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
            <div className="relative shrink-0">
              <button
                aria-label={`Открыть список валют списания. Сейчас ${sourceCurrencyLabel}`}
                className="inline-flex items-center gap-2 text-[24px] font-medium text-[var(--color-text-strong)] transition-transform duration-150 hover:scale-[1.02]"
                onClick={() => setOpenSelector((value) => value === 'source' ? null : 'source')}
                type="button"
              >
                {sourceCurrencyLabel}
                <span aria-hidden="true" className="text-[18px] text-[rgba(43,56,92,0.45)]">
                  ⌄
                </span>
              </button>

              {openSelector === 'source' ? renderCurrencyMenu('source') : null}
            </div>
          </div>

          <button
            aria-label={`Поменять валюты местами: ${sourceCurrencyLabel} и ${recipientCurrencyLabel}`}
            className="flex items-center justify-center gap-7 rounded-[18px] py-1 text-[44px] leading-none transition-colors duration-150 hover:bg-[rgba(66,54,198,0.04)]"
            onClick={handleSwapCurrencies}
            type="button"
          >
            <span aria-hidden="true" className="text-[#3E38C7]">
              ↓
            </span>
            <span aria-hidden="true" className="text-[#FF5A72]">
              ↑
            </span>
          </button>

          <div className="flex items-center rounded-[18px] border border-[rgba(43,56,92,0.16)] bg-white px-4 py-3.5 shadow-[0_12px_24px_rgba(24,38,58,0.04)]">
            <input
              aria-label={`Сумма получения в ${recipientCurrencyLabel}`}
              className="min-w-0 flex-1 border-0 bg-transparent text-[28px] font-medium leading-none text-[var(--color-text-strong)] outline-none"
              readOnly
              tabIndex={-1}
              value={recipientAmount}
            />
            <span
              aria-hidden="true"
              className="mx-4 h-11 w-px shrink-0 bg-[rgba(43,56,92,0.12)]"
            />
            <div className="relative shrink-0">
              <button
                aria-label={`Открыть список валют получения. Сейчас ${recipientCurrencyLabel}`}
                className="inline-flex items-center gap-2 text-[24px] font-medium text-[var(--color-text-strong)] transition-transform duration-150 hover:scale-[1.02]"
                onClick={() => setOpenSelector((value) => value === 'recipient' ? null : 'recipient')}
                type="button"
              >
                {recipientCurrencyLabel}
                <span aria-hidden="true" className="text-[18px] text-[rgba(43,56,92,0.45)]">
                  ⌄
                </span>
              </button>

              {openSelector === 'recipient' ? renderCurrencyMenu('recipient') : null}
            </div>
          </div>

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
