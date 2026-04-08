import { NOT_FOUND_COPY } from '../content/demoCopy'

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col justify-center px-8 py-16">
      <div className="rounded-[24px] border border-[var(--color-border-soft)] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-[var(--color-text-strong)]">
          Раздел не найден
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
          {NOT_FOUND_COPY}
        </p>
      </div>
    </section>
  )
}
