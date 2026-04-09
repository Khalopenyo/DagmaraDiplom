import { AppRouter } from './app/AppRouter'
import { AuthProvider } from './features/auth'

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
