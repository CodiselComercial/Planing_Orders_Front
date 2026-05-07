export interface User {
  id: string
  name: string
  email: string
  perfilId?: string
  comedorId?: string
  createdAt?: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}
