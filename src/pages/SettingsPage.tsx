import {
  EMPTY_STATE_BODY,
  EMPTY_STATE_HEADING,
  PHASE_BOUNDARY_COPY,
} from '../content/demoCopy'
import { getTopLevelRoute } from '../content/topLevelRoutes'

const route = getTopLevelRoute('/settings')

export function SettingsPage() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col justify-center px-8 py-16">
      <p className="text-sm font-medium text-[var(--color-text-muted)]">
        {PHASE_BOUNDARY_COPY}
      </p>
      <h1 className="mt-6 text-4xl font-semibold text-[var(--color-text-strong)]">
        {route?.pageTitle}
      </h1>
      <p className="mt-4 text-base text-[var(--color-text-muted)]">
        {route?.supportingCopy}
      </p>
      <div className="mt-8 rounded-[24px] border border-[var(--color-border-soft)] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--color-text-strong)]">
          {EMPTY_STATE_HEADING}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
          {EMPTY_STATE_BODY}
        </p>
      </div>
    </section>
  )
}
