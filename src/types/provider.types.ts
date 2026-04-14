export interface Provider {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

export interface CreateProviderPayload {
  name: string
  email: string
  phone: string
}

export type UpdateProviderPayload = Partial<CreateProviderPayload>
