import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('TransferReceiptPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('redirects back to transfers when no saved receipt exists', () => {
    renderApp(<AppRoutes />, { route: '/transfers/receipt' })

    expect(
      screen.getByRole('heading', {
        name: 'Трансграничный перевод',
      }),
    ).toBeInTheDocument()
  })
})
