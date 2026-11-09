import { useLayoutEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { Logo } from './Logo'

/** Short branded first-load reveal; it never reappears during client-side route changes. */
export function SiteLoader() {
  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setVisible(false)
      return
    }

    const root = document.querySelector<HTMLElement>('[data-site-loader]')
    const mark = root?.querySelector<HTMLElement>('[data-loader-mark]')
    const line = root?.querySelector<HTMLElement>('[data-loader-line]')
    if (!root || !mark || !line) {
      setVisible(false)
      return
    }

    const timeline = gsap.timeline({ onComplete: () => setVisible(false) })
    timeline
      .fromTo(mark, { autoAlpha: 0, y: 12, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
      .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: 'power2.inOut' }, '-=0.12')
      .to(root, { autoAlpha: 0, duration: 0.32, delay: 0.08, ease: 'power2.out' })

    return () => {
      timeline.kill()
    }
  }, [])

  if (!visible) return null

  return (
    <div
      data-site-loader
      role="status"
      aria-label="Loading EQISI"
      className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-canvas"
    >
      <div className="flex w-48 flex-col items-center gap-5">
        <div data-loader-mark className="flex flex-col items-center gap-3">
          <Logo className="h-14 w-auto" />
          <span className="text-[10px] font-extrabold tracking-[0.28em] text-fg-muted uppercase">Integrated Solutions</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
          <span data-loader-line className="block h-full origin-left rounded-full bg-linear-to-r from-primary to-highlight" />
        </div>
      </div>
    </div>
  )
}
