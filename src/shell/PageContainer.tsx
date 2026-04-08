import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div
      data-testid="page-container"
      className="mx-auto w-full max-w-[1200px] px-8 pt-8 pb-12"
    >
      <div className="w-full max-w-[760px]">{children}</div>
    </div>
  )
}
