import { PHASE_BOUNDARY_COPY } from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'
import { AccountSummaryCard } from '../features/dashboard/AccountSummaryCard'
import { ShellCard } from '../shell/ShellCard'

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

      <AccountSummaryCard />
    </section>
  )
}
