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
    <section className="flex flex-col gap-5 pb-6">
      <p className="sr-only">{PHASE_BOUNDARY_COPY}</p>

      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="h-10 w-1 rounded-full bg-[linear-gradient(180deg,#ff6a6a_0%,#ff9f8b_100%)]"
        />
        <h1 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--color-text-strong)]">
          {route.pageTitle}
        </h1>
      </div>

      <RatesBoard />
    </section>
  )
}
