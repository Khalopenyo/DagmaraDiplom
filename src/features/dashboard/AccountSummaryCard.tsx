import { useState } from 'react'
import { Link } from 'react-router'

import { formatAmountWithCurrency } from '../../demo'
import { useAuth } from '../../features/auth'

const TRANSFER_CTA_LABEL = 'Перейти к переводу'

export function AccountSummaryCard() {
  const { user, topUpBalance } = useAuth()
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('1000')

  if (!user) {
    return null
  }

  const balanceLabel = formatAmountWithCurrency(
    user.balanceAmount,
    user.currencyLabel,
  )

  function handleTopUpSubmit(e: React.FormEvent) {
    e.preventDefault()
    const amount = parseFloat(topUpAmount.replace(',', '.'))
    if (!isNaN(amount) && amount > 0) {
      topUpBalance(amount)
      setIsTopUpOpen(false)
      setTopUpAmount('1000')
    }
  }

  return (
    <>
      <section className="relative px-3 pb-6 pt-1 sm:px-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 bottom-4 h-4 rounded-full bg-[#ef4d7a]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 bottom-1 h-4 rounded-full bg-[#6d5cff]"
        />

        <article
          className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#231d73_0%,#365ee5_62%,#4a81ff_100%)] px-6 py-6 text-white shadow-[0_26px_40px_rgba(35,29,115,0.28)] sm:px-7"
          id="dashboard-account-summary"
        >
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
              <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.04em]">
                {user.fullName}
              </h2>
              <p className="text-lg tracking-[0.02em] text-white/84">
                {user.maskedCardNumber}
              </p>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-[36px] font-semibold leading-[1.05] tracking-[-0.05em] text-white">
                    {balanceLabel}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-[18px] border border-[rgba(255,255,255,0.3)] bg-transparent px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-[rgba(255,255,255,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={() => setIsTopUpOpen(true)}
                  type="button"
                >
                  Пополнить
                </button>
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-[18px] bg-[rgba(255,255,255,0.16)] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-150 ease-out hover:bg-[rgba(255,255,255,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  to="/transfers"
                >
                  {TRANSFER_CTA_LABEL}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>

      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(24,38,58,0.4)] px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white text-left shadow-[0_32px_64px_rgba(24,38,58,0.16)]">
            <div className="p-6">
              <h3 className="text-xl font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text-strong)]">
                Пополнение баланса
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Введите сумму в цифровых рублях, которую хотите зачислить на ваш счет.
              </p>
              <form className="mt-6 flex flex-col gap-5" onSubmit={handleTopUpSubmit}>
                <div>
                  <label htmlFor="topUpAmount" className="mb-1.5 block text-sm font-semibold text-[rgba(73,78,101,0.78)]">
                    Сумма пополнения
                  </label>
                  <input
                    autoFocus
                    className="w-full rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7] focus:shadow-[0_0_0_3px_rgba(62,56,199,0.1)]"
                    id="topUpAmount"
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="1000"
                    type="number"
                    value={topUpAmount}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[16px] bg-[rgba(24,38,58,0.06)] px-4 py-3 text-sm font-semibold text-[var(--color-text-strong)] transition-colors duration-150 ease-out hover:bg-[rgba(24,38,58,0.1)]"
                    onClick={() => {
                      setIsTopUpOpen(false)
                      setTopUpAmount('1000')
                    }}
                    type="button"
                  >
                    Отмена
                  </button>
                  <button
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[16px] bg-[#3E38C7] px-4 py-3 text-sm font-semibold text-white transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#312cab] hover:shadow-[0_12px_24px_rgba(62,56,199,0.24)] active:translate-y-0"
                    type="submit"
                  >
                    Подтвердить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
