import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface ScrollProgressTrackProps {
  /** Number of equal columns the track sits above. One dot is drawn per step. */
  steps: number
  children: ReactNode
}

/**
 * A line above a row of steps that fills as the row scrolls through the viewport,
 * lighting each dot when the line reaches it. Desktop only; the default (CSS) state is fully filled,
 * so reduced-motion users see the finished track.
 */
export function ScrollProgressTrack({ steps, children }: ScrollProgressTrackProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const fill = fillRef.current
    if (!root || !fill) return

    const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-track-dot]'))
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      })
      timeline.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      dots.forEach((dot, i) => {
        timeline.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.06, ease: 'back.out(2)' }, (i + 0.5) / steps - 0.03)
      })
    })

    return () => mm.revert()
  }, [steps])

  return (
    <div ref={rootRef}>
      <div aria-hidden="true" className="relative mb-6 hidden h-6 lg:block">
        <div className="absolute inset-x-0 top-2.5 h-1 rounded-full bg-border" />
        <div ref={fillRef} className="absolute inset-x-0 top-2.5 h-1 origin-left rounded-full bg-highlight" />
        {Array.from({ length: steps }, (_, i) => (
          <span
            key={i}
            className="absolute top-0 grid size-6 place-items-center rounded-full border-2 border-border bg-surface"
            style={{ left: `${((i + 0.5) / steps) * 100}%`, marginLeft: '-0.75rem' }}
          >
            <span data-track-dot className="size-3 rounded-full bg-highlight" />
          </span>
        ))}
      </div>
      {children}
    </div>
  )
}