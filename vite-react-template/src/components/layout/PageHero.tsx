import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface PageHeroProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  visual?: ReactNode
  large?: boolean
  centered?: boolean
}

/** Shared hero with an optional centered, showcase-style composition. */
export function PageHero({ id, eyebrow, title, description, actions, visual, large = false, centered = false }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // ScrollTrigger: background blobs drift at different speeds while the hero scrolls out,
  // which gives the section depth. Skipped entirely when the user prefers reduced motion.
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]', section).forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      },
      section,
    )

    // Kills the tweens and their ScrollTriggers when the route changes.
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden border-b border-border bg-canvas', centered ? 'pt-6 pb-4 sm:pt-10 sm:pb-8 lg:pt-11 lg:pb-8' : 'py-12 sm:py-20 lg:py-24')}
      aria-labelledby={`${id}-heading`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div data-parallax="35" className="absolute -top-32 right-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div data-parallax="15" className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-highlight/10 blur-3xl" />
      </div>

      <Container className={cn('relative items-center gap-12', centered ? 'flex min-h-[535px] flex-col text-center gap-3 sm:min-h-[660px] sm:gap-6 lg:min-h-[700px]' : visual ? 'grid lg:grid-cols-2' : 'flex')}>
        <div className={cn('relative z-20', centered ? 'mx-auto max-w-3xl' : !visual && 'max-w-3xl')}>
          <div className={cn('animate-hero-in inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold tracking-wider text-warning uppercase shadow-subtle', centered && 'mx-auto')}>
            <span className="size-2 rounded-full bg-highlight" />
            {eyebrow}
          </div>
          <h1
            id={`${id}-heading`}
            className={cn(
              'animate-hero-in hero-d1 mt-4 font-extrabold tracking-tight text-fg',
              large ? 'text-[clamp(2.3rem,9.6vw,5.25rem)] leading-[0.98] text-balance sm:text-[clamp(3.25rem,5.6vw,5.25rem)]' : 'text-3xl sm:text-5xl',
              centered && 'mx-auto max-w-3xl',
            )}
          >
            {title}
          </h1>
          {description && (
            <div className={cn('animate-hero-in hero-d2 mt-3 max-w-[34rem] text-[13px] leading-[1.65] text-fg-muted sm:mt-4 sm:text-lg', centered && 'mx-auto max-w-xl')}>
              {description}
            </div>
          )}
          {actions && <div className={cn('animate-hero-in hero-d3 mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row', centered && 'justify-center [&>a]:min-h-11 [&>a]:w-full [&>a]:justify-center [&>a]:px-4 [&>a]:py-2 [&>a]:text-sm sm:[&>a]:min-h-12 sm:[&>a]:w-auto sm:[&>a]:px-6 sm:[&>a]:py-3 sm:[&>a]:text-base')}>{actions}</div>}
        </div>
        {visual && (
          <div className={cn(centered ? 'pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-end justify-center' : 'animate-hero-in hero-d2 w-full')}>
            {visual}
          </div>
        )}
      </Container>
    </section>
  )
}