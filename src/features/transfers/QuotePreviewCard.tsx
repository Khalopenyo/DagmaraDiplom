import type {
  DemoTransferDraftValidationResult,
  DemoTransferQuote,
} from '../../demo'
import { ShellCard } from '../../shell/ShellCard'

interface QuotePreviewCardProps {
  canConfirm: boolean
  quote: DemoTransferQuote
  recipientIdentifier: string
  validation: DemoTransferDraftValidationResult
}

const EMPTY_STATE_HEADING = 'Получатель не заполнен'
const EMPTY_STATE_BODY =
  'Выберите избранного получателя или вручную введите реквизиты, чтобы увидеть полный quote по corridor Россия → Китай.'
const ERROR_STATE_COPY =
  'Проверьте реквизиты и сумму: демо не продолжит сценарий, пока обязательные поля не заполнены и сумма не укладывается в доступный остаток.'

export function QuotePreviewCard({
  canConfirm,
  quote,
  recipientIdentifier,
  validation,
}: QuotePreviewCardProps) {
  const hasRecipient = recipientIdentifier.trim().length > 0

  return (
    <ShellCard className="gap-6 p-8 shadow-[var(--shadow-card)] xl:sticky xl:top-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[rgba(15,108,189,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
            Simulated corridor
          </span>
          <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-strong)]">
            Россия → Китай
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
            Quote preview
          </p>
          <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
            Сумма получения
          </h2>
        </div>

        <p className="text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] text-[var(--color-accent)]">
          {quote.recipientAmountDisplay}
        </p>

        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          {quote.rateLabel}
        </p>
      </div>

      {!hasRecipient ? (
        <div className="rounded-[20px] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] p-4">
          <h3 className="text-base font-semibold text-[var(--color-text-strong)]">
            {EMPTY_STATE_HEADING}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            {EMPTY_STATE_BODY}
          </p>
        </div>
      ) : null}

      <dl className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="font-medium text-[var(--color-text-muted)]">Курс</dt>
          <dd className="font-semibold text-[var(--color-text-strong)]">
            {quote.rateLabel}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="font-medium text-[var(--color-text-muted)]">
            Сумма списания
          </dt>
          <dd className="font-semibold text-[var(--color-text-strong)]">
            {quote.debitAmountDisplay}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="font-medium text-[var(--color-text-muted)]">
            Сумма получения
          </dt>
          <dd className="font-semibold text-[var(--color-text-strong)]">
            {quote.recipientAmountDisplay}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <dt className="font-medium text-[var(--color-text-muted)]">
            Комиссия платформы
          </dt>
          <dd className="font-semibold text-[var(--color-text-strong)]">
            {quote.feeAmountDisplay}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border-soft)] pt-4 text-sm">
          <dt className="font-semibold text-[var(--color-text-strong)]">Итого</dt>
          <dd className="text-lg font-semibold text-[var(--color-text-strong)]">
            {quote.totalAmountDisplay}
          </dd>
        </div>
      </dl>

      {!validation.isValid ? (
        <p className="text-sm leading-6 text-[var(--color-danger)]">
          {ERROR_STATE_COPY}
        </p>
      ) : (
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Кнопка «Подтвердить» в этой фазе завершает только проверку draft
          state. Phase 4 добавит processing и receipt.
        </p>
      )}

      <button
        className={`inline-flex min-h-11 items-center justify-center rounded-[16px] px-5 py-3 text-sm font-semibold transition-colors duration-150 ease-out ${
          canConfirm
            ? 'bg-[var(--color-accent)] text-white hover:bg-[#0B5A9F]'
            : 'cursor-not-allowed bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
        }`}
        disabled={!canConfirm}
        type="button"
      >
        Подтвердить
      </button>
    </ShellCard>
  )
}
