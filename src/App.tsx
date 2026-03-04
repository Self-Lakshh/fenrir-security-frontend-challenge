import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import SignIn from '@/views/auth/SignIn/index'
import SignUp from '@/views/auth/SignUp/index'
import Dashboard from '@/views/dashboard/dashboard'
import Projects from '@/views/dashboard/projects'
import Scans from '@/views/dashboard/scans'
import Schedule from '@/views/dashboard/schedule'
import Notifications from '@/views/dashboard/notifications'
import Settings from '@/views/dashboard/settings'
import Support from '@/views/dashboard/support'
import AuthLayout from '@/components/layouts/AuthLayout/index'
import PostLoginLayout from '@/components/layouts/PostLoginLayout/index'
import { ThemeProvider } from '@/components/theme'

// Mock auth context
export interface AuthUser {
  firstName: string
  lastName: string
  email: string
  position: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Session persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mock_auth') === 'true'
  })

  // User persistence
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('mock_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (userData: AuthUser) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('mock_auth', 'true')
    localStorage.setItem('mock_user', JSON.stringify(userData))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('mock_auth')
    localStorage.removeItem('mock_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Auth guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/sign-in" state={{ from: location }} replace />

  return <>{children}</>
}

// Redirect authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/sign-in" replace />} />
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
            </Route>

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PostLoginLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="scans" element={<Scans />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
              <Route path="support" element={<Support />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
