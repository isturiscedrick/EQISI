import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { Container } from './Container'

interface CtaBannerProps {
  title: string
  description?: ReactNode
  /** Buttons. Use the `bannerButton` style from surface-styles. */
  children?: ReactNode
}

/** Shared closing banner with slow floating shapes. */
export function CtaBanner({ title, description, children }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-none bg-primary py-16 text-primary-fg sm:py-20">
      <div aria-hidden="true" className="animate-float pointer-events-none absolute -top-16 -left-16 size-64 rounded-full bg-primary-fg/5" />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute -right-10 -bottom-20 size-72 rounded-full bg-highlight/20"
        style={{ animationDelay: '-3s' }}
      />
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