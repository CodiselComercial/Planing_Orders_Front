import { apiClient, unwrapApiResponse } from './client'
import type { CreateSupplyPayload, Supply, UpdateSupplyPayload } from '@/types/supply.types'

export const suppliesApi = {
  getAll: async (): Promise<Supply[]> => {
    const response = await apiClient.get('/supplies')
    return unwrapApiResponse<Supply[]>(response)
  },

  getById: async (id: string): Promise<Supply> => {
    const response = await apiClient.get(`/supplies/${id}`)
    return unwrapApiResponse<Supply>(response)
  },

  getByProvider: async (providerId: string): Promise<Supply[]> => {
    const response = await apiClient.get(`/supplies/by-provider/${providerId}`)
    return unwrapApiResponse<Supply[]>(response)
  },

  create: async (payload: CreateSupplyPayload): Promise<Supply> => {
    const response = await apiClient.post('/supplies', payload)
    return unwrapApiResponse<Supply>(response)
  },

  update: async (id: string, payload: UpdateSupplyPayload): Promise<Supply> => {
    const response = await apiClient.patch(`/supplies/${id}`, payload)
    return unwrapApiResponse<Supply>(response)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/supplies/${id}`)
  },
}
