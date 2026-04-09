import { Link } from 'react-router'

import { accountSummary, formatAmountWithCurrency } from '../../demo'
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
    <section className="relative px-3 pb-6 pt-1 sm:px-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 bottom-4 h-4 rounded-full bg-[#ef4d7a]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 bottom-1 h-4 rounded-full bg-[#6d5cff]"
      />

      <article className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#231d73_0%,#365ee5_62%,#4a81ff_100%)] px-6 py-6 text-white shadow-[0_26px_40px_rgba(35,29,115,0.28)] sm:px-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-18%] top-0 h-full w-[74%] rounded-r-[120px] bg-[#2a227f]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-9%] top-[-26%] h-40 w-40 rounded-full bg-[rgba(147,202,255,0.42)] sm:h-48 sm:w-48"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[20%] top-[-12%] h-14 w-14 rounded-full bg-[rgba(255,255,255,0.1)] blur-xl"
        />

        <div className="relative flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/74">
              Цифровой счет
            </p>
            <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.04em]">
              <span>{accountSummary.ownerName}</span>
              <span className="text-white/78"> A</span>
            </h2>
            <p className="text-lg tracking-[0.02em] text-white/84">
              {accountSummary.maskedAccountNumber}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ff728b] bg-[rgba(255,255,255,0.08)] text-[24px] font-semibold text-[#ff728b]">
                ₽
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm leading-6 text-white/72">
                  Баланс для маршрута Россия → Китай
                </p>
                <p className="text-[36px] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
                  {balanceLabel}
                </p>
              </div>
            </div>

            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-[18px] bg-[rgba(255,255,255,0.16)] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-[rgba(255,255,255,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              to="/transfers"
            >
              {TRANSFER_CTA_LABEL}
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}
