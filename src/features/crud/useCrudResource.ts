import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { apiClient, unwrapApiResponse } from '@/api/client'
import { useAuthStore } from '@/store/authStore'

type CrudItem = Record<string, any>

export function useCrudList(endpoint: string) {
  const accessToken = useAuthStore((state) => state.accessToken)
  return useQuery({
    queryKey: ['crud-resource', endpoint],
    queryFn: async () => {
      const response = await apiClient.get(endpoint)
      return unwrapApiResponse<CrudItem[]>(response)
    },
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60,
    retry: false,
  })
}

export function useCreateCrudItem(endpoint: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CrudItem) => {
      const response = await apiClient.post(endpoint, payload)
      return unwrapApiResponse<CrudItem>(response)
    },
    onSuccess: (createdItem) => {
      queryClient.setQueryData<CrudItem[]>(['crud-resource', endpoint], (current) =>
        current ? [...current, createdItem] : [createdItem]
      )
      queryClient.invalidateQueries({ queryKey: ['crud-resource', endpoint] })
      toast.success('Registro creado')
    },
  })
}

export function useUpdateCrudItem(endpoint: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: CrudItem }) => {
      const response = await apiClient.patch(`${endpoint}/${id}`, payload)
      return unwrapApiResponse<CrudItem>(response)
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<CrudItem[]>(['crud-resource', endpoint], (current) =>
        current
          ? current.map((item) => (item.id === updatedItem.id ? updatedItem : item))
          : [updatedItem]
      )
      queryClient.invalidateQueries({ queryKey: ['crud-resource', endpoint] })
      toast.success('Registro actualizado')
    },
  })
}

export function useDeleteCrudItem(endpoint: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string | number) => {
      await apiClient.delete(`${endpoint}/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crud-resource', endpoint] })
      toast.success('Registro eliminado')
    },
  })
}
