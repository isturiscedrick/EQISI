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

const headingWords = ['A', 'connected', 'group', 'of', 'specialists']

export function CompanyShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const connectorRef = useRef<SVGPathElement>(null)
  const particleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    const connector = connectorRef.current
    const particle = particleRef.current
    if (!section || !heading || !cards) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const cardNodes = Array.from(cards.querySelectorAll<HTMLElement>('[data-company-card]'))
    const wordNodes = Array.from(heading.querySelectorAll<HTMLElement>('[data-heading-word]'))
    const logoNodes = Array.from(cards.querySelectorAll<HTMLElement>('[data-company-logo]'))
    const hoverAnimations = new Map<HTMLElement, { revert: () => void }>()
    const pointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const tiltTweens: gsap.core.Tween[] = []

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
          { autoAlpha: 1, y: 0, letterSpacing: '0.18em', duration: 0.6, ease: 'power3.out' },
        )
        .fromTo(
          wordNodes,
          { autoAlpha: 0, yPercent: 115, rotateX: -65, transformOrigin: '50% 100%' },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.72,
            stagger: 0.075,
            ease: 'power4.out',
          },
          '-=0.28',
        )
        .fromTo(
          heading.querySelector('[data-company-description]'),
          { autoAlpha: 0, y: 18, filter: 'blur(7px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
          '-=0.38',
        )
        .fromTo(
          cardNodes,
          { autoAlpha: 0, y: 68, rotateY: (index) => (index === 0 ? -8 : 8), scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.95,
            stagger: 0.16,
            ease: 'power4.out',
            clearProps: 'transform',
          },
          '-=0.12',
        )

      if (connector) {
        const length = connector.getTotalLength()
        gsap.set(connector, { strokeDasharray: length, strokeDashoffset: length })
        timeline.to(connector, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, '-=0.72')
      }

      if (particle) {
        timeline.fromTo(
          particle,
          { autoAlpha: 0, scale: 0.4 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
          '-=0.45',
        )
        timeline.to(particle, {
          x: 500,
          y: 0,
          duration: 1.4,
          ease: 'sine.inOut',
          repeat: 1,
          yoyo: true,
        }, '-=0.1')
      }

      // A clipped reveal gives each supplied company logo a clean, editorial entrance.
      timeline.call(() => {
        animate(logoNodes, {
          opacity: [0, 1],
          scale: [0.94, 1],
          clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
          delay: stagger(150),
          duration: 900,
          ease: 'out(4)',
        })
      }, undefined, '-=0.72')
    }, section)

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerFine) return
      const card = event.currentTarget as HTMLElement
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height
      card.style.setProperty('--spot-x', `${x * 100}%`)
      card.style.setProperty('--spot-y', `${y * 100}%`)

      const rotateY = (x - 0.5) * 5
      const rotateX = (0.5 - y) * 4
      const tween = gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })
      tiltTweens.push(tween)
    }

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const card = event.currentTarget as HTMLElement
      const logo = card.querySelector<HTMLElement>('[data-company-logo]')
      if (!logo) return
      hoverAnimations.get(logo)?.revert()
      hoverAnimations.set(logo, animate(logo, {
        scale: 1.045,
        duration: 420,
        ease: 'out(3)',
      }))
    }

    const onPointerLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement
      const logo = card.querySelector<HTMLElement>('[data-company-logo]')
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power3.out', overwrite: true })
      card.style.setProperty('--spot-x', '50%')
      card.style.setProperty('--spot-y', '50%')
      if (!logo) return
      hoverAnimations.get(logo)?.revert()
      hoverAnimations.delete(logo)
      animate(logo, { scale: 1, duration: 520, ease: 'out(3)' })
    }

    cardNodes.forEach((card) => {
      card.addEventListener('pointermove', onPointerMove)
      card.addEventListener('pointerenter', onPointerEnter)
      card.addEventListener('pointerleave', onPointerLeave)
    })

    return () => {
      cardNodes.forEach((card) => {
        card.removeEventListener('pointermove', onPointerMove)
        card.removeEventListener('pointerenter', onPointerEnter)
        card.removeEventListener('pointerleave', onPointerLeave)
      })
      hoverAnimations.forEach((animation) => animation.revert())
      hoverAnimations.clear()
      tiltTweens.forEach((tween) => tween.kill())
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
          <h2 data-company-title id="home-companies-heading" className="company-showcase-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {headingWords.map((word, index) => (
              <span key={word} className="company-heading-word-wrap">
                <span data-heading-word className="company-heading-word">{word}</span>
                {index < headingWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <p data-company-description className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Explore the companies within our group and visit their websites to learn more.
          </p>
        </div>

        <div className="company-showcase-network" aria-hidden="true">
          <svg viewBox="0 0 1000 180" preserveAspectRatio="none">
            <defs>
              <linearGradient id="company-network-gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#4860AC" stopOpacity=".15" />
                <stop offset="50%" stopColor="#F05424" stopOpacity=".75" />
                <stop offset="100%" stopColor="#4860AC" stopOpacity=".15" />
              </linearGradient>
            </defs>
            <path ref={connectorRef} d="M120 90 C330 12 670 168 880 90" />
            <circle cx="120" cy="90" r="5" />
            <circle cx="880" cy="90" r="5" />
            <circle ref={particleRef} cx="120" cy="90" r="4" />
          </svg>
        </div>

        <div ref={cardsRef} className="company-showcase-grid relative mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-7">
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
                  className="company-showcase-logo max-h-32 w-full object-contain"
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
