import { useState } from 'react'

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
import { QuotePreviewCard } from '../features/transfers/QuotePreviewCard'
import { TransferDraftForm } from '../features/transfers/TransferDraftForm'
import { ShellCard } from '../shell/ShellCard'

const TRANSFERS_TITLE = 'Переводы'

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

export function TransfersPage() {
  const route = getTransfersRoute()
  const [selectedModeId, setSelectedModeId] = useState<DemoTransferModeId>(
    transferModes[0].id,
  )
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<
    DemoFavoriteRecipient['id'] | null
  >(null)
  const [recipientIdentifier, setRecipientIdentifier] = useState('')
  const [debitAmount, setDebitAmount] = useState('')
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
    <section className="flex flex-col gap-8 pb-6">
      <ShellCard className="border-[rgba(15,108,189,0.18)] bg-[rgba(15,108,189,0.08)] p-8 shadow-[var(--shadow-card)]">
        <p className="text-sm font-semibold leading-6 text-[var(--color-accent)]">
          {PHASE_BOUNDARY_COPY}
        </p>
      </ShellCard>

      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          {route.pageTitle}
        </h1>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {route.supportingCopy}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)]">
        <TransferDraftForm
          debitAmount={debitAmount}
          onDebitAmountChange={setDebitAmount}
          onFavoriteSelect={handleFavoriteSelect}
          onModeChange={handleModeChange}
          onRecipientIdentifierChange={setRecipientIdentifier}
          recipientIdentifier={recipientIdentifier}
          selectedFavoriteId={selectedFavoriteId}
          selectedModeId={selectedModeId}
          validation={validation}
        />

        <QuotePreviewCard
          canConfirm={validation.isValid}
          quote={quote}
          recipientIdentifier={recipientIdentifier}
          validation={validation}
        />
      </div>
    </section>
  )
}
