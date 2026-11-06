import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

/** Appears after scrolling down and shows how far through the page the reader has travelled. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setShow(window.scrollY > 600)
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const circumference = 2 * Math.PI * 22

  return (
    <button
      type="button"
      aria-label={`Back to top, page ${Math.round(progress * 100)} percent`}
      inert={!show}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className={cn(
        'back-to-top-progress fixed right-4 bottom-4 z-[25] inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-fg shadow-elevated transition-all duration-200 hover:bg-primary/90 motion-safe:hover:-translate-y-1 sm:right-6 sm:bottom-6',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="2" />
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} className="back-to-top-ring" />
      </svg>
      <ArrowUp aria-hidden="true" className="relative size-5" />
    </button>
  )
}