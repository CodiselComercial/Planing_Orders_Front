import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#F4FBF4]">
      <Header />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Sidebar />
        <main className="space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
