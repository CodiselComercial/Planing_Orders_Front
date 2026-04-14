import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { type Provider } from '@/types/provider.types'

const supplySchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  quantity: z.number().min(0, 'Cantidad no puede ser negativa'),
  providerId: z.string().min(1, 'Selecciona un proveedor'),
})

export type SupplyFormValues = z.infer<typeof supplySchema>

interface SupplyFormProps {
  providers: Provider[]
  initialValues?: SupplyFormValues
  onSubmit: (values: SupplyFormValues) => void
  submitLabel: string
}

export function SupplyForm({ providers, initialValues, onSubmit, submitLabel }: SupplyFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SupplyFormValues>({
    resolver: zodResolver(supplySchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      quantity: initialValues?.quantity ?? 0,
      providerId: initialValues?.providerId ?? '',
    },
    mode: 'onBlur',
  })

  const providerOptions = useMemo(
    () => providers.map((provider) => ({ value: provider.id, label: provider.name })),
    [providers]
  )

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nombre" {...register('name')} error={errors.name?.message} />
      <Input
        label="Cantidad"
        type="number"
        step="1"
        {...register('quantity', { valueAsNumber: true })}
        error={errors.quantity?.message}
      />
      <label className="space-y-2 text-sm text-text-muted">
        <span className="font-medium text-text">Proveedor</span>
        <select
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          {...register('providerId')}
          onChange={(event) => setValue('providerId', event.target.value)}
        >
          <option value="">Selecciona un proveedor</option>
          {providerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.providerId ? <p className="text-xs text-[#F03E3E]">{errors.providerId.message}</p> : null}
      </label>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
