import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

const config = {
  info: { icon: Info, border: 'border-info', iconColor: 'text-info' },
  success: { icon: CircleCheck, border: 'border-success', iconColor: 'text-success' },
  warning: { icon: TriangleAlert, border: 'border-warning', iconColor: 'text-warning' },
  danger: { icon: CircleAlert, border: 'border-danger', iconColor: 'text-danger' },
} satisfies Record<AlertVariant, { icon: typeof Info; border: string; iconColor: string }>

interface AlertProps {
  variant?: AlertVariant
  title: string
  children?: ReactNode
}

/** Status message. Meaning is carried by icon and text, never by color alone. */
export function Alert({ variant = 'info', title, children }: AlertProps) {
  const { icon: Icon, border, iconColor } = config[variant]
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-md border-l-4 bg-surface p-4 shadow-subtle', border)}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', iconColor)} />
      <div>
        <p className="font-semibold">{title}</p>
        {children && <p className="mt-1 text-sm text-fg-muted">{children}</p>}
      </div>
    </div>
  )
}
