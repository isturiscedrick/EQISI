import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  muted?: boolean
  children: ReactNode
}

/** Consistent editorial section header and generous spacing across every route. */
export function Section({ id, eyebrow, title, lead, muted = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative overflow-hidden border-b border-border/60 py-20 sm:py-24 lg:py-28', muted ? 'bg-surface-muted/70' : 'bg-surface/75')}
    >
      {muted && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots opacity-40" />}
      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-warning uppercase">
              <span aria-hidden="true" className="h-[3px] w-12 rounded-full bg-gradient-to-r from-highlight to-highlight/20" />
              {eyebrow}
            </p>
            <h2 id={`${id}-heading`} className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {lead && <p className="mt-5 max-w-2xl text-base leading-8 text-fg-muted sm:text-lg">{lead}</p>}
          </div>
        </Reveal>
        <div className="mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  )
}
