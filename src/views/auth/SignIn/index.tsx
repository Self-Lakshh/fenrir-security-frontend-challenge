import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/App'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import SocialButton from '../components/SocialButton'
import { authService } from '@/mock/services/authService'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
                const from = location.state?.from?.pathname || '/dashboard'
                navigate(from, { replace: true })
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
                    Sign In
                </h2>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                    Don't have an account?{' '}
                    <Link to="/sign-up" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">

                <input
                    type="email"
                    placeholder="Email address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 md:py-4 md:px-5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 md:py-4 md:px-5 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>

                    <div className="flex justify-end mt-2">
                        <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 md:py-4 bg-primary hover:bg-[#0bb598] text-white font-bold text-lg rounded-full shadow-lg shadow-primary/20 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Signing in...</span>
                        </>
                    ) : (
                        'Log in'
                    )}
                </button>
            </form>

            <div className="relative my-5 md:my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-gray-400 font-bold tracking-wider">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
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

export default SignIn