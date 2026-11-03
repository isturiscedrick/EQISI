import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface PageHeroProps {
  /** Used to build the heading id for aria-labelledby. */
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  /** Buttons or links under the description. */
  actions?: ReactNode
  /** Image or illustration. When present the hero becomes two columns. */
  visual?: ReactNode
  /** Larger display-size title, used on the home page. */
  large?: boolean
}

/** Shared top-of-page hero: decorative backdrop, staggered entrance, optional visual on the right. */
export function PageHero({ id, eyebrow, title, description, actions, visual, large = false }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-canvas py-16 sm:py-24"
      aria-labelledby={`${id}-heading`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0" />
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-highlight/10 blur-3xl" />
      </div>

      <Container className={cn('relative items-center gap-12', visual ? 'grid lg:grid-cols-2' : undefined)}>
        <div className={cn(!visual && 'max-w-3xl')}>
          <div className="animate-hero-in inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
            <span className="size-2 rounded-full bg-highlight" />
            {eyebrow}
          </div>
          <h1
            id={`${id}-heading`}
            className={cn(
              'animate-hero-in hero-d1 mt-4 font-extrabold tracking-tight text-primary',
              large ? 'text-display text-balance' : 'text-3xl sm:text-5xl',
            )}
          >
            {title}
          </h1>
          {description && (
            <div className="animate-hero-in hero-d2 mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
              {description}
            </div>
          )}
          {actions && <div className="animate-hero-in hero-d3 mt-8 flex flex-wrap gap-4">{actions}</div>}
        </div>
        {visual && <div className="animate-hero-in hero-d2">{visual}</div>}
      </Container>
    </section>
  )
}