import { useState } from 'react'

import { SearchIcon } from './icons'

export function GlobalSearchStub() {
  const [value, setValue] = useState('')

  return (
    <label className="flex min-w-[280px] items-center gap-3 rounded-[16px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)] transition-colors duration-150 ease-out focus-within:border-[var(--color-accent)] focus-within:text-[var(--color-text-strong)]">
      <SearchIcon className="h-[20px] w-[20px] shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Поиск по demo"
        className="w-full bg-transparent text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
      />
    </label>
  )
}
