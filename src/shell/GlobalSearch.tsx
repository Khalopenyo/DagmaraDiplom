import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../features/auth'
import { SearchIcon } from './icons'

const SEARCH_ITEMS = [
  { id: 'dashboard', title: 'Дашборд (Главная)', desc: 'Обзор счетов и аналитика', path: '/dashboard' },
  { id: 'transfers', title: 'Переводы', desc: 'Трансграничные переводы в ЦВЦБ', path: '/transfers' },
  { id: 'rates', title: 'Обмен валют', desc: 'Курсы конвертации и операции', path: '/rates' },
  { id: 'settings', title: 'Настройки', desc: 'Управление профилем', path: '/settings' },
  { id: 'logout', title: 'Выход', desc: 'Завершить сеанс', action: 'logout' },
]

export function GlobalSearch() {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredItems = SEARCH_ITEMS.filter((item) => {
    const query = value.toLowerCase()
    return item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
  })

  function handleItemClick(item: typeof SEARCH_ITEMS[0]) {
    setIsOpen(false)
    setValue('')
    if (item.action === 'logout') {
      signOut()
      navigate('/auth', { replace: true })
    } else if (item.path) {
      navigate(item.path)
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <label className="flex min-w-[280px] items-center gap-3 rounded-[16px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)] transition-colors duration-150 ease-out focus-within:border-[var(--color-accent)] focus-within:text-[var(--color-text-strong)]">
        <SearchIcon className="h-[20px] w-[20px] shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Поиск"
          className="w-full bg-transparent text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-muted)]"
        />
      </label>

      {isOpen && value.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-[340px] overflow-hidden rounded-[20px] border border-[var(--color-border-soft)] bg-white/90 p-2 shadow-[0_24px_48px_rgba(24,38,58,0.16)] backdrop-blur-xl z-50">
          {filteredItems.length > 0 ? (
            <ul className="flex flex-col">
              {filteredItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col items-start gap-0.5 rounded-[12px] px-4 py-3 text-left transition-colors duration-150 ease-out hover:bg-[rgba(24,38,58,0.04)] focus-visible:bg-[rgba(24,38,58,0.04)] focus-visible:outline-none"
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="text-sm font-semibold text-[var(--color-text-strong)]">{item.title}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{item.desc}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-[var(--color-text-muted)]">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  )
}
