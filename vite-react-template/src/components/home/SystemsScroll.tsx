import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { card, iconTile } from '@/components/ui/surface-styles'
import { cn } from '@/lib/cn'
import { systemIcon } from '@/lib/icons'
import * as c from '@/content/eqisi'

/** Responsive competency grid. ScrollTrigger reveals cards without pinning or hiding content. */
export function SystemsScroll() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scene = root.current
    if (!scene || c.systems.length < 1) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = scene.querySelectorAll<HTMLElement>('[data-system-card]')
      if (!cards.length) return

      gsap.fromTo(cards,
        { autoAlpha: 0, y: 34, scale: 0.975 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.11,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: scene,
            start: 'top 82%',
            once: true,
          },
        },
      )
    })

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('resize', refresh)
    return () => {
      window.removeEventListener('resize', refresh)
      mm.revert()
    }
  }, [])

  return (
    <div ref={root} className="systems-scroll-scene relative">
      <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {c.systems.map((system, index) => {
          const Icon = systemIcon(system)
          return (
            <article
              key={system}
              data-system-card
              className={cn(card, 'motion-border systems-feature-card systems-scroll-card min-w-0')}
            >
              <div className="flex items-center justify-between">
                <span className={cn(iconTile, 'systems-icon-tile')}><Icon aria-hidden="true" className="size-6" /></span>
                <span className="systems-card-number text-sm font-bold tracking-widest text-warning">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <details className="group/system systems-card-details mt-5">
                <summary className="systems-card-summary flex cursor-pointer list-none items-center justify-between gap-2 text-left text-base font-semibold text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                  <span>{system}</span>
                  <span className="shrink-0 text-xs font-bold text-primary underline underline-offset-4 group-open/system:hidden">View details</span>
                  <span className="hidden shrink-0 text-xs font-bold text-primary underline underline-offset-4 group-open/system:inline">Hide details</span>
                </summary>
                <div className="systems-card-expanded">
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">Discover how this system supports connected workforce and supply-chain operations.</p>
                  <Link to="/services#systems" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Full details <ArrowRight aria-hidden="true" className="size-4" /></Link>
                </div>
              </details>
            </article>
          )
        })}
      </div>
      <div className="mt-7 flex justify-center md:justify-start">
        <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary">
          Explore All Services &amp; Capabilities
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
