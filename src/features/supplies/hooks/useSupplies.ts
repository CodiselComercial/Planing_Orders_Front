import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { suppliesApi } from '@/api/supplies.api'
import type { CreateSupplyPayload, UpdateSupplyPayload } from '@/types/supply.types'
import toast from 'react-hot-toast'

export const SUPPLIES_QUERY_KEY = ['supplies'] as const

export function useSupplies() {
  return useQuery({
    queryKey: SUPPLIES_QUERY_KEY,
    queryFn: suppliesApi.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function useSupply(id: string) {
  return useQuery({
    queryKey: [...SUPPLIES_QUERY_KEY, id],
    queryFn: () => suppliesApi.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateSupply() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateSupplyPayload) => suppliesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIES_QUERY_KEY })
      toast.success('Insumo creado exitosamente')
    },
  })
}

export function useUpdateSupply() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSupplyPayload }) =>
      suppliesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIES_QUERY_KEY })
      toast.success('Insumo actualizado')
    },
  })
}

export function useDeleteSupply() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => suppliesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIES_QUERY_KEY })
      toast.success('Insumo eliminado')
    },
  })
}
