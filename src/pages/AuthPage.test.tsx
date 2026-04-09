import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, beforeEach } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'
import { loadRegisteredUsers } from '../features/auth/authStorage'

describe('AuthPage', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    window.localStorage.clear()
  })

  it('renders the login variant by default', () => {
    renderApp(<AppRoutes />, { route: '/auth', authenticated: false })

    expect(
      screen.getByRole('heading', { name: 'Вход в систему' }),
    ).toBeInTheDocument()
    expect(screen.queryByLabelText('ФИО')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Номер телефона')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Логин')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
  })

  it('switches to registration variant', async () => {
    const user = userEvent.setup()
    renderApp(<AppRoutes />, { route: '/auth', authenticated: false })

    await user.click(screen.getByRole('button', { name: 'Регистрация' }))

    expect(
      screen.getByRole('heading', { name: 'Регистрация' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('ФИО')).toBeInTheDocument()
    expect(screen.getByLabelText('Номер телефона')).toBeInTheDocument()
    expect(screen.getByLabelText('Логин')).toBeInTheDocument()
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument()
  })

  it('shows error on login when user does not exist', async () => {
    const user = userEvent.setup()
    renderApp(<AppRoutes />, { route: '/auth', authenticated: false })

    await user.type(screen.getByLabelText('Логин'), 'unknown_user')
    await user.type(screen.getByLabelText('Пароль'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    expect(
      screen.getByText('Пользователь не найден или неверный пароль.'),
    ).toBeInTheDocument()
  })

  it('registers a new user and logs them in', async () => {
    const user = userEvent.setup()
    renderApp(<AppRoutes />, { route: '/auth', authenticated: false })

    // Switch to register tab
    await user.click(screen.getByRole('button', { name: 'Регистрация' }))

    await user.type(screen.getByLabelText('ФИО'), 'Иванов Иван Иванович')
    await user.type(screen.getByLabelText('Логин'), 'ivanov_i')
    await user.type(screen.getByLabelText('Номер телефона'), '79991234567')
    await user.type(screen.getByLabelText('Пароль'), 'qwerty')
    await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    // It should navigate to dashboard on success
    expect(
      await screen.findByRole('heading', {
        name: 'Демонстрационный маршрут Россия → Китай',
      }),
    ).toBeInTheDocument()

    // Assert the user was added to the localStorage simulated DB
    const users = loadRegisteredUsers()
    expect(users).toHaveLength(1)
    expect(users[0].login).toBe('ivanov_i')
  })

  it('logs in an existing test user', async () => {
    const user = userEvent.setup()
    // By passing authenticated: true (the default), the mock user is already injected into the test db.
    // However, since we want to test the AuthPage specifically logging in, we pass authenticated: false
    // but manually populate localStorage first.
    window.localStorage.setItem(
      'dagmara.registered-users',
      JSON.stringify([
        {
          fullName: 'Существующий Юзер',
          login: 'exist_user',
          phone: '79990000000',
          password: 'password123',
          balanceAmount: 0,
        },
      ]),
    )

    renderApp(<AppRoutes />, { route: '/auth', authenticated: false })

    await user.type(screen.getByLabelText('Логин'), 'exist_user')
    await user.type(screen.getByLabelText('Пароль'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Войти' }))

    // Success navigation
    expect(
      await screen.findByRole('heading', {
        name: 'Демонстрационный маршрут Россия → Китай',
      }),
    ).toBeInTheDocument()
  })
})
