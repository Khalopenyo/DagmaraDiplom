import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('CurrencyExchangePage', () => {
  it('renders the selected exchange rate and seeded amount for the chosen country', () => {
    renderApp(<AppRoutes />, { route: '/rates/exchange/china' })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Обмен',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Китай')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2234')).toBeInTheDocument()
    expect(screen.getByText('1 ЦР = 2.234 ЦЮ')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Перевести',
      }),
    ).toHaveAttribute('href', '/transfers?amount=1000')
  })

  it('recalculates the destination amount while keeping the selected country context', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/rates/exchange/india' })

    const debitInput = screen.getByLabelText('Сумма списания в ЦР')

    await user.clear(debitInput)
    await user.type(debitInput, '5')

    expect(screen.getByText('Индия')).toBeInTheDocument()
    expect(screen.getByDisplayValue('722')).toBeInTheDocument()
    expect(screen.getByText('1 ЦР = 144.4 ЦИ')).toBeInTheDocument()
  })

  it('allows swapping the currency direction inside the exchange form', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/rates/exchange/china' })

    await user.click(
      screen.getByRole('button', {
        name: 'Поменять валюты местами: ЦР и ЦЮ',
      }),
    )

    expect(screen.getByLabelText('Сумма списания в ЦЮ')).toHaveValue('2234')
    expect(screen.getByLabelText('Сумма получения в ЦР')).toHaveValue('1000')
    expect(screen.getByText('1 ЦЮ = 0.448 ЦР')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: 'Перевести',
      }),
    ).toHaveAttribute('href', '/transfers?amount=1000')
  })
})
