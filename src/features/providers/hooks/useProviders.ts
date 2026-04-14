import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { providersApi } from '@/api/providers.api'
import type { CreateProviderPayload, UpdateProviderPayload } from '@/types/provider.types'
import toast from 'react-hot-toast'

export const PROVIDERS_QUERY_KEY = ['providers'] as const

export function useProviders() {
  return useQuery({
    queryKey: PROVIDERS_QUERY_KEY,
    queryFn: providersApi.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function useProvider(id: string) {
  return useQuery({
    queryKey: [...PROVIDERS_QUERY_KEY, id],
    queryFn: () => providersApi.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateProvider() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProviderPayload) => providersApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY })
      toast.success('Proveedor creado exitosamente')
    },
  })
}

export function useUpdateProvider() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProviderPayload }) =>
      providersApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY })
      toast.success('Proveedor actualizado')
    },
  })
}

export function useDeleteProvider() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => providersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROVIDERS_QUERY_KEY })
      toast.success('Proveedor eliminado')
    },
  })
}
