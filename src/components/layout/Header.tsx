import { LogOut } from 'lucide-react'
import { useLogout } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-white px-4 py-4 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-text">ChefFlow</p>
        <p className="text-xs text-text-muted">Panel administrativo</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-3xl border border-border bg-neutral px-4 py-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
            {user?.name?.[0] ?? 'C'}
          </span>
          <div className="text-right">
            <p className="text-sm font-semibold text-text">{user?.name ?? 'Chef'}</p>
            <p className="text-xs text-text-muted">{user?.email ?? 'chef@flow.com'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => logout.mutate()}
          className="inline-flex items-center gap-2 rounded-3xl bg-[#F8F8F7] px-3 py-2 text-sm text-text-muted transition hover:bg-neutral"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    </header>
  )
}
