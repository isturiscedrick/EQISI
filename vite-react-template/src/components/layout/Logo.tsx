import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

/** EQISI logo. In dark mode it sits on a white plate, because the blue wordmark is too dark for the dark canvas. */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={asset('logo.webp')}
      alt="EQISI"
      width={592}
      height={213}
      className={cn('w-auto', className)}
    />
  )
}