import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

import { useAuth } from '../features/auth'
import {
  validateAuthDraft,
  type DemoAuthDraft,
  type DemoAuthValidationResult,
} from '../features/auth/authStorage'

function ValidationHint({ message }: { message: string }) {
  return (
    <p className="mt-1 text-sm font-medium text-[#E24B43]" role="alert">
      {message}
    </p>
  )
}

const EMPTY_VALIDATION: DemoAuthValidationResult = {
  isValid: false,
  fullNameError: null,
  loginError: null,
  phoneError: null,
  passwordError: null,
}

export function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const [fullName, setFullName] = useState('')
  const [login, setLogin] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validation, setValidation] =
    useState<DemoAuthValidationResult>(EMPTY_VALIDATION)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setHasSubmitted(true)

    const draft: DemoAuthDraft = { fullName, login, phone, password }
    const result = validateAuthDraft(draft)

    setValidation(result)

    if (!result.isValid) {
      return
    }

    signIn(draft)

    const from =
      (location.state as { from?: { pathname: string } } | null)?.from
        ?.pathname ?? '/dashboard'

    void navigate(from, { replace: true })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#f0f4ff_0%,#e8eeff_40%,#f7f0ff_100%)] px-5 py-10">
      {/* Decorative orbitals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(62,56,199,0.12)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,90,114,0.1)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[10%] h-28 w-28 rounded-full bg-[rgba(74,129,255,0.08)] blur-2xl"
      />

      <section className="relative w-full max-w-[480px]">
        {/* Card glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-full bg-[rgba(62,56,199,0.12)] blur-2xl"
        />

        <article className="relative overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.82)] px-7 py-8 shadow-[0_32px_64px_rgba(24,38,58,0.12)] backdrop-blur-xl sm:px-9 sm:py-10">
          {/* Top accent bar */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#3E38C7_0%,#4a81ff_50%,#FF5A72_100%)]"
          />

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3E38C7]">
              ФинМост
            </p>
            <h1 className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text-strong)]">
              Вход в систему
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              Введите данные для доступа к демо-платформе
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* ФИО */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[rgba(73,78,101,0.78)]">
                ФИО
              </label>
              <input
                autoComplete="name"
                className="w-full rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7] focus:shadow-[0_0_0_3px_rgba(62,56,199,0.1)]"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Иванов Иван Иванович"
                type="text"
                value={fullName}
              />
              {hasSubmitted && validation.fullNameError ? (
                <ValidationHint message={validation.fullNameError} />
              ) : null}
            </div>

            {/* Логин */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[rgba(73,78,101,0.78)]">
                Логин
              </label>
              <input
                autoComplete="username"
                className="w-full rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7] focus:shadow-[0_0_0_3px_rgba(62,56,199,0.1)]"
                onChange={(e) => setLogin(e.target.value)}
                placeholder="ivanov_ivan"
                type="text"
                value={login}
              />
              {hasSubmitted && validation.loginError ? (
                <ValidationHint message={validation.loginError} />
              ) : null}
            </div>

            {/* Номер телефона */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[rgba(73,78,101,0.78)]">
                Номер телефона
              </label>
              <input
                autoComplete="tel"
                className="w-full rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 text-base text-[var(--color-text-strong)] outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7] focus:shadow-[0_0_0_3px_rgba(62,56,199,0.1)]"
                inputMode="tel"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                type="tel"
                value={phone}
              />
              {hasSubmitted && validation.phoneError ? (
                <ValidationHint message={validation.phoneError} />
              ) : null}
            </div>

            {/* Пароль */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[rgba(73,78,101,0.78)]">
                Пароль
              </label>
              <div className="relative">
                <input
                  autoComplete="current-password"
                  className="w-full rounded-[16px] border border-[rgba(24,38,58,0.14)] bg-white px-4 py-3 pr-12 text-base text-[var(--color-text-strong)] outline-none transition-all duration-150 placeholder:text-[var(--color-text-muted)] focus:border-[#3E38C7] focus:shadow-[0_0_0_3px_rgba(62,56,199,0.1)]"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  aria-label={
                    showPassword ? 'Скрыть пароль' : 'Показать пароль'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text-strong)]"
                  onClick={() => setShowPassword((v) => !v)}
                  type="button"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {hasSubmitted && validation.passwordError ? (
                <ValidationHint message={validation.passwordError} />
              ) : null}
            </div>

            {/* Submit */}
            <button
              className="mt-2 inline-flex min-h-[56px] w-full items-center justify-center rounded-[18px] bg-[#3E38C7] px-5 py-4 text-lg font-semibold text-white shadow-[0_18px_32px_rgba(62,56,199,0.24)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-[#312cab] hover:shadow-[0_22px_40px_rgba(62,56,199,0.32)] active:translate-y-0"
              type="submit"
            >
              Войти
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs leading-5 text-[var(--color-text-muted)]">
            Все данные хранятся в&nbsp;текущей сессии браузера.
            <br />
            Это демонстрационная платформа.
          </p>
        </article>
      </section>
    </div>
  )
}
