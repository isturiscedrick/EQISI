import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

export interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap ' +
  'transition-all duration-200 ease-out ' +
  'not-disabled:motion-safe:hover:-translate-y-0.5 not-disabled:motion-safe:active:translate-y-0 ' +
  'aria-disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  // `magnetic` is a marker class: useMagneticButtons() in RootLayout finds it and pulls the button toward the pointer.
  primary: 'magnetic bg-primary text-primary-fg hover:bg-primary/90 hover:shadow-card active:bg-primary/80',
  secondary:
    'border border-border bg-surface text-fg hover:border-primary/50 hover:bg-surface-muted hover:shadow-subtle active:bg-surface-muted/70',
  ghost: 'text-fg hover:bg-surface-muted active:bg-surface-muted/70',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export function buttonStyles({ variant = 'primary', size = 'md' }: ButtonStyleOptions = {}) {
  return cn(base, variants[variant], sizes[size])
}