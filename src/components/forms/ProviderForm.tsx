import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const providerSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(7, 'Agrega un teléfono válido'),
})

export type ProviderFormValues = z.infer<typeof providerSchema>

interface ProviderFormProps {
  initialValues?: ProviderFormValues
  onSubmit: (values: ProviderFormValues) => void
  submitLabel: string
}

export function ProviderForm({ initialValues, onSubmit, submitLabel }: ProviderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: initialValues ?? { name: '', email: '', phone: '' },
    mode: 'onBlur',
  })

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nombre" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Teléfono" {...register('phone')} error={errors.phone?.message} />
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
