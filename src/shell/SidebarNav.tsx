import { NavLink } from 'react-router'

import { TOP_LEVEL_ROUTES } from '../content/topLevelRoutes'

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
  return (
    <aside className="flex w-[264px] shrink-0 flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
          ФинМост 
        </p>
        <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">
          
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
         
        </p>
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
    </aside>
  )
}
