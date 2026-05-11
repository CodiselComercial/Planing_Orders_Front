import { useState } from 'react'
import { Lock, User } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/store/authStore'
import { useChangePassword } from '@/features/auth/hooks/useAuth'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const changePassword = useChangePassword()

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Las contraseñas no coinciden' })
      return
    }

    if (formData.newPassword.length < 6) {
      setErrors({ newPassword: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }

    changePassword.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    }, {
      onSuccess: () => {
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    })
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mi Perfil"
        description="Gestiona tu información personal y contraseña"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Información del usuario */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-brand" />
            <h3 className="text-lg font-semibold">Información Personal</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-muted">Nombre</label>
              <p className="text-text">{user?.name || 'No especificado'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-muted">Email</label>
              <p className="text-text">{user?.email || 'No especificado'}</p>
            </div>
          </div>
        </Card>

        {/* Cambiar contraseña */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5 text-brand" />
            <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Contraseña Actual"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              error={errors.currentPassword}
              required
            />
            <Input
              label="Nueva Contraseña"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              error={errors.newPassword}
              required
            />
            <Input
              label="Confirmar Nueva Contraseña"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              error={errors.confirmPassword}
              required
            />
            <Button
              type="submit"
              isLoading={changePassword.isPending}
              className="w-full"
            >
              Cambiar Contraseña
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}