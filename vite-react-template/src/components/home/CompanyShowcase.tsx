import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { animate, stagger } from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container'
import tektonixLogo from '@/assets/eqisi/subsidiary/viber_image_2026-10-30_12-44-49-627.png'
import megatektonLogo from '@/assets/eqisi/subsidiary/viber_image_2026-10-30_12-45-01-890.png'

gsap.registerPlugin(ScrollTrigger)

const companies = [
  {
    name: 'Tektonix',
    description: 'A manufacturing company within the group, contributing industrial production expertise and capabilities.',
    href: 'https://tektonix.cmatrixinc.com/',
    logo: tektonixLogo,
  },
  {
    name: 'Megatekton',
    description: 'A group manufacturing company focused on supporting industrial production through its manufacturing capabilities.',
    href: 'https://mmc.cmatrixinc.com/',
    logo: megatektonLogo,
  },
]

export function CompanyShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    if (!section || !heading || !cards) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const cardNodes = Array.from(cards.querySelectorAll<HTMLElement>('[data-company-card]'))
    const logoNodes = Array.from(cards.querySelectorAll<HTMLElement>('[data-company-logo]'))
    const hoverAnimations = new Map<HTMLElement, { revert: () => void }>()

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
          once: true,
        },
      })

      timeline
        .fromTo(
          heading.querySelector('[data-company-eyebrow]'),
          { autoAlpha: 0, y: 22, letterSpacing: '0.32em' },
          { autoAlpha: 1, y: 0, letterSpacing: '0.18em', duration: 0.65, ease: 'power3.out' },
        )
        .fromTo(
          heading.querySelector('[data-company-title]'),
          { autoAlpha: 0, y: 34, rotateX: -8, transformOrigin: '50% 100%' },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, ease: 'power4.out' },
          '-=0.35',
        )
        .fromTo(
          heading.querySelector('[data-company-description]'),
          { autoAlpha: 0, y: 18, filter: 'blur(7px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
          '-=0.45',
        )
        .fromTo(
          cardNodes,
          { autoAlpha: 0, y: 68, rotateY: (index) => (index === 0 ? -8 : 8), scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: 'power4.out',
            clearProps: 'transform',
          },
          '-=0.15',
        )

      // Anime.js gives each logo a soft, staggered arrival after the card motion.
      timeline.call(() => {
        animate(logoNodes, {
          opacity: [0, 1],
          scale: [0.88, 1],
          rotate: [-1.5, 0],
          delay: stagger(140),
          duration: 850,
          ease: 'out(4)',
        })
      }, undefined, '-=0.65')
    }, section)

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const card = event.currentTarget as HTMLElement
      const logo = card.querySelector<HTMLElement>('[data-company-logo]')
      if (!logo) return
      hoverAnimations.get(logo)?.revert()
      hoverAnimations.set(logo, animate(logo, {
        scale: 1.055,
        rotate: 1.2,
        duration: 420,
        ease: 'out(3)',
      }))
    }

    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement
      const logo = card.querySelector<HTMLElement>('[data-company-logo]')
      if (!logo) return
      hoverAnimations.get(logo)?.revert()
      hoverAnimations.delete(logo)
      animate(logo, { scale: 1, rotate: 0, duration: 520, ease: 'out(3)' })
    }

    cardNodes.forEach((card) => {
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
    })

    return () => {
      cardNodes.forEach((card) => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      })
      hoverAnimations.forEach((animation) => animation.revert())
      hoverAnimations.clear()
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="company-showcase relative isolate overflow-hidden border-b border-border bg-canvas py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-companies-heading"
    >
      <div aria-hidden="true" className="company-showcase-glow pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <div ref={headingRef} className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p data-company-eyebrow className="mb-3 text-sm font-bold tracking-[0.18em] text-warning uppercase">Our Companies</p>
          <h2 data-company-title id="home-companies-heading" className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            A connected group of specialists
          </h2>
          <p data-company-description className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Explore the companies within our group and visit their websites to learn more.
          </p>
        </div>

        <div ref={cardsRef} className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-7">
          {companies.map((company, index) => (
            <a
              key={company.name}
              data-company-card
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company.name} website (opens in a new tab)`}
              className="company-showcase-card group relative flex h-full min-h-80 flex-col rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-7"
            >
              <span aria-hidden="true" className="company-card-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="company-logo-stage flex min-h-44 flex-1 items-center justify-center overflow-hidden rounded-xl bg-surface-muted/60 px-5 py-7 sm:min-h-48">
                <img
                  data-company-logo
                  src={company.logo}
                  alt={`${company.name} logo`}
                  loading="lazy"
                  className="max-h-32 w-full object-contain"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-fg sm:text-2xl">{company.name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">{company.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-wide text-primary uppercase">
                    Visit company website <span aria-hidden="true" className="company-link-line" />
                  </p>
                </div>
                <span className="company-external-icon grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <ExternalLink aria-hidden="true" className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
