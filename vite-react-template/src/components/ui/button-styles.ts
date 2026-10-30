import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

export interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap ' +
  'transition-colors duration-150 ease-out ' +
  'aria-disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:bg-primary/90 active:bg-primary/80',
  secondary:
    'border border-border bg-surface text-fg hover:bg-surface-muted active:bg-surface-muted/70',
  ghost: 'text-fg hover:bg-surface-muted active:bg-surface-muted/70',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export function buttonStyles({ variant = 'primary', size = 'md' }: ButtonStyleOptions = {}) {
  return cn(base, variants[variant], sizes[size])
}
