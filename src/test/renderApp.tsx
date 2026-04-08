import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

interface RenderAppOptions {
  route?: string
}

export function renderApp(ui: ReactElement, options: RenderAppOptions = {}) {
  const { route = '/dashboard' } = options

  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
