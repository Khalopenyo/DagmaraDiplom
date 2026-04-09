import { Link } from 'react-router'

import {
  EMPTY_STATE_BODY,
  EMPTY_STATE_HEADING,
  PHASE_BOUNDARY_COPY,
} from '../content/demoCopy'
import type { TopLevelRoute } from '../content/topLevelRoutes'
import { ShellCard } from '../shell/ShellCard'

const PRIMARY_ROUTE_CTA: TopLevelRoute['ctaLabel'] = 'Перейти к переводу'
const RETURN_ROUTE_CTA: TopLevelRoute['ctaLabel'] = 'Вернуться на главную'

function getCtaTarget(route: TopLevelRoute) {
  if (route.ctaLabel === PRIMARY_ROUTE_CTA) {
    return '/transfers'
  }

  if (route.ctaLabel === RETURN_ROUTE_CTA) {
    return '/dashboard'
  }

  return '/dashboard'
}

interface RoutePlaceholderPageProps {
  route: TopLevelRoute
}

export function RoutePlaceholderPage({ route }: RoutePlaceholderPageProps) {
  const ctaTarget = getCtaTarget(route)
  const usesIntroCard = route.boundaryMode === 'intro-card'

  return (
    <section className="flex flex-col gap-6 pb-6">
      {usesIntroCard ? (
        <ShellCard className="border-[rgba(15,108,189,0.18)] bg-[rgba(15,108,189,0.08)] p-8 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold leading-6 text-[var(--color-accent)]">
            {PHASE_BOUNDARY_COPY}
          </p>
        </ShellCard>
      ) : (
        <p className="text-sm font-medium leading-6 text-[var(--color-text-muted)]">
          {PHASE_BOUNDARY_COPY}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-[28px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          {route.pageTitle}
        </h1>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {route.supportingCopy}
        </p>
        <div className="pt-2">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-[#0B5A9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            to={ctaTarget}
          >
            {route.ctaLabel}
          </Link>
        </div>
      </div>

      <ShellCard>
        {!usesIntroCard ? (
          <p className="text-sm font-medium leading-6 text-[var(--color-text-muted)]">
            
          </p>
        ) : null}
        <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
          {EMPTY_STATE_HEADING}
        </h2>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {EMPTY_STATE_BODY}
        </p>
      </ShellCard>
    </section>
  )
}
