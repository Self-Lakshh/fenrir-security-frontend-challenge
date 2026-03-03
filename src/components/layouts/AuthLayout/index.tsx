import { Outlet } from 'react-router-dom'
import Content from './components/Content'

const AuthLayout = () => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] sm:grid-rows-[10%_5%_1fr] aurora-gradient font-sans text-foreground overflow-hidden">
      <div className="grain-overlay" />

      <header className="flex items-center px-4 lg:px-8 py-4 sm:py-0">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-primary" />
            <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">aps</span>
        </div>
      </header>

      <div className="hidden sm:block" />

      <main className="flex items-center justify-center px-4 lg:px-8 pb-4 overflow-y-auto">
        <div className="w-full max-w-[1200px] h-full flex flex-col lg:flex-row gap-4 lg:gap-6 py-4 lg:py-0">

          <Content />

          <section className="w-full lg:w-[45%] flex items-center justify-center lg:items-stretch">
            <div className="w-full max-w-[460px] flex">
              <Outlet />
            </div>
          </section>

        </div>
      </main>

    </div>
  )
}

export default AuthLayout