import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/** Appears after scrolling down. Smooth scrolling comes from the global CSS (disabled for reduced motion). */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      inert={!show}
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        'fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-fg shadow-elevated transition-all duration-200 hover:bg-primary/90 motion-safe:hover:-translate-y-1 sm:right-6 sm:bottom-6',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  )
}