import { useMemo, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Table, type Column } from '@/components/ui/Table'
import type { CrudFieldConfig, CrudResourceConfig } from './crudResources'
import { useCreateCrudItem, useCrudList, useDeleteCrudItem, useUpdateCrudItem } from './useCrudResource'
import { apiClient, unwrapApiResponse } from '@/api/client'
import { useAuthStore } from '@/store/authStore'

type CrudItem = Record<string, any>

const baseInputClass = 'w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

function buildInitialValues(fields: CrudFieldConfig[], item?: CrudItem | null) {
  const values: Record<string, any> = {}
  for (const field of fields) {
    const value = item?.[field.key]
    if (field.type === 'json') {
      values[field.key] = value ? JSON.stringify(value, null, 2) : ''
    } else if (field.type === 'boolean') {
      values[field.key] = Boolean(value)
    } else {
      values[field.key] = value ?? ''
    }
  }
  return values
}

function parsePayload(fields: CrudFieldConfig[], formValues: Record<string, any>) {
  const payload: Record<string, any> = {}
  for (const field of fields) {
    const raw = formValues[field.key]
    if (raw === '' || raw === null || raw === undefined) continue
    if (field.type === 'number') payload[field.key] = Number(raw)
    else if (field.type === 'boolean') payload[field.key] = Boolean(raw)
    else if (field.type === 'json') payload[field.key] = JSON.parse(raw)
    else if (field.type === 'datetime') payload[field.key] = new Date(raw).toISOString()
    else payload[field.key] = raw
  }
  return payload
}

export function GenericCrudPage({ resource }: { resource: CrudResourceConfig }) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CrudItem | null>(null)
  const [deleteId, setDeleteId] = useState<string | number | null>(null)
  const [formValues, setFormValues] = useState<Record<string, any>>(buildInitialValues(resource.fields))
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const accessToken = useAuthStore((state) => state.accessToken)

  const listQuery = useCrudList(resource.endpoint)
  const createMutation = useCreateCrudItem(resource.endpoint)
  const updateMutation = useUpdateCrudItem(resource.endpoint)
  const deleteMutation = useDeleteCrudItem(resource.endpoint)
  const idField = resource.idField ?? 'id'
  const relatedEndpoints = useMemo(
    () => [...new Set(resource.fields.filter((field) => field.relationEndpoint).map((field) => field.relationEndpoint as string))],
    [resource.fields]
  )
  const relatedQueries = useQueries({
    queries: relatedEndpoints.map((endpoint) => ({
      queryKey: ['crud-rel-options', endpoint],
      queryFn: async () => {
        const response = await apiClient.get(endpoint)
        return unwrapApiResponse<CrudItem[]>(response)
      },
      enabled: Boolean(accessToken),
      staleTime: 1000 * 60 * 5,
      retry: false,
    })),
  })
  const relatedOptionsByEndpoint = useMemo(() => {
    const map: Record<string, CrudItem[]> = {}
    relatedEndpoints.forEach((endpoint, index) => {
      map[endpoint] = relatedQueries[index]?.data ?? []
    })
    return map
  }, [relatedEndpoints, relatedQueries])

  const items = listQuery.data ?? []
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const term = search.toLowerCase()
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(term))
  }, [items, search])

  const openCreate = () => {
    setSelectedItem(null)
    setFormErrors({})
    setFormValues(buildInitialValues(resource.fields))
    setIsModalOpen(true)
  }

  const openEdit = (item: CrudItem) => {
    setSelectedItem(item)
    setFormErrors({})
    setFormValues(buildInitialValues(resource.fields, item))
    setIsModalOpen(true)
  }

  const tableColumns = useMemo<Column<CrudItem>[]>(() => {
    const visibleFields = resource.fields.slice(0, 4)
    const dataColumns: Column<CrudItem>[] = visibleFields.map((field) => ({
      header: field.label,
      render: (item) => {
        const value = item[field.key]
        if (typeof value === 'object' && value !== null) return JSON.stringify(value)
        if (typeof value === 'boolean') return value ? 'Si' : 'No'
        return String(value ?? '-')
      },
    }))

    return [
      ...dataColumns,
      {
        header: 'Acciones',
        render: (item) => (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => openEdit(item)}>Editar</Button>
            <Button variant="danger" size="sm" onClick={() => setDeleteId(item[idField])}>Eliminar</Button>
          </div>
        ),
      },
    ]
  }, [resource.fields, idField, openEdit])

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setFormErrors({})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const requiredErrors: Record<string, string> = {}
    resource.fields.forEach((field) => {
      if (!field.required) return
      const value = formValues[field.key]
      if (value === '' || value === null || value === undefined) {
        requiredErrors[field.key] = `${field.label} es requerido`
      }
    })
    if (Object.keys(requiredErrors).length > 0) {
      setFormErrors(requiredErrors)
      toast.error('Completa los campos requeridos')
      return
    }

    try {
      const payload = parsePayload(resource.fields, formValues)
      if (selectedItem) {
        updateMutation.mutate({ id: selectedItem[idField], payload })
      } else {
        createMutation.mutate(payload)
      }
      closeModal()
    } catch {
      toast.error('Revisa los campos JSON o fecha antes de guardar')
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={resource.title}
        description={`CRUD conectado a ${resource.endpoint}`}
        actions={<Button onClick={openCreate} leftIcon={<Plus className="h-4 w-4" />}>Nuevo</Button>}
      />

      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar..."
          className="w-full rounded-3xl border border-border bg-white py-3 pl-12 pr-4 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <Table columns={tableColumns} data={filteredItems} loading={listQuery.isLoading} emptyLabel="No hay registros" />

      <Modal open={isModalOpen} title={selectedItem ? `Editar ${resource.title}` : `Nuevo ${resource.title}`} onClose={closeModal} size="lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {resource.fields.map((field) => {
            if (field.type === 'boolean') {
              return (
                <label key={field.key} className="flex items-center gap-3 text-sm text-text-muted">
                  <input
                    type="checkbox"
                    checked={Boolean(formValues[field.key])}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, [field.key]: event.target.checked }))}
                  />
                  {field.label}
                </label>
              )
            }

            if (field.type === 'json') {
              return (
                <label key={field.key} className="space-y-2 text-sm text-text-muted">
                  <span className="font-medium text-text">{field.label}</span>
                  <textarea
                    value={String(formValues[field.key] ?? '')}
                    onChange={(event) => setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
                    className={`${baseInputClass} min-h-[140px]`}
                    placeholder='[{"insumoId":"...","cantidad":1}]'
                  />
                  {formErrors[field.key] ? <p className="text-xs text-[#F03E3E]">{formErrors[field.key]}</p> : null}
                </label>
              )
            }

            if (field.relationEndpoint) {
              const options = relatedOptionsByEndpoint[field.relationEndpoint] ?? []
              const valueKey = field.relationValueKey ?? 'id'
              const labelKey = field.relationLabelKey ?? 'name'
              return (
                <label key={field.key} className="space-y-2 text-sm text-text-muted">
                  <span className="font-medium text-text">{field.label}</span>
                  <select
                    value={String(formValues[field.key] ?? '')}
                    onChange={(event) => {
                      setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                      setFormErrors((prev) => ({ ...prev, [field.key]: '' }))
                    }}
                    className={baseInputClass}
                  >
                    <option value="">Selecciona una opcion</option>
                    {options.map((option) => (
                      <option key={String(option[valueKey])} value={String(option[valueKey])}>
                        {String(option[labelKey] ?? option[valueKey])}
                      </option>
                    ))}
                  </select>
                  {formErrors[field.key] ? <p className="text-xs text-[#F03E3E]">{formErrors[field.key]}</p> : null}
                </label>
              )
            }

            return (
              <Input
                key={field.key}
                label={field.label}
                type={field.type === 'number' ? 'number' : field.type === 'datetime' ? 'datetime-local' : 'text'}
                required={field.required}
                value={String(formValues[field.key] ?? '')}
                onChange={(event) => {
                  setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                  setFormErrors((prev) => ({ ...prev, [field.key]: '' }))
                }}
                error={formErrors[field.key]}
              />
            )
          })}
          <div className="flex justify-end">
            <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>Guardar</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={deleteId !== null}
        title="Eliminar registro"
        description="Esta accion no se puede deshacer."
        severity="error"
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) deleteMutation.mutate(deleteId)
          setDeleteId(null)
        }}
      />
    </div>
  )
}
