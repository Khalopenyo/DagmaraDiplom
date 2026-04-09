import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

import {
  buildTransferReceipt,
  buildTransferQuote,
  cbdcRates,
  favoriteRecipients,
  transferModes,
  validateTransferDraft,
  type DemoCountryBadgeToken,
  type DemoFavoriteRecipient,
  type DemoTransferModeId,
} from '../demo'
import { useAuth } from '../features/auth'
import { PHASE_BOUNDARY_COPY } from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'
import { useLiveCbdcRates } from '../features/rates/useLiveCbdcRates'
import { TransferDraftForm } from '../features/transfers/TransferDraftForm'
import { saveTransferReceipt } from '../features/transfers/transferReceiptStorage'

const TRANSFERS_TITLE = 'Переводы'
const TRANSFERS_HEADING = 'Трансграничный перевод'
const DEFAULT_TRANSFER_TARGET_BADGE_TOKEN: DemoCountryBadgeToken = 'china'

function getTransfersRoute() {
  const route = getTopLevelRoute('/transfers')

  if (!route || route.pageTitle !== TRANSFERS_TITLE) {
    throw new Error('Transfers route metadata is misconfigured.')
  }

  return route
}

function getFavoriteIdentifier(
  favoriteId: DemoFavoriteRecipient['id'],
  modeId: DemoTransferModeId,
) {
  const favorite = favoriteRecipients.find((candidate) => candidate.id === favoriteId)

  if (!favorite) {
    return ''
  }

  return modeId === 'card' ? favorite.cardValue : favorite.phoneValue
}

function parseDebitAmount(value: string) {
  const normalizedValue = value.replace(/\s+/g, '').replace(',', '.')

  if (normalizedValue.length === 0) {
    return Number.NaN
  }

  const parsedValue = Number(normalizedValue)

  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN
}

function getSeededDebitAmount(searchParams: URLSearchParams) {
  const amountParam = searchParams.get('amount')

  if (!amountParam) {
    return ''
  }

  const parsedAmount = parseDebitAmount(amountParam)

  return Number.isFinite(parsedAmount) && parsedAmount > 0 ? amountParam : ''
}

function isDemoCountryBadgeToken(value: string | null): value is DemoCountryBadgeToken {
  return cbdcRates.some((rate) => rate.badgeToken === value)
}

function getSeededTargetBadgeToken(searchParams: URLSearchParams): DemoCountryBadgeToken {
  const currencyParam = searchParams.get('currency')

  return isDemoCountryBadgeToken(currencyParam)
    ? currencyParam
    : DEFAULT_TRANSFER_TARGET_BADGE_TOKEN
}

export function TransfersPage() {
  getTransfersRoute()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const { rates } = useLiveCbdcRates()
  const [selectedModeId, setSelectedModeId] = useState<DemoTransferModeId>(
    transferModes[0].id,
  )
  const [selectedTargetBadgeToken, setSelectedTargetBadgeToken] =
    useState<DemoCountryBadgeToken>(() => getSeededTargetBadgeToken(searchParams))
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<
    DemoFavoriteRecipient['id'] | null
  >(null)
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [debitAmount, setDebitAmount] = useState(() =>
    getSeededDebitAmount(searchParams),
  )
  const processingTimeoutId = useRef<number | null>(null)
  const selectedTargetRate = rates.find(
    (rate) => rate.badgeToken === selectedTargetBadgeToken,
  ) ?? rates.find(
    (rate) => rate.badgeToken === DEFAULT_TRANSFER_TARGET_BADGE_TOKEN,
  ) ?? rates[0]
  const parsedDebitAmount = parseDebitAmount(debitAmount)
  const validation = validateTransferDraft({
    mode: selectedModeId,
    recipientIdentifier,
    debitAmount: parsedDebitAmount,
  })
  const quote = buildTransferQuote(
    Number.isFinite(parsedDebitAmount) ? parsedDebitAmount : 0,
    selectedTargetRate,
  )

  useEffect(() => {
    setDebitAmount(getSeededDebitAmount(searchParams))
    setSelectedTargetBadgeToken(getSeededTargetBadgeToken(searchParams))
  }, [searchParams])

  useEffect(() => {
    return () => {
      if (processingTimeoutId.current !== null) {
        window.clearTimeout(processingTimeoutId.current)
      }
    }
  }, [])

  function handleModeChange(nextModeId: DemoTransferModeId) {
    setSelectedModeId(nextModeId)

    if (selectedFavoriteId) {
      setRecipientIdentifier(getFavoriteIdentifier(selectedFavoriteId, nextModeId))
    }
  }

  function handleFavoriteSelect(favoriteId: DemoFavoriteRecipient['id']) {
    setSelectedFavoriteId(favoriteId)
    setRecipientIdentifier(getFavoriteIdentifier(favoriteId, selectedModeId))
  }

  function handleConfirm() {
    if (!validation.isValid || isProcessing || !user) {
      return
    }

    const selectedFavorite = selectedFavoriteId
      ? favoriteRecipients.find((favorite) => favorite.id === selectedFavoriteId) ?? null
      : null

    saveTransferReceipt(
      buildTransferReceipt({
        senderName: user.fullName,
        recipientIdentifier,
        selectedFavorite,
        mode: selectedModeId,
        quote,
      }),
    )

    setIsProcessing(true)
    processingTimeoutId.current = window.setTimeout(() => {
      void navigate('/transfers/receipt')
    }, 2000)
  }

  return (
    <section className="flex w-full flex-col gap-5 pb-6">
      <p className="sr-only">{PHASE_BOUNDARY_COPY}</p>

      <div className="flex items-center gap-3">
        <Link
          aria-label="Назад на главную"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none text-[var(--color-text-strong)] transition-colors duration-150 hover:bg-[rgba(66,54,198,0.08)]"
          to="/dashboard"
        >
          <span aria-hidden="true">‹</span>
        </Link>

        <h1 className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-[var(--color-text-strong)]">
          {TRANSFERS_HEADING}
        </h1>
      </div>

      <TransferDraftForm
        availableCurrencies={rates}
        canConfirm={validation.isValid}
        debitAmount={debitAmount}
        isProcessing={isProcessing}
        onDebitAmountChange={setDebitAmount}
        onFavoriteSelect={handleFavoriteSelect}
        onConfirm={handleConfirm}
        onModeChange={handleModeChange}
        onRecipientIdentifierChange={setRecipientIdentifier}
        onTargetCurrencyChange={setSelectedTargetBadgeToken}
        quote={quote}
        recipientIdentifier={recipientIdentifier}
        selectedFavoriteId={selectedFavoriteId}
        selectedModeId={selectedModeId}
        selectedTargetRate={selectedTargetRate}
        validation={validation}
      />
    </section>
  )
}
