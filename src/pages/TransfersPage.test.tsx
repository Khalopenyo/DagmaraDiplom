import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('TransfersPage', () => {
  it('renders the seeded source account and available balance before confirmation', () => {
    renderApp(<AppRoutes />, { route: '/transfers' })

    expect(screen.getByText('4756 •••• •••• 9018')).toBeInTheDocument()
    expect(screen.getByText('3 469.52 ЦР')).toBeInTheDocument()
    expect(screen.getByText('Счет списания')).toBeInTheDocument()
  })

  it('switches the recipient label between card and phone transfer modes', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/transfers' })

    expect(
      screen.getByLabelText('Номер карты получателя'),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'По номеру телефона',
      }),
    )

    expect(
      screen.getByLabelText('Номер телефона получателя'),
    ).toBeInTheDocument()
  })

  it('prefills the current recipient identifier from favorites and keeps the input editable', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/transfers' })

    expect(
      screen.getByRole('button', {
        name: 'Emma',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Justin',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: '+',
      }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Justin',
      }),
    )

    const recipientInput = screen.getByLabelText('Номер карты получателя')

    expect(recipientInput).toHaveValue('2200 0000 0000 5151')

    await user.type(recipientInput, '9')

    expect(recipientInput).toHaveValue('2200 0000 0000 51519')
  })
})
