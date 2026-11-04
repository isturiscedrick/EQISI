import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  muted?: boolean
  children: ReactNode
  /** Allow pinned scroll scenes to extend beyond the section's horizontal bounds. */
  overflowVisible?: boolean
}

/** Consistent editorial section header and generous spacing across every route. */
export function Section({ id, eyebrow, title, lead, muted = false, children, overflowVisible = false }: SectionProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  // Eyebrow and lead fade up; the title reveals line by line from a mask.
  // Splitting waits for web fonts, otherwise the line breaks are measured with the fallback font.
  useLayoutEffect(() => {
    const root = headerRef.current
    if (!root) return

    const eyebrowEl = root.querySelector<HTMLElement>('[data-reveal="eyebrow"]')
    const titleEl = root.querySelector<HTMLElement>('[data-reveal="title"]')
    const leadEl = root.querySelector<HTMLElement>('[data-reveal="lead"]')
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = () => ({ trigger: root, start: 'top 85%', once: true })
      let split: SplitText | undefined
      let cancelled = false

      if (eyebrowEl) {
        gsap.from(eyebrowEl, { autoAlpha: 0, y: 16, duration: 0.7, ease: 'power3.out', clearProps: 'all', scrollTrigger: trigger() })
      }
      if (leadEl) {
        gsap.from(leadEl, { autoAlpha: 0, y: 16, duration: 0.7, delay: 0.35, ease: 'power3.out', clearProps: 'all', scrollTrigger: trigger() })
      }

      if (titleEl) {
        gsap.set(titleEl, { autoAlpha: 0 })
        void document.fonts.ready.then(() => {
          if (cancelled) return
          split = SplitText.create(titleEl, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true, // re-splits if the width changes, e.g. on resize or rotation
            onSplit: (self) => {
              gsap.set(titleEl, { autoAlpha: 1 })
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 0.85,
                stagger: 0.09,
                ease: 'power3.out',
                scrollTrigger: trigger(),
              })
            },
          })
        })
      }

      return () => {
        cancelled = true
        split?.revert()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative border-b border-border/60 py-12 sm:py-20 lg:py-28', overflowVisible ? 'overflow-visible' : 'overflow-hidden', muted ? 'bg-surface-muted/70' : 'bg-surface/75')}
    >
      {muted && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots opacity-40" />}
      <Container className="relative">
        <div ref={headerRef} className="max-w-3xl">
          <p data-reveal="eyebrow" className="flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-warning uppercase">
            <span aria-hidden="true" className="h-[3px] w-12 rounded-full bg-gradient-to-r from-highlight to-highlight/20" />
            {eyebrow}
          </p>
          <h2 data-reveal="title" id={`${id}-heading`} className="mt-3 text-[clamp(1.8rem,7vw,2.35rem)] font-extrabold leading-tight tracking-tight text-fg sm:mt-4 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {lead && (
            <p data-reveal="lead" className="mt-4 max-w-2xl text-sm leading-7 text-fg-muted sm:mt-5 sm:text-lg sm:leading-8">
              {lead}
            </p>
          )}
        </div>
        <div className="mt-8 sm:mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  )
}