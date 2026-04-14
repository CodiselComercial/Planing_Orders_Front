import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { useProviders } from '@/features/providers/hooks/useProviders'
import { useRecipes } from '@/features/recipes/hooks/useRecipes'
import { useSupplies } from '@/features/supplies/hooks/useSupplies'
import { getGreeting } from '@/lib/utils'

export default function DashboardPage() {
  const recipesQuery = useRecipes()
  const providersQuery = useProviders()
  const suppliesQuery = useSupplies()
  const userName = 'Chef'

  const recipes = recipesQuery.data ?? []
  const supplies = suppliesQuery.data ?? []
  const providers = providersQuery.data ?? []

  const activeRecipes = recipes.filter((item) => item.isActive).length
  const chartData = providers.map((provider) => ({
    provider: provider.name,
    value: supplies.filter((supply) => supply.providerId === provider.id).length,
  }))

  return (
    <div className="space-y-8">
      <PageHeader title={getGreeting(userName)} description="Resumen rápido de tu cocina, proveedores e insumos." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-text-muted">Total Recetas</p>
          <p className="mt-4 text-3xl font-semibold text-text">{recipes.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Recetas Activas</p>
          <p className="mt-4 text-3xl font-semibold text-text">{activeRecipes}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Proveedores</p>
          <p className="mt-4 text-3xl font-semibold text-text">{providers.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Insumos</p>
          <p className="mt-4 text-3xl font-semibold text-text">{supplies.length}</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Distribución de insumos</p>
              <h2 className="mt-2 text-xl font-semibold text-text">Por proveedor</h2>
            </div>
          </div>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="provider" tick={{ fill: '#4A7C59', fontSize: 12 }} />
                <YAxis tick={{ fill: '#4A7C59', fontSize: 12 }} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#52B788" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-text">Últimas recetas</h3>
            {recipes.length === 0 ? (
              <EmptyState title="No hay recetas" description="Crea una receta para comenzar a gestionar tu menú." />
            ) : (
              <div className="space-y-4">
                {recipes.slice(0, 5).map((recipe) => (
                  <div key={recipe.id} className="rounded-3xl border border-border bg-neutral p-4">
                    <p className="font-semibold text-text">{recipe.name}</p>
                    <p className="text-sm text-text-muted">{recipe.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-text">Últimos insumos</h3>
            {supplies.length === 0 ? (
              <EmptyState title="No hay insumos" description="Agrega un insumo para monitorear el stock." />
            ) : (
              <div className="space-y-3">
                {supplies.slice(0, 5).map((supply) => (
                  <div key={supply.id} className="rounded-3xl border border-border bg-neutral p-4">
                    <p className="font-semibold text-text">{supply.name}</p>
                    <p className="text-sm text-text-muted">Proveedor: {providers.find((item) => item.id === supply.providerId)?.name ?? 'Desconocido'}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
