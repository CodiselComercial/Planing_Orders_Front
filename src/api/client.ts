import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:3000'

function normalizeAuthTokens(data: any) {
  const payload = data?.data ?? data
  return {
    access_token: payload?.access_token ?? payload?.accessToken ?? payload?.token ?? '',
    refresh_token: payload?.refresh_token ?? payload?.refreshToken ?? '',
  }
}

export function unwrapApiResponse<T>(response: AxiosResponse<any>): T {
  const payload = response?.data ?? response
  return payload?.data ?? payload
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        )

        const normalized = normalizeAuthTokens(data)
        useAuthStore.getState().setTokens(normalized.access_token, normalized.refresh_token)
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${normalized.access_token}`
        }
        return apiClient(originalRequest)
      } catch {
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    const message = error.response?.data?.message || 'Error inesperado'
    if (error.response?.status !== 401) {
      toast.error(message)
    }
    return Promise.reject(error)
  }
)
