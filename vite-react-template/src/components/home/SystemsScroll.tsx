import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { card, iconTile } from '@/components/ui/surface-styles'
import { cn } from '@/lib/cn'
import { systemIcon } from '@/lib/icons'
import * as c from '@/content/eqisi'

/**
 * Desktop: vertical page scrolling drives a pinned horizontal card track.
 * Touch layouts: keep a native horizontal swipe track so every card remains reachable.
 */
export function SystemsScroll() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const scene = root.current
    const rail = track.current
    const progressBar = progress.current
    if (!scene || !rail || !c.systems.length) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        desktop: '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
        compact: '(max-width: 1023px), (max-height: 639px)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const conditions = context.conditions as { desktop: boolean; compact: boolean; reduced: boolean }

        if (conditions.desktop) {
          const getDistance = () => Math.max(0, rail.scrollWidth - scene.clientWidth)

          gsap.to(rail, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top top+=80',
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (progressBar) gsap.set(progressBar, { scaleX: self.progress })
              },
            },
          })

          return () => {
            if (progressBar) gsap.set(progressBar, { scaleX: 0 })
          }
        }

        if (conditions.compact) {
          const cards = rail.querySelectorAll<HTMLElement>('[data-system-card]')
          gsap.fromTo(cards,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: 'power2.out',
              clearProps: 'all',
              scrollTrigger: { trigger: scene, start: 'top 85%', once: true },
            },
          )
        }
      },
    )

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
      <div
        ref={track}
        className="systems-horizontal-track flex w-full gap-4 overflow-x-auto pb-3 snap-x snap-mandatory lg:gap-5 lg:overflow-visible lg:pb-0 lg:snap-none"
        aria-label="Core competency systems"
      >
        {c.systems.map((system, index) => {
          const Icon = systemIcon(system)
          return (
            <article
              key={system}
              data-system-card
              className={cn(card, 'motion-border systems-feature-card systems-scroll-card min-w-0 snap-start')}
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

      <div className="systems-scroll-progress mt-4 hidden overflow-hidden rounded-full bg-primary/10 lg:block" aria-hidden="true">
        <span ref={progress} className="block h-1 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-highlight" />
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold text-fg-muted">Scroll to move across the systems <span className="hidden lg:inline">·</span><span className="lg:hidden">or swipe horizontally</span></p>
        <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary">
          Explore All Services &amp; Capabilities
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
