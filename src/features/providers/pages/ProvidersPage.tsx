import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { ProviderForm } from '@/components/forms/ProviderForm'
import { useCreateProvider, useDeleteProvider, useProviders, useUpdateProvider } from '@/features/providers/hooks/useProviders'
import { useDebounce } from '@/hooks/useDebounce'
import type { Provider } from '@/types/provider.types'

export default function ProvidersPage() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)
  const providersQuery = useProviders()
  const createProvider = useCreateProvider()
  const updateProvider = useUpdateProvider()
  const deleteProvider = useDeleteProvider()

  const providers = providersQuery.data ?? []
  const filtered = useMemo(
    () => providers.filter((provider) =>
      provider.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    ),
    [debouncedSearch, providers]
  )

  const openEdit = (provider: Provider) => {
    setSelectedProvider(provider)
    setIsModalOpen(true)
  }

  const handleSubmit = (values: { name: string; email: string; phone: string }) => {
    if (selectedProvider) {
      updateProvider.mutate({ id: selectedProvider.id, payload: values })
    } else {
      createProvider.mutate(values)
    }
    setIsModalOpen(false)
    setSelectedProvider(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteProvider.mutate(deleteId)
    }
    setConfirmOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Proveedores" description="Administra tus proveedores y su relación con los insumos." actions={
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>Nuevo proveedor</Button>
      } />

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar proveedor..."
            className="w-full rounded-3xl border border-border bg-white py-3 pl-12 pr-4 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      {providersQuery.isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-[1.5rem] bg-white" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No hay proveedores todavía"
          description="Agrega proveedores para comenzar a vincular los insumos y mantener el stock." 
          action={<Button onClick={() => setIsModalOpen(true)}>Agregar proveedor</Button>}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((provider) => (
            <div key={provider.id} className="grid gap-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-soft sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="font-semibold text-text">{provider.name}</p>
                <p className="text-sm text-text-muted">{provider.email} · {provider.phone}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => openEdit(provider)}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => { setDeleteId(provider.id); setConfirmOpen(true) }}>Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        title={selectedProvider ? 'Editar proveedor' : 'Nuevo proveedor'}
        onClose={() => { setIsModalOpen(false); setSelectedProvider(null) }}
        size="md"
      >
        <ProviderForm
          initialValues={selectedProvider ? { name: selectedProvider.name, email: selectedProvider.email, phone: selectedProvider.phone } : undefined}
          submitLabel={selectedProvider ? 'Guardar' : 'Crear'}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar proveedor"
        description="Si tiene insumos vinculados, eliminarlo puede afectar el inventario." 
        severity="warning"
        isLoading={deleteProvider.status === 'pending'}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
