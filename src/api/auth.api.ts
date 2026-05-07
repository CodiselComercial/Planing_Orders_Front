import { apiClient } from './client'
import type { AuthTokens, LoginPayload, RegisterPayload, User } from '@/types/auth.types'

function unwrapResponse<T>(response: any): T {
  return response.data ?? response
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthTokens & { user: User }> => {
    const { data } = await apiClient.post('/auth/login', payload)
    return unwrapResponse<AuthTokens & { user: User }>(data)
  },

  register: async (payload: RegisterPayload): Promise<AuthTokens & { user: User }> => {
    const { name, email, password } = payload
    const { data } = await apiClient.post('/auth/register', { name, email, password })
    return unwrapResponse<AuthTokens & { user: User }>(data)
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refresh: async (refreshToken: string): Promise<AuthTokens> => {
    const { data } = await apiClient.post(
      '/auth/refresh',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )
    return unwrapResponse<AuthTokens>(data)
  },
}
