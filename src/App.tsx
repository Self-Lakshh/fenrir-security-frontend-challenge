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
import './App.css'

// --- Mock Auth Context Setup ---
type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Try to recover session from local storage, default to false.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mock_auth') === 'true'
  })

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('mock_auth', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('mock_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// -------------------------------

// Simple Protected Route Component relies solely on isAuthenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) return <Navigate to="/sign-in" state={{ from: location }} replace />

  return <>{children}</>
}

// Redirect if already authenticated
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
            {/* Public Routes with AuthLayout */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
              <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
            </Route>

            {/* Protected Dashboard Routes with PostLoginLayout */}
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

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
