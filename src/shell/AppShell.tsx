import { Outlet } from 'react-router'

import { PageContainer } from './PageContainer'
import { SidebarNav } from './SidebarNav'
import { TopHeader } from './TopHeader'

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text-strong)]">
      <SidebarNav />

      <div className="flex min-h-screen flex-1 flex-col">
        <TopHeader />

        <main className="flex-1">
          <PageContainer>
            <Outlet />
          </PageContainer>
        </main>
      </div>
    </div>
  )
}
