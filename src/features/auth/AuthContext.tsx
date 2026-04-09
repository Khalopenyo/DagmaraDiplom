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
  topUpStoredUser,
  type DemoStoredUser,
  type DemoUserProfile,
} from './authStorage'

interface AuthContextValue {
  user: DemoUserProfile | null
  isAuthenticated: boolean
  signIn: (storedUser: DemoStoredUser) => DemoUserProfile
  signOut: () => void
  topUpBalance: (amount: number) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUserProfile | null>(() => loadAuthProfile())

  const signIn = useCallback((storedUser: DemoStoredUser) => {
    const profile = buildUserProfile(storedUser)

    saveAuthProfile(profile)
    setUser(profile)

    return profile
  }, [])

  const signOut = useCallback(() => {
    clearAuthProfile()
    clearTransferReceipt()
    setUser(null)
  }, [])

  const topUpBalance = useCallback((amount: number) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser

      const updatedStoredUser = topUpStoredUser(prevUser.login, amount)
      if (!updatedStoredUser) return prevUser

      const updatedProfile = buildUserProfile(updatedStoredUser)
      saveAuthProfile(updatedProfile)
      return updatedProfile
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      signIn,
      signOut,
      topUpBalance,
    }),
    [signIn, signOut, topUpBalance, user],
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
