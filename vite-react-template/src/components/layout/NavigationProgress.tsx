import { useNavigation } from 'react-router'
import { cn } from '@/lib/cn'

/** Thin bar plus a screen reader announcement while a lazy route is loading. */
export function NavigationProgress() {
  const loading = useNavigation().state === 'loading'
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-0.5 bg-primary transition-opacity duration-200',
          loading ? 'opacity-100' : 'opacity-0',
        )}
      />
      <p role="status" className="sr-only">
        {loading ? 'Loading page' : ''}
      </p>
    </>
  )
}
