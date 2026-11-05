import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { card, iconTile } from '@/components/ui/surface-styles'
import { cn } from '@/lib/cn'
import { systemIcon } from '@/lib/icons'
import * as c from '@/content/eqisi'

/** Vertical scrolling drives the pinned horizontal rail on desktop; touch devices swipe it natively. */
export function SystemsScroll() {
  const root = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const scene = root.current
    const frame = viewport.current
    const rail = track.current
    const section = scene.closest<HTMLElement>('#systems-preview') ?? scene
    const progressBar = progress.current
    if (!scene || !frame || !rail || !c.systems.length) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, rail.scrollWidth - frame.clientWidth)
      gsap.set(rail, { x: 0 })
      gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top+=88',
          end: () => `+=${distance()}`,
          pin: section,
          pinSpacing: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBar) gsap.set(progressBar, { scaleX: self.progress })
          },
        },
      })
      return () => {
        gsap.set(rail, { clearProps: 'transform' })
        if (progressBar) gsap.set(progressBar, { scaleX: 0 })
      }
    })

    mm.add('(max-width: 1023px), (max-height: 639px), (prefers-reduced-motion: reduce)', () => {
      const cards = rail.querySelectorAll<HTMLElement>('[data-system-card]')
      gsap.fromTo(cards, { autoAlpha: 0, y: 20 }, {
        autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07,
        ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: scene, start: 'top 85%', once: true },
      })
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
      <div ref={viewport} className="systems-horizontal-viewport">
        <div ref={track} className="systems-horizontal-track flex gap-4 lg:gap-5" aria-label="Core competency systems">
          {c.systems.map((system, index) => {
            const Icon = systemIcon(system)
            return (
              <article key={system} data-system-card className={cn(card, 'motion-border systems-feature-card systems-scroll-card min-w-0')}>
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
      </div>
      <div className="systems-scroll-progress mt-4 hidden overflow-hidden rounded-full bg-primary/10 lg:block" aria-hidden="true">
        <span ref={progress} className="block h-1 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-highlight" />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold text-fg-muted">Scroll down to move across the systems <span className="hidden lg:inline">·</span><span className="lg:hidden">swipe horizontally</span></p>
        <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary">
          Explore All Services &amp; Capabilities
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
