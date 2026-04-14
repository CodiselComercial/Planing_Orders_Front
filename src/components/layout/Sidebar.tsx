import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Truck, UtensilsCrossed } from 'lucide-react'
import { ROUTES } from '@/router/routes'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'Recetas', path: ROUTES.recipes, icon: UtensilsCrossed },
  { label: 'Proveedores', path: ROUTES.providers, icon: Truck },
  { label: 'Insumos', path: ROUTES.supplies, icon: Package },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden h-full w-full max-w-[260px] flex-col gap-6 border-r border-border bg-white px-4 py-6 lg:flex">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-3 text-lg font-semibold text-brand">
          <span className="rounded-2xl bg-brand-soft px-3 py-2">🍃</span>
          ChefFlow
        </span>
        <p className="text-sm text-text-muted">Gestión de recetas, insumos y proveedores.</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition',
                active
                  ? 'bg-brand-soft text-brand shadow-sm ring-1 ring-brand/15'
                  : 'text-text hover:bg-neutral'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
