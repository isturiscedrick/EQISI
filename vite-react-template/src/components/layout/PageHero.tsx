import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface PageHeroProps {
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  actions?: ReactNode
  visual?: ReactNode
  large?: boolean
  centered?: boolean
}

/** Shared hero with an optional centered, showcase-style composition. */
export function PageHero({ id, eyebrow, title, description, actions, visual, large = false, centered = false }: PageHeroProps) {
  return (
    <section
      className={cn('relative overflow-hidden border-b border-border bg-canvas', centered ? 'pt-14 pb-16 sm:pt-20 sm:pb-20' : 'py-16 sm:py-24')}
      aria-labelledby={`${id}-heading`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div className="absolute -top-32 right-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 size-72 rounded-full bg-highlight/10 blur-3xl" />
      </div>

      <Container className={cn('relative items-center gap-12', centered ? 'flex flex-col text-center' : visual ? 'grid lg:grid-cols-2' : 'flex')}>
        <div className={cn(centered ? 'mx-auto max-w-4xl' : !visual && 'max-w-3xl')}>
          <div className={cn('animate-hero-in inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold tracking-wider text-warning uppercase shadow-subtle', centered && 'mx-auto')}>
            <span className="size-2 rounded-full bg-highlight" />
            {eyebrow}
          </div>
          <h1
            id={`${id}-heading`}
            className={cn(
              'animate-hero-in hero-d1 mt-5 font-extrabold tracking-tight text-fg',
              large ? 'text-display text-balance' : 'text-3xl sm:text-5xl',
              centered && 'mx-auto max-w-4xl',
            )}
          >
            {title}
          </h1>
          {description && (
            <div className={cn('animate-hero-in hero-d2 mt-5 text-base leading-relaxed text-fg-muted sm:text-lg', centered && 'mx-auto max-w-2xl')}>
              {description}
            </div>
          )}
          {actions && <div className={cn('animate-hero-in hero-d3 mt-7 flex flex-wrap gap-3', centered && 'justify-center')}>{actions}</div>}
        </div>
        {visual && <div className={cn('animate-hero-in hero-d2', centered ? 'mt-3 w-full' : 'w-full')}>{visual}</div>}
      </Container>
    </section>
  )
}
