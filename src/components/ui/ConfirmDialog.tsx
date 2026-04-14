import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from './Button'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  severity?: 'warning' | 'error'
  isLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  severity = 'warning',
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const accent = severity === 'error' ? 'bg-[#F03E3E]/10 text-[#B71C1C]' : 'bg-[#FFF4D9]/90 text-[#A36C00]'
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-[1.25rem] border border-border bg-white p-6 shadow-soft">
              <div className={`mb-4 rounded-3xl px-4 py-3 ${accent}`}>
                <p className="font-semibold">{title}</p>
              </div>
              <p className="text-sm text-text-muted">{description}</p>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="ghost" onClick={onCancel} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                  Confirmar
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
