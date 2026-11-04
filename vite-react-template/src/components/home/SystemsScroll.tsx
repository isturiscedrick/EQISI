import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { card, iconTile } from '@/components/ui/surface-styles'
import { cn } from '@/lib/cn'
import { systemIcon } from '@/lib/icons'
import * as c from '@/content/eqisi'

/** Desktop: pin the scene and scrub the six cards horizontally. Mobile: native swipe carousel. */
export function SystemsScroll() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const scene = root.current
    const rail = track.current
    const bar = progress.current
    const section = scene?.closest<HTMLElement>('#systems-preview')
    if (!scene || !rail || !bar || !section || c.systems.length < 2) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, rail.scrollWidth - scene.clientWidth)
      const tween = gsap.to(rail, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top+=88',
          end: () => '+=' + getDistance(),
          scrub: 1,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top+=88',
          end: () => '+=' + getDistance(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.scrollTrigger?.kill()
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
      <div className="systems-scroll-stage flex min-h-[390px] flex-col justify-center gap-8 py-4 md:min-h-[min(66vh,560px)] md:overflow-hidden">
        <div ref={track} className="systems-scroll-track flex w-full gap-4 overflow-x-auto overscroll-x-contain pb-4 md:w-max md:overflow-visible md:pb-2">
          {c.systems.map((system, index) => {
            const Icon = systemIcon(system)
            return (
              <article key={system} className={cn(card, 'motion-border systems-feature-card systems-scroll-card w-[min(82vw,300px)] shrink-0 snap-start sm:w-[320px] md:w-[min(34vw,360px)]')}>
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
        <div className="hidden items-center gap-4 md:flex" aria-hidden="true">
          <span className="text-xs font-bold tracking-[0.18em] text-fg-muted">SCROLL TO EXPLORE</span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-primary/10"><span ref={progress} className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-highlight" /></span>
          <span className="text-xs font-bold text-fg-muted">06 SYSTEMS</span>
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-start">
        <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary">
          Explore All Services &amp; Capabilities
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
