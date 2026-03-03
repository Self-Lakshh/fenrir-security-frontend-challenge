import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/App'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import SocialButton from '../components/SocialButton'
import { authService } from '@/mock/services/authService'

const SignIn = () => {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await authService.login(email, password)
      if (result.success) {
        login()
        navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
      } else {
        setError(result.message)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-[24px] bg-white shadow-xl px-8 py-8 flex flex-col justify-between">

      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="text-primary hover:underline">Sign up</Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 pr-10 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : 'Log in'}
          </button>
        </form>
      </div>

      <div className="mt-6 flex gap-3">
        <SocialButton logo="/logos/apple.png" alt="Apple" bgColor="bg-black hover:bg-neutral-900 h-12" />
        <SocialButton logo="/logos/google.png" alt="Google" bgColor="bg-gray-100 hover:bg-gray-200 h-12" />
        <SocialButton logo="/logos/meta.png" alt="Meta" bgColor="bg-blue-600 hover:bg-blue-700 h-12" />
      </div>

    </div>
  )
}

export default SignIn