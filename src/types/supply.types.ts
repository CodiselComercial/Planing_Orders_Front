import type { Provider } from '@/types/provider.types'

export interface Supply {
  id: string
  name: string
  quantity: number
  providerId: string
  provider?: Provider
  createdAt: string
  updatedAt: string
}

export interface CreateSupplyPayload {
  name: string
  quantity: number
  providerId: string
}

export type UpdateSupplyPayload = Partial<CreateSupplyPayload>
