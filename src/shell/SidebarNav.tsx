import { NavLink } from 'react-router'

import { TOP_LEVEL_ROUTES } from '../content/topLevelRoutes'
import { useAuth } from '../features/auth'

import {
  DashboardIcon,
  RatesIcon,
  SettingsIcon,
  TransfersIcon,
} from './icons'

function getIcon(path: string) {
  switch (path) {
    case '/dashboard':
      return DashboardIcon
    case '/transfers':
      return TransfersIcon
    case '/rates':
      return RatesIcon
    case '/settings':
      return SettingsIcon
    default:
      return DashboardIcon
  }
}

export function SidebarNav() {
  const { user, signOut } = useAuth()

  return (
    <aside className="flex w-[264px] shrink-0 flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
          ФинМост 
        </p>
        {user ? (
          <>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">
              {user.fullName}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              {user.maskedCardNumber}
            </p>
          </>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-3">
        {TOP_LEVEL_ROUTES.map((route) => {
          const Icon = getIcon(route.path)

          return (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `relative flex h-12 items-center gap-3 rounded-[16px] px-4 text-sm font-medium transition-colors duration-150 ease-out ${
                  isActive
                    ? 'bg-[rgba(15,108,189,0.12)] text-[var(--color-text-strong)]'
                    : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-strong)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]"
                    />
                  ) : null}
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{route.navLabel}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Sign out button at the bottom */}
      <button
        className="mt-6 flex h-11 items-center gap-3 rounded-[16px] px-4 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-150 ease-out hover:bg-[rgba(226,75,67,0.08)] hover:text-[#E24B43]"
        onClick={signOut}
        type="button"
      >
        <svg
          className="h-[18px] w-[18px] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Выход</span>
      </button>
    </aside>
  )
}
