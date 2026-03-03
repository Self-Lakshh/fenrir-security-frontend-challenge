import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/App'
import { ModeToggle } from '@/components/common/ThemeToggle'

const PostLoginLayout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/sign-in')
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navbar */}
            <header style={{
                padding: '16px 24px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--background)'
            }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Fenrir Security</div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <ModeToggle />
                    <button
                        onClick={handleLogout}
                        style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', border: '1px solid var(--border)', background: 'transparent' }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '24px', backgroundColor: 'var(--background)' }}>
                <Outlet />
            </main>
        </div>
    )
}

export default PostLoginLayout
