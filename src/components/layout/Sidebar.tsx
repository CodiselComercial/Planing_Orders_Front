import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BarChart3, FolderTree, ShoppingCart, ChevronDown } from 'lucide-react'
import { ROUTES } from '@/router/routes'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      { label: 'Dashboard', path: ROUTES.dashboard },
      { label: 'Perfil', path: ROUTES.profile },
    ],
  },
  {
    label: 'Movimientos',
    icon: ShoppingCart,
    items: [
      { label: 'Ordenes', path: ROUTES.ordenesCompra },
      { label: 'Items OC', path: ROUTES.ordenCompraItems },
    ],
  },
  {
    label: 'Catálogos',
    icon: FolderTree,
    items: [
      { label: 'Recetas', path: ROUTES.recipes },
      { label: 'Proveedores', path: ROUTES.providers },
      { label: 'Insumos', path: ROUTES.supplies },
      { label: 'Usuarios', path: ROUTES.users },
      { label: 'Perfiles', path: ROUTES.perfils },
      { label: 'Ciudades', path: ROUTES.ciudads },
      { label: 'Departamentos', path: ROUTES.departamentos },
      { label: 'Categorias', path: ROUTES.categorias },
      { label: 'Comedores', path: ROUTES.comedors },
      { label: 'Unidades', path: ROUTES.unidadesMedida },
    ],
  },
  {
    label: 'Reportes',
    icon: BarChart3,
    items: [
      { label: 'Reportes', path: ROUTES.reports },
    ],
  },
]

export function Sidebar() {
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    const activeGroup = navGroups.find((group) => group.items.some((item) => location.pathname === item.path))
    return activeGroup ? [activeGroup.label] : []
  })

  const toggleGroup = (label: string) => {
    setExpandedGroups((current) =>
      current.includes(label) ? current.filter((groupLabel) => groupLabel !== label) : [...current, label]
    )
  }

  return (
    <aside className="hidden w-full max-w-[260px] flex-col gap-6 overflow-hidden border-r border-border bg-white px-4 py-6 lg:sticky lg:top-[88px] lg:flex lg:h-[calc(100vh-88px)]">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-3 text-lg font-semibold text-brand">
          <span className="rounded-2xl bg-brand-soft px-3 py-2">🍃</span>
          ChefFlow
        </span>
        <p className="text-sm text-text-muted">Gestión de recetas, insumos y proveedores.</p>
      </div>

      <nav className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        {navGroups.map((group) => {
          const groupActive = group.items.some((item) => location.pathname === item.path)
          const expanded = expandedGroups.includes(group.label)
          const GroupIcon = group.icon

          return (
            <div key={group.label} className="space-y-2">
              {group.items.length === 1 ? (
                <Link
                  to={group.items[0].path}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition',
                    groupActive ? 'bg-brand-soft text-brand shadow-sm ring-1 ring-brand/15' : 'text-text-muted hover:bg-neutral'
                  )}
                >
                  <GroupIcon className="h-5 w-5" />
                  {group.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition',
                    groupActive ? 'bg-brand-soft text-brand shadow-sm ring-1 ring-brand/15' : 'text-text-muted hover:bg-neutral'
                  )}
                >
                  <span className="inline-flex items-center gap-3">
                    <GroupIcon className="h-5 w-5" />
                    {group.label}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', expanded ? 'rotate-180' : '')} />
                </button>
              )}

              {group.items.length > 1 && expanded ? (
                <div className="space-y-2 pl-8">
                  {group.items.map((item) => {
                    const active = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'block rounded-3xl px-4 py-3 text-sm font-medium transition',
                          active
                            ? 'bg-brand-soft text-brand shadow-sm ring-1 ring-brand/15'
                            : 'text-text hover:bg-neutral'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
