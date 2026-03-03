import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/App'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock authentication success
        if (email && password) {
            login()
            const from = location.state?.from?.pathname || '/dashboard'
            navigate(from, { replace: true })
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sign In
                </button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
        </div>
    )
}

export default SignIn