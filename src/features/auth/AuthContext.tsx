import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { clearTransferReceipt } from '../transfers/transferReceiptStorage'
import {
  buildUserProfile,
  clearAuthProfile,
  loadAuthProfile,
  saveAuthProfile,
  type DemoAuthDraft,
  type DemoUserProfile,
} from './authStorage'

interface AuthContextValue {
  user: DemoUserProfile | null
  isAuthenticated: boolean
  signIn: (draft: DemoAuthDraft) => DemoUserProfile
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUserProfile | null>(() => loadAuthProfile())

  const signIn = useCallback((draft: DemoAuthDraft) => {
    const profile = buildUserProfile(draft)

    saveAuthProfile(profile)
    setUser(profile)

    return profile
  }, [])

  const signOut = useCallback(() => {
    clearAuthProfile()
    clearTransferReceipt()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      signIn,
      signOut,
    }),
    [signIn, signOut, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider.')
  }

  return context
}
