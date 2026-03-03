import { Outlet } from 'react-router-dom'
import Content from './components/Content'

const AuthLayout = () => {
  return (
    <div className="h-screen grid grid-rows-[10%_5%_1fr] aurora-gradient font-sans text-foreground overflow-hidden">

      {/* Header */}
      <header className="flex items-center px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-primary" />
            <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            aps
          </span>
        </div>
      </header>
      <div />
      <main className="flex items-center justify-center px-4 lg:px-8 pb-4">
        <div className="w-full max-w-[1200px] h-full flex flex-col lg:flex-row gap-4">

          <Content />

          <section className="w-full lg:w-[45%] flex">
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