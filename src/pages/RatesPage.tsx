import { PHASE_BOUNDARY_COPY } from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'
import { RatesBoard } from '../features/rates/RatesBoard'

const RATES_TITLE = 'Обмен валют'

function getRatesRoute() {
  const route = getTopLevelRoute('/rates')

  if (!route || route.pageTitle !== RATES_TITLE) {
    throw new Error('Rates route metadata is misconfigured.')
  }

  return route
}

export function RatesPage() {
  const route = getRatesRoute()

  return (
    <section className="flex flex-col gap-8 pb-6">
      <p className="text-sm font-medium leading-6 text-[var(--color-text-muted)]">
        {PHASE_BOUNDARY_COPY}
      </p>

      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          {route.pageTitle}
        </h1>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {route.supportingCopy}
        </p>
      </div>

      <RatesBoard />
    </section>
  )
}
