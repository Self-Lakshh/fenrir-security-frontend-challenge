import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--background)'
        }}>
            <Outlet />
        </div>
    )
}

export default AuthLayout
