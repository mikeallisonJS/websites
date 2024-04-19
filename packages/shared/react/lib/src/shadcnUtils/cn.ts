import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
