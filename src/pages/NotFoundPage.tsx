import { Link } from 'react-router'

import { NOT_FOUND_COPY } from '../content/demoCopy'
import { ShellCard } from '../shell/ShellCard'

export function NotFoundPage() {
  return (
    <section className="flex flex-col gap-6 pb-6">
      <ShellCard>
        <h1 className="text-[28px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          Раздел не найден
        </h1>
        <p className="text-base leading-7 text-[var(--color-text-muted)]">
          {NOT_FOUND_COPY}
        </p>
        <div className="pt-2">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-[16px] bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-[#0B5A9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            to="/dashboard"
          >
            Вернуться на главную
          </Link>
        </div>
      </ShellCard>
    </section>
  )
}
