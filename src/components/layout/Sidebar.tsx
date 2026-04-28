import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Truck,
  UtensilsCrossed,
  BarChart3,
  Users,
  UserCog,
  Building2,
  FolderTree,
  Tags,
  Store,
  Scale,
  CalendarRange,
  ShoppingCart,
  ClipboardList,
  ShieldCheck,
  FileBarChart,
} from 'lucide-react'
import { ROUTES } from '@/router/routes'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'Recetas', path: ROUTES.recipes, icon: UtensilsCrossed },
  { label: 'Proveedores', path: ROUTES.providers, icon: Truck },
  { label: 'Insumos', path: ROUTES.supplies, icon: Package },
  { label: 'Reportes', path: ROUTES.reports, icon: BarChart3 },
  { label: 'Usuarios', path: ROUTES.users, icon: Users },
  { label: 'Perfiles', path: ROUTES.perfils, icon: UserCog },
  { label: 'Ciudades', path: ROUTES.ciudads, icon: Building2 },
  { label: 'Departamentos', path: ROUTES.departamentos, icon: FolderTree },
  { label: 'Categorias', path: ROUTES.categorias, icon: Tags },
  { label: 'Comedores', path: ROUTES.comedors, icon: Store },
  { label: 'Unidades', path: ROUTES.unidadesMedida, icon: Scale },
  { label: 'Planes', path: ROUTES.planes, icon: CalendarRange },
  { label: 'Ordenes', path: ROUTES.ordenesCompra, icon: ShoppingCart },
  { label: 'Items OC', path: ROUTES.ordenCompraItems, icon: ClipboardList },
  { label: 'Auditoria', path: ROUTES.auditoriaEventos, icon: ShieldCheck },
  { label: 'CRUD Reporte', path: ROUTES.reporteCostosCrud, icon: FileBarChart },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden w-full max-w-[260px] flex-col gap-6 overflow-hidden border-r border-border bg-white px-4 py-6 lg:sticky lg:top-[88px] lg:flex lg:h-[calc(100vh-88px)]">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-3 text-lg font-semibold text-brand">
          <span className="rounded-2xl bg-brand-soft px-3 py-2">🍃</span>
          ChefFlow
        </span>
        <p className="text-sm text-text-muted">Gestión de recetas, insumos y proveedores.</p>
      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
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
