export interface DemoAuthDraft {
  fullName: string
  login: string
  phone: string
  password: string
}

export interface DemoAuthValidationResult {
  isValid: boolean
  fullNameError: string | null
  loginError: string | null
  phoneError: string | null
  passwordError: string | null
}

export interface DemoUserProfile {
  fullName: string
  login: string
  phone: string
  cardNumber: string
  maskedCardNumber: string
  balanceAmount: number
  currencyLabel: 'ЦР'
}

export const AUTH_PROFILE_STORAGE_KEY = 'dagmara.auth-profile'
export const DEFAULT_PROFILE_BALANCE = 3469.52

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

function calculateSeed(value: string) {
  let hash = 2166136261

  for (const character of value) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function buildDigitSequence(seedSource: string, length: number) {
  let state = calculateSeed(seedSource)
  let digits = ''

  while (digits.length < length) {
    state = Math.imul(state ^ 0x9e3779b9, 1664525) + 1013904223
    digits += String(Math.abs(state >>> 0))
  }

  return digits.slice(0, length)
}

function calculateLuhnCheckDigit(payload: string) {
  let sum = 0
  let shouldDouble = true

  for (let index = payload.length - 1; index >= 0; index -= 1) {
    let digit = Number(payload[index])

    if (shouldDouble) {
      digit *= 2

      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return String((10 - (sum % 10)) % 10)
}

export function normalizeRussianPhone(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 10) {
    return `7${digits}`
  }

  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return `7${digits.slice(1)}`
  }

  return null
}

export function formatRussianPhone(phoneDigits: string) {
  const normalizedPhone = phoneDigits.startsWith('7')
    ? phoneDigits
    : `7${phoneDigits.slice(-10)}`

  return `+7 (${normalizedPhone.slice(1, 4)}) ${normalizedPhone.slice(4, 7)}-${normalizedPhone.slice(7, 9)}-${normalizedPhone.slice(9, 11)}`
}

export function generateCardNumber(draft: Pick<DemoAuthDraft, 'fullName' | 'login' | 'phone'>) {
  const normalizedPhone = normalizeRussianPhone(draft.phone) ?? '79990000000'
  const seedSource = `${normalizeWhitespace(draft.fullName)}|${draft.login.trim().toLowerCase()}|${normalizedPhone}`
  const payload = `2200${buildDigitSequence(seedSource, 11)}`

  return `${payload}${calculateLuhnCheckDigit(payload)}`
}

export function formatCardNumber(cardNumber: string) {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim()
}

export function maskCardNumber(cardNumber: string) {
  return `${cardNumber.slice(0, 4)} •••• •••• ${cardNumber.slice(-4)}`
}

export function validateAuthDraft(draft: DemoAuthDraft): DemoAuthValidationResult {
  const normalizedFullName = normalizeWhitespace(draft.fullName)
  const normalizedLogin = draft.login.trim()
  const normalizedPhone = normalizeRussianPhone(draft.phone)
  const normalizedPassword = draft.password.trim()

  const fullNameError =
    normalizedFullName.length === 0
      ? 'Укажите ФИО.'
      : normalizedFullName.split(' ').length < 2
        ? 'Укажите имя и фамилию полностью.'
        : null

  const loginError =
    normalizedLogin.length === 0
      ? 'Укажите логин.'
      : !/^[a-zA-Z0-9_.-]{3,20}$/.test(normalizedLogin)
        ? 'Логин должен содержать 3–20 символов: буквы, цифры, ".", "_" или "-".'
        : null

  const phoneError =
    draft.phone.trim().length === 0
      ? 'Укажите номер телефона.'
      : normalizedPhone === null
        ? 'Введите российский номер в формате +7 или 8XXXXXXXXXX.'
        : null

  const passwordError =
    normalizedPassword.length === 0
      ? 'Укажите пароль.'
      : normalizedPassword.length < 6
        ? 'Пароль должен содержать не менее 6 символов.'
        : null

  return {
    isValid:
      fullNameError === null &&
      loginError === null &&
      phoneError === null &&
      passwordError === null,
    fullNameError,
    loginError,
    phoneError,
    passwordError,
  }
}

export function buildUserProfile(draft: DemoAuthDraft): DemoUserProfile {
  const normalizedFullName = normalizeWhitespace(draft.fullName)
  const normalizedPhone = normalizeRussianPhone(draft.phone)

  if (normalizedPhone === null) {
    throw new Error('Cannot build user profile from an invalid Russian phone number.')
  }

  const cardNumber = generateCardNumber(draft)

  return {
    fullName: normalizedFullName,
    login: draft.login.trim(),
    phone: formatRussianPhone(normalizedPhone),
    cardNumber: formatCardNumber(cardNumber),
    maskedCardNumber: maskCardNumber(cardNumber),
    balanceAmount: DEFAULT_PROFILE_BALANCE,
    currencyLabel: 'ЦР',
  }
}

export function saveAuthProfile(profile: DemoUserProfile) {
  window.sessionStorage.setItem(AUTH_PROFILE_STORAGE_KEY, JSON.stringify(profile))
}

export function loadAuthProfile() {
  const rawValue = window.sessionStorage.getItem(AUTH_PROFILE_STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as DemoUserProfile
  } catch {
    return null
  }
}

export function clearAuthProfile() {
  window.sessionStorage.removeItem(AUTH_PROFILE_STORAGE_KEY)
}
