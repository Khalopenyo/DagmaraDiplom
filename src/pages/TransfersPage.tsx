import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import {
  buildTransferQuote,
  favoriteRecipients,
  transferModes,
  validateTransferDraft,
  type DemoFavoriteRecipient,
  type DemoTransferModeId,
} from '../demo'
import { PHASE_BOUNDARY_COPY } from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'
import { TransferDraftForm } from '../features/transfers/TransferDraftForm'

const TRANSFERS_TITLE = 'Переводы'
const TRANSFERS_HEADING = 'Трансграничный перевод'

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

export function TransfersPage() {
  getTransfersRoute()
  const [searchParams] = useSearchParams()
  const [selectedModeId, setSelectedModeId] = useState<DemoTransferModeId>(
    transferModes[0].id,
  )
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<
    DemoFavoriteRecipient['id'] | null
  >(null)
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [debitAmount, setDebitAmount] = useState(() =>
    getSeededDebitAmount(searchParams),
  )
  const parsedDebitAmount = parseDebitAmount(debitAmount)
  const validation = validateTransferDraft({
    mode: selectedModeId,
    recipientIdentifier,
    debitAmount: parsedDebitAmount,
  })
  const quote = buildTransferQuote(
    Number.isFinite(parsedDebitAmount) ? parsedDebitAmount : 0,
  )

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

  return (
    <section className="mx-auto flex w-full max-w-[780px] flex-col gap-5 pb-6">
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
        canConfirm={validation.isValid}
        debitAmount={debitAmount}
        onDebitAmountChange={setDebitAmount}
        onFavoriteSelect={handleFavoriteSelect}
        onModeChange={handleModeChange}
        onRecipientIdentifierChange={setRecipientIdentifier}
        quote={quote}
        recipientIdentifier={recipientIdentifier}
        selectedFavoriteId={selectedFavoriteId}
        selectedModeId={selectedModeId}
        validation={validation}
      />
    </section>
  )
}
