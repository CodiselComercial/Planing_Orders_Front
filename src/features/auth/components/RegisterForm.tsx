import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const registerSchema = z.object({
  name: z.string().min(3, 'Tu nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  perfilId: z.string().min(1, 'Perfil ID requerido'),
  comedorId: z.string().min(1, 'Comedor ID requerido'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  isLoading?: boolean
  perfils: Array<{ id: string; name?: string }>
  comedors: Array<{ id: string; nombre?: string }>
}

export function RegisterForm({ onSubmit, isLoading, perfils, comedors }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Nombre" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Contraseña" type="password" {...register('password')} error={errors.password?.message} />
      <label className="space-y-2 text-sm text-text-muted">
        <span className="font-medium text-text">Perfil</span>
        <select
          {...register('perfilId')}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="">Selecciona un perfil</option>
          {perfils.map((perfil) => (
            <option key={perfil.id} value={perfil.id}>
              {perfil.name ?? perfil.id}
            </option>
          ))}
        </select>
        {errors.perfilId ? <p className="text-xs text-[#F03E3E]">{errors.perfilId.message}</p> : null}
      </label>
      <label className="space-y-2 text-sm text-text-muted">
        <span className="font-medium text-text">Comedor</span>
        <select
          {...register('comedorId')}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="">Selecciona un comedor</option>
          {comedors.map((comedor) => (
            <option key={comedor.id} value={comedor.id}>
              {comedor.nombre ?? comedor.id}
            </option>
          ))}
        </select>
        {errors.comedorId ? <p className="text-xs text-[#F03E3E]">{errors.comedorId.message}</p> : null}
      </label>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Crear cuenta
        </Button>
      </div>
    </form>
  )
}
