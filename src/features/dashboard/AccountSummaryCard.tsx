import { Link } from 'react-router'

import { accountSummary, formatAmountWithCurrency } from '../../demo'
import { ShellCard } from '../../shell/ShellCard'

const TRANSFER_CTA_LABEL = 'Перейти к переводу'
const EXPECTED_OWNER_NAME = 'Дагмара'
const EXPECTED_ACCOUNT_NUMBER = '4756 •••• •••• 9018'
const EXPECTED_BALANCE_LABEL = '3 469.52 ЦР'

export function AccountSummaryCard() {
  const balanceLabel = formatAmountWithCurrency(
    accountSummary.balanceAmount,
    accountSummary.currencyLabel,
  )

  if (
    accountSummary.ownerName !== EXPECTED_OWNER_NAME ||
    accountSummary.maskedAccountNumber !== EXPECTED_ACCOUNT_NUMBER ||
    balanceLabel !== EXPECTED_BALANCE_LABEL
  ) {
    throw new Error('Dashboard account summary seed drifted from the Phase 2 contract.')
  }

  return (
    <ShellCard className="gap-6 border-[rgba(15,108,189,0.16)] bg-[color-mix(in_srgb,var(--color-surface)_92%,rgba(15,108,189,0.08))] p-8 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
          Цифровой счет
        </p>
        <h2 className="text-[28px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          {accountSummary.ownerName}
        </h2>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {accountSummary.maskedAccountNumber}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-6 text-[var(--color-text-muted)]">
          Доступный баланс для демонстрационного маршрута Россия → Китай
        </p>
        <p className="text-[36px] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-accent)]">
          {balanceLabel}
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-[var(--color-border-soft)] pt-6">
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Баланс и реквизиты зафиксированы на клиенте для дипломного MVP без
          backend-подключений и live-обновления данных.
        </p>
        <div>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-[#0B5A9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            to="/transfers"
          >
            {TRANSFER_CTA_LABEL}
          </Link>
        </div>
      </div>
    </ShellCard>
  )
}
