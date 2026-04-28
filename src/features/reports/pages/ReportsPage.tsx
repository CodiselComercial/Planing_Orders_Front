import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useCrudList } from '@/features/crud/useCrudResource'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

export default function ReportsPage() {
  const reportesQuery = useCrudList('/reporte-costos')
  const reportes = reportesQuery.data ?? []

  const chartData = useMemo(
    () =>
      reportes.map((item: Record<string, any>) => ({
        label: item.comedorNombre ?? 'Sin nombre',
        costoTotal: Number(item.costoTotal ?? 0),
      })),
    [reportes]
  )

  return (
    <div className="space-y-8">
      <PageHeader title="Reportes de costos" description="Datos desde /reporte-costos con visualizacion de costo total." />

      <Card>
        <p className="text-sm text-text-muted">Total reportes</p>
        <p className="mt-2 text-3xl font-semibold text-text">{reportes.length}</p>
      </Card>

      <Card>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-text">Costo total por comedor</h2>
          <p className="text-sm text-text-muted">Grafica en tiempo real consumiendo tu API.</p>
        </div>
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#4A7C59', fontSize: 12 }} />
              <YAxis tick={{ fill: '#4A7C59', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="costoTotal" fill="#52B788" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
