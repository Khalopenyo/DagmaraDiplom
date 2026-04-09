import { useLocation } from 'react-router'

import { TOP_LEVEL_ROUTES } from '../content/topLevelRoutes'
import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  const location = useLocation()
  const route = TOP_LEVEL_ROUTES.find(
    ({ path }) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
  )
  const contentWidthClassName =
    route?.contentWidth === 'full' ? 'max-w-none' : 'max-w-[760px]'

  return (
    <div
      data-testid="page-container"
      className="mx-auto w-full max-w-[1200px] px-8 pt-8 pb-12"
    >
      <div className={`w-full ${contentWidthClassName}`} data-testid="page-content">
        {children}
      </div>
    </div>
  )
}
