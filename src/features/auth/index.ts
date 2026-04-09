export { AuthProvider, useAuth } from './AuthContext'
export { RequireAuth } from './RequireAuth'
export {
  AUTH_PROFILE_STORAGE_KEY,
  DEFAULT_PROFILE_BALANCE,
  buildUserProfile,
  clearAuthProfile,
  formatRussianPhone,
  generateCardNumber,
  loadAuthProfile,
  normalizeRussianPhone,
  saveAuthProfile,
  validateAuthDraft,
  type DemoAuthDraft,
  type DemoAuthValidationResult,
  type DemoUserProfile,
} from './authStorage'
