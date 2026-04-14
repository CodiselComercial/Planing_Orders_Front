import { apiClient, unwrapApiResponse } from './client'
import type { CreateProviderPayload, Provider, UpdateProviderPayload } from '@/types/provider.types'

export const providersApi = {
  getAll: async (): Promise<Provider[]> => {
    const response = await apiClient.get('/providers')
    return unwrapApiResponse<Provider[]>(response)
  },

  getById: async (id: string): Promise<Provider> => {
    const response = await apiClient.get(`/providers/${id}`)
    return unwrapApiResponse<Provider>(response)
  },

  create: async (payload: CreateProviderPayload): Promise<Provider> => {
    const response = await apiClient.post('/providers', payload)
    return unwrapApiResponse<Provider>(response)
  },

  update: async (id: string, payload: UpdateProviderPayload): Promise<Provider> => {
    const response = await apiClient.patch(`/providers/${id}`, payload)
    return unwrapApiResponse<Provider>(response)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/providers/${id}`)
  },
}
