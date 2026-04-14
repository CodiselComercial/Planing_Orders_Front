import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/authStore'
import type { LoginPayload, RegisterPayload } from '@/types/auth.types'
import toast from 'react-hot-toast'

function normalizeAuthResponse(data: any) {
  const payload = data?.data ?? data
  return {
    user: payload.user,
    access_token: payload.access_token ?? payload.accessToken ?? payload.token ?? '',
    refresh_token: payload.refresh_token ?? payload.refreshToken ?? '',
  }
}

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = normalizeAuthResponse(response)
      if (!access_token || !refresh_token) {
        toast.error('No se recibieron los tokens correctos del servidor.')
        return
      }
      setAuth(user, access_token, refresh_token)
      toast.success('Bienvenido de nuevo')
      navigate('/')
    },
  })
}

export function useRegister() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (response) => {
      const { user, access_token, refresh_token } = normalizeAuthResponse(response)
      if (!access_token || !refresh_token) {
        toast.error('No se recibieron los tokens correctos del servidor.')
        return
      }
      setAuth(user, access_token, refresh_token)
      toast.success('Cuenta creada con éxito')
      navigate('/')
    },
  })
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout)
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout()
      window.location.href = '/login'
    },
  })
}
