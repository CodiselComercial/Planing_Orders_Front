import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(value: string) {
  return format(new Date(value), "dd 'de' MMM yyyy")
}

export function getGreeting(name: string) {
  const hour = new Date().getHours()
  const label = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'
  return `${label}, ${name}`
}
