import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  /** Tinted background, to alternate sections. */
  muted?: boolean
  children: ReactNode
}

/** A page section with an eyebrow, heading and optional intro. The id doubles as the anchor target. */
export function Section({ id, eyebrow, title, lead, muted = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn('py-16 sm:py-20', muted && 'bg-surface-muted')}>
      <Container>
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-bold tracking-widest text-warning uppercase">
            <span aria-hidden="true" className="h-1 w-8 rounded-full bg-highlight" />
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-3 max-w-prose text-fg-muted">{lead}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  )
}