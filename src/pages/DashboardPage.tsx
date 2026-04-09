import { PHASE_BOUNDARY_COPY } from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'
import { AccountSummaryCard } from '../features/dashboard/AccountSummaryCard'
import { QuickActionsGrid } from '../features/dashboard/QuickActionsGrid'
const DASHBOARD_TITLE = 'Демонстрационный маршрут Россия → Китай'

function getDashboardRoute() {
  const route = getTopLevelRoute('/dashboard')

  if (!route || route.pageTitle !== DASHBOARD_TITLE) {
    throw new Error('Dashboard route metadata is misconfigured.')
  }

  return route
}

export function DashboardPage() {
  const route = getDashboardRoute()

  return (
    <section className="flex flex-col gap-6 pb-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex min-h-9 items-center rounded-full bg-[#1f1d63] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Главная
          </span>
          <p className="max-w-[48ch] text-sm leading-6 text-[var(--color-text-muted)]">
            {PHASE_BOUNDARY_COPY}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]">
            {route.pageTitle}
          </h1>
          <p className="max-w-[54ch] text-sm leading-6 text-[var(--color-text-muted)]">
            Desktop-версия сохраняет ритм мобильного экрана: одна hero-карта и
            компактная сетка быстрых действий без лишних шагов.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[40px] border border-[rgba(63,107,255,0.22)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,247,252,0.96)_100%)] px-5 py-6 shadow-[0_28px_60px_rgba(30,44,87,0.12)] sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(112,168,255,0.18),transparent_46%),radial-gradient(circle_at_top_right,rgba(83,77,201,0.08),transparent_35%)]"
        />

        <div className="relative flex flex-col gap-7">
          <AccountSummaryCard />
          <QuickActionsGrid />
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-[24px] border border-[rgba(31,29,99,0.08)] bg-[rgba(255,255,255,0.72)] px-5 py-4">
        <p className="text-sm font-semibold text-[#1f1d63]">Главная как хаб</p>
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          {route.supportingCopy}
        </p>
      </div>
    </section>
  )
}
