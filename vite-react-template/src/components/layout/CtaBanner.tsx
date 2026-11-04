import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { gsap } from '@/lib/gsap'
import { Container } from './Container'

interface CtaBannerProps {
  title: string
  description?: ReactNode
  /** Buttons. Use the `bannerButton` style from surface-styles. */
  children?: ReactNode
}

/** Shared closing banner with slow floating shapes that also drift as the banner scrolls past. */
export function CtaBanner({ title, description, children }: CtaBannerProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // The parallax sits on an outer wrapper because the inner shape already runs the CSS
  // `animate-float` animation, which would override a GSAP transform on the same element.
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]', section).forEach((el) => {
          const amount = Number(el.dataset.parallax)
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      },
      section,
    )

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden rounded-none bg-primary py-16 text-primary-fg sm:py-20">
      <div aria-hidden="true" data-parallax="18" className="pointer-events-none absolute -top-16 -left-16 size-64">
        <div className="animate-float size-full rounded-full bg-primary-fg/5" />
      </div>
      <div aria-hidden="true" data-parallax="24" className="pointer-events-none absolute -right-10 -bottom-20 size-72">
        <div className="animate-float size-full rounded-full bg-highlight/20" style={{ animationDelay: '-3s' }} />
      </div>
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-fg/90">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
        </Reveal>
      </Container>
    </section>
  )
}