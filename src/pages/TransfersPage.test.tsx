import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('TransfersPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  it('renders the redesigned transfer heading, seeded source account and balance', () => {
    renderApp(<AppRoutes />, { route: '/transfers' })

    expect(
      screen.getByRole('heading', {
        name: 'Трансграничный перевод',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('4756 •••• •••• 9018')).toBeInTheDocument()
    expect(screen.getByText('Остаток по счету: 3 469.52 ЦР')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Открыть список валют получения. Сейчас Китай ЦЮ',
      }),
    ).toBeInTheDocument()
  })

  it('switches the recipient label between card and phone transfer modes', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/transfers' })

    expect(
      screen.getByLabelText('Номер счета'),
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

    const recipientInput = screen.getByLabelText('Номер счета')

    expect(recipientInput).toHaveValue('2200 0000 0000 5151')

    await user.type(recipientInput, '9')

    expect(recipientInput).toHaveValue('2200 0000 0000 51519')
  })

  it('recalculates the quote breakdown for a debit amount of 100', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/transfers' })

    await user.type(screen.getByLabelText('Номер счета'), '2200000000001746')
    await user.type(screen.getByLabelText('Сумма списания'), '100')

    expect(screen.getByText('1 ЦР = 2.234 ЦЮ')).toBeInTheDocument()
    expect(screen.getByDisplayValue('223.40')).toBeInTheDocument()
    expect(screen.getByText('10 ₽')).toBeInTheDocument()
    expect(screen.getByText('110 ₽')).toBeInTheDocument()
    expect(screen.getByText('Комиссия')).toBeInTheDocument()
    expect(screen.getByText('Итого')).toBeInTheDocument()
  })

  it('allows selecting another target currency inside the transfer form', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/transfers' })

    await user.click(
      screen.getByRole('button', {
        name: 'Открыть список валют получения. Сейчас Китай ЦЮ',
      }),
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Выбрать валюту Индия ЦИ',
      }),
    )

    expect(
      screen.getByRole('button', {
        name: 'Открыть список валют получения. Сейчас Индия ЦИ',
      }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText('Номер счета'), '2200000000001746')
    await user.type(screen.getByLabelText('Сумма списания'), '5')

    expect(screen.getByText('1 ЦР = 144.4 ЦИ')).toBeInTheDocument()
    expect(screen.getByLabelText('Сумма получения в ЦИ')).toHaveValue('722.00')
  })

  it('seeds the amount and selected currency when opened from the exchange screen', () => {
    renderApp(<AppRoutes />, { route: '/transfers?amount=250&currency=india' })

    expect(screen.getByLabelText('Сумма списания')).toHaveValue('250')
    expect(
      screen.getByRole('button', {
        name: 'Открыть список валют получения. Сейчас Индия ЦИ',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('1 ЦР = 144.4 ЦИ')).toBeInTheDocument()
    expect(screen.getByLabelText('Сумма получения в ЦИ')).toHaveValue('36 100.00')
  })

  it(
    'shows a short processing state before opening a dynamic receipt',
    async () => {
      const user = userEvent.setup()

      renderApp(<AppRoutes />, { route: '/transfers' })

      const confirmButton = screen.getByRole('button', { name: 'Подтвердить' })
      const amountInput = screen.getByLabelText('Сумма списания')

      expect(confirmButton).toBeDisabled()

      await user.type(amountInput, '3469.53')
      expect(confirmButton).toBeDisabled()

      await user.clear(amountInput)
      await user.click(
        screen.getByRole('button', {
          name: 'Justin',
        }),
      )
      await user.type(amountInput, '100')

      expect(confirmButton).toBeEnabled()

      await user.click(confirmButton)

      expect(screen.getByText('Выполняем перевод')).toBeInTheDocument()
      expect(screen.getByText('Подготавливаем электронный чек')).toBeInTheDocument()
      expect(
        screen.queryByRole('heading', {
          name: 'Электронный чек',
        }),
      ).not.toBeInTheDocument()

      expect(
        await screen.findByRole(
          'heading',
          {
            name: 'Электронный чек',
          },
          { timeout: 3000 },
        ),
      ).toBeInTheDocument()
      expect(screen.getByText('Дагмара')).toBeInTheDocument()
      expect(screen.getByText('Justin')).toBeInTheDocument()
      expect(screen.getByText('2200 0000 0000 5151')).toBeInTheDocument()
      expect(screen.getByText('100 ₽')).toBeInTheDocument()
      expect(screen.getByText('10 ₽')).toBeInTheDocument()
      expect(screen.getByText('110 ₽')).toBeInTheDocument()
      expect(
        screen.getByText(/^#\d{7}$/),
      ).toBeInTheDocument()
    },
    8000,
  )
})
