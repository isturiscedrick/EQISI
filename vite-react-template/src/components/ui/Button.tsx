import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { buttonStyles, type ButtonStyleOptions } from './button-styles'

interface ButtonProps extends ComponentProps<'button'>, ButtonStyleOptions {
  /** Shows a spinner and blocks interaction, e.g. while a form is submitting. */
  loading?: boolean
}

/** Use for actions. For navigation, use ButtonLink. */
export function Button({
  variant,
  size,
  loading = false,
  disabled,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
      {children}
    </button>
  )
}

interface ButtonLinkProps extends ComponentProps<typeof Link>, ButtonStyleOptions {}

/** A router link that looks like a button. */
export function ButtonLink({ variant, size, className, ...rest }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...rest} />
}
