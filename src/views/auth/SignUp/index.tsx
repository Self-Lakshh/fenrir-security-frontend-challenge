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
            const result = await authService.register({
                firstName,
                lastName,
                email,
                password
            })

            if (result.success) {
                setSuccess(result.message)
                // Wait a bit to show success message before logging in/redirecting
                setTimeout(() => {
                    login()
                    navigate('/dashboard', { replace: true })
                }, 1500)
            } else {
                setError(result.message)
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white text-gray-900 p-5 sm:p-6 md:p-10 rounded-[28px] md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full">

            <div className="text-center mb-6 md:mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    Sign up
                </h2>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                    Already have an account?{' '}
                    <Link to="/sign-in" className="text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{success}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">

                <input
                    type="text"
                    placeholder="First name*"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading || !!success}
                    className="w-full px-4 py-3 md:py-4 md:px-5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                />

                <input
                    type="text"
                    placeholder="Last name*"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading || !!success}
                    className="w-full px-4 py-3 md:py-4 md:px-5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                />

                <input
                    type="email"
                    placeholder="Email address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading || !!success}
                    className="w-full px-4 py-3 md:py-4 md:px-5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (8+ characters)*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading || !!success}
                        className="w-full px-4 py-3 md:py-4 md:px-5 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading || !!success}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>

                <div className="flex items-start gap-3 mt-1">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        disabled={loading || !!success}
                        required
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                    />
                    <span className="text-xs md:text-sm text-gray-500">
                        I agree to Terms & Conditions and Privacy Policy
                    </span>
                </div>

                <button
                    type="submit"
                    disabled={loading || !agreed || !!success}
                    className="w-full py-3 md:py-4 bg-primary hover:bg-[#0bb598] text-white font-bold text-lg rounded-full shadow-lg shadow-primary/20 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Creating account...</span>
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Redirecting...</span>
                        </>
                    ) : (
                        'Create account'
                    )}
                </button>
            </form>

            <div className="flex items-center gap-3 mt-6 md:mt-8">
                <SocialButton logo="/logos/apple.png" alt="Apple"
                    bgColor="bg-black hover:bg-neutral-900 border-none shadow-md h-12 md:h-14" />
                <SocialButton logo="/logos/google.png" alt="Google"
                    bgColor="bg-[#F2F2F2] hover:bg-[#EAEAEA] border-none shadow-md h-12 md:h-14" />
                <SocialButton logo="/logos/meta.png" alt="Meta"
                    bgColor="bg-[#4267B2] hover:bg-[#3b5998] border-none shadow-md h-12 md:h-14" />
            </div>

        </div>
    )
}

export default SignUp