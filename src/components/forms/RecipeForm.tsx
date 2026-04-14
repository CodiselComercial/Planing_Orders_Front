import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const recipeSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'Describe mejor la receta'),
  isActive: z.boolean().optional(),
})

export type RecipeFormValues = z.infer<typeof recipeSchema>

interface RecipeFormProps {
  initialValues?: RecipeFormValues
  onSubmit: (values: RecipeFormValues) => void
  submitLabel: string
}

export function RecipeForm({ initialValues, onSubmit, submitLabel }: RecipeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      isActive: initialValues?.isActive ?? true,
    },
    mode: 'onBlur',
  })

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nombre" {...register('name')} error={errors.name?.message} />
      <Input
        label="Descripción"
        {...register('description')}
        error={errors.description?.message}
        className="min-h-[120px] rounded-[1rem] px-4 py-3"
      />
      <label className="flex items-center gap-3 text-sm text-text-muted">
        <input type="checkbox" {...register('isActive')} className="h-4 w-4 rounded border-border text-brand" />
        Receta activa
      </label>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
