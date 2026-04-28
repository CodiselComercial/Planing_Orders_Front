export interface User {
  id: string
  name: string
  email: string
  perfilId: string
  comedorId: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  perfilId: string
  comedorId: string
}

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, 'password'>>
