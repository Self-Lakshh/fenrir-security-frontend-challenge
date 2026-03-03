import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/App'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import SocialButton from '../components/SocialButton'
import { authService } from '@/mock/services/authService'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return

    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await authService.register({ firstName, lastName, email, password, position: 'Security Analyst' })

      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          login()
          navigate('/dashboard', { replace: true })
        }, 1200)
      } else {
        setError(result.message)
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20'
  const isDisabled = loading || !!success

  return (
    <div className="w-full rounded-[24px] bg-white shadow-xl px-8 py-8 flex flex-col justify-between">

      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">Sign Up</h2>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-primary hover:underline">Log in</Link>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 text-green-600">
            <CheckCircle2 size={18} />
            <span className="text-sm">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="First name*" value={firstName} onChange={(e) => setFirstName(e.target.value)} required disabled={isDisabled} className={inputClass} />
          <input type="text" placeholder="Last name*" value={lastName} onChange={(e) => setLastName(e.target.value)} required disabled={isDisabled} className={inputClass} />
          <input type="email" placeholder="Email address*" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isDisabled} className={inputClass} />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (8+ characters)*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isDisabled}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
            I agree to Terms &amp; Conditions and Privacy Policy
          </label>

          <button
            type="submit"
            disabled={loading || !agreed || !!success}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : success ? 'Redirecting...' : 'Create account'}
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

export default SignUp