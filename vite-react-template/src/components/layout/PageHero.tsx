import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface PageHeroProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  visual?: ReactNode
  sideVisual?: ReactNode
  large?: boolean
  centered?: boolean
  className?: string
}

/** Shared hero with an optional centered, showcase-style composition. */
export function PageHero({ id, eyebrow, title, description, actions, visual, sideVisual, large = false, centered = false, className }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // GSAP owns the cinematic entrance and scroll depth. Reduced-motion users get the static layout.
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const eyebrow = section.querySelector<HTMLElement>('[data-hero-step="eyebrow"]')
      const title = section.querySelector<HTMLElement>('[data-hero-step="title"]')
      const description = section.querySelector<HTMLElement>('[data-hero-step="description"]')
      const actions = section.querySelector<HTMLElement>('[data-hero-step="actions"]')
      const visual = section.querySelector<HTMLElement>('[data-hero-visual]')
      const pointerFine = window.matchMedia('(pointer: fine)').matches
      const setSpotX = gsap.quickTo(section, '--spot-x', { duration: 0.55, ease: 'power3.out', unit: 'px' })
      const setSpotY = gsap.quickTo(section, '--spot-y', { duration: 0.55, ease: 'power3.out', unit: 'px' })
      const onPointerMove = (event: PointerEvent) => {
        const bounds = section.getBoundingClientRect()
        setSpotX(event.clientX - bounds.left)
        setSpotY(event.clientY - bounds.top)
      }
      if (pointerFine) section.addEventListener('pointermove', onPointerMove, { passive: true })
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      let titleSplit: SplitText | undefined
      timeline.fromTo(eyebrow, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 })
      if (title) {
        titleSplit = SplitText.create(title, { type: 'words', wordsClass: 'hero-word' })
        timeline.from(titleSplit.words, {
          autoAlpha: 0,
          yPercent: 110,
          duration: 0.68,
          stagger: 0.045,
          ease: 'power3.out',
        }, '-=0.2')
      }
      if (description) timeline.fromTo(description, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55 }, '-=0.38')
      if (actions) {
        actions.querySelectorAll<HTMLElement>('a, button').forEach((action) => action.classList.add('magnetic'))
        timeline.fromTo(actions, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.48 }, '-=0.3')
      }
      if (visual) timeline.fromTo(visual, { autoAlpha: 0, y: 22, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.85 }, '-=0.4')

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
      return () => {
        timeline.kill()
        titleSplit?.revert()
        section.removeEventListener('pointermove', onPointerMove)
      }
    }, section)

    // Kills the tweens and their ScrollTriggers when the route changes.
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden border-b border-border bg-canvas', className, centered ? 'pt-5 pb-3 sm:pt-10 sm:pb-8 lg:pt-11 lg:pb-8' : 'py-10 sm:py-14 lg:py-16')}
      aria-labelledby={`${id}-heading`}
    >
      {sideVisual && <div className="hero-side-visual" aria-hidden="true">{sideVisual}</div>}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-mesh absolute inset-0" />
        <div className="hero-spotlight absolute inset-0" />
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div data-parallax="35" className="absolute -top-32 right-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div data-parallax="15" className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-highlight/10 blur-3xl" />
      </div>

      <Container className={cn('relative items-center gap-8', centered ? 'flex flex-col text-center gap-3 sm:gap-5 lg:gap-6' : visual ? 'grid lg:grid-cols-2' : 'flex')}>
        <div className={cn('relative z-20', centered ? 'mx-auto max-w-3xl' : !visual && 'max-w-3xl')}>
          <div data-hero-step="eyebrow" className={cn('inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold tracking-wider text-warning uppercase shadow-subtle', centered && 'mx-auto')}>
            <span className="size-2 rounded-full bg-highlight" />
            {eyebrow}
          </div>
          <h1
            id={`${id}-heading`}
            data-hero-step="title"
            className={cn(
              'mt-4 font-extrabold tracking-tight text-fg',
              large ? 'text-[clamp(2.3rem,9.6vw,5.25rem)] leading-[0.98] text-balance sm:text-[clamp(3.25rem,5.6vw,5.25rem)]' : 'text-3xl sm:text-5xl',
              centered && 'mx-auto max-w-3xl',
            )}
          >
            {title}
          </h1>
          <span aria-hidden="true" className={cn('hero-accent-rule', centered && 'mx-auto')} />
          {description && (
            <div data-hero-step="description" className={cn('mt-3 max-w-[34rem] text-[13px] leading-[1.65] text-fg-muted sm:mt-4 sm:text-lg', centered && 'mx-auto max-w-xl')}>
              {description}
            </div>
          )}
          {actions && <div data-hero-step="actions" className={cn('mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row', centered && 'justify-center [&>a]:min-h-11 [&>a]:w-full [&>a]:justify-center [&>a]:px-4 [&>a]:py-2 [&>a]:text-sm sm:[&>a]:min-h-12 sm:[&>a]:w-auto sm:[&>a]:px-6 sm:[&>a]:py-3 sm:[&>a]:text-base')}>{actions}</div>}
        </div>
        {visual && (
          <div data-hero-visual className={cn('hero-visual-depth', centered ? 'relative z-10 mt-3 flex w-full justify-center sm:mt-5' : 'w-full')}>
            {visual}
          </div>
        )}
      </Container>
    </section>
  )
}