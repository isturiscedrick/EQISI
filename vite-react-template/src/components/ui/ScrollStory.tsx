import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/cn'

export interface StoryStep {
  title: string
  description: string
}

interface ScrollStoryProps {
  eyebrow: string
  title: string
  description: string
  steps: StoryStep[]
  visual: ReactNode
}

/**
 * Desktop: pins the visual and advances the story with scroll progress.
 * Mobile and reduced-motion: renders the same information as a normal readable list.
 */
export function ScrollStory({ eyebrow, title, description, steps, visual }: ScrollStoryProps) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = root.current
    if (!section || steps.length < 2) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 780px) and (prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-story-step]', section)
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0.32, y: 18 })
      gsap.set(items[0], { autoAlpha: 1, y: 0 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top+=84',
          end: () => '+=' + items.length * 360,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      items.forEach((item, index) => {
        if (index > 0) {
          timeline.to(items[index - 1], { autoAlpha: 0.32, y: -14, duration: 0.45 }, '>')
          timeline.to(item, { autoAlpha: 1, y: 0, duration: 0.55 }, '<')
        }
      })

      const art = section.querySelector<HTMLElement>('[data-story-visual]')
      if (art) timeline.to(art, { y: -12, rotate: -1.2, scale: 1.025, duration: 1 }, 0)

      return () => timeline.kill()
    })

    return () => mm.revert()
  }, [steps.length])

  return (
    <section ref={root} className="relative border-y border-border bg-canvas py-10 sm:py-14 lg:min-h-[70vh] lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-7 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="relative">
          <p className="flex items-center gap-3 text-xs font-extrabold tracking-[0.2em] text-warning uppercase">
            <span aria-hidden="true" className="h-[3px] w-10 rounded-full bg-highlight" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-fg-muted sm:text-base">{description}</p>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} data-story-step className={cn('border-l-2 pl-5 transition-colors', index === 0 ? 'border-highlight' : 'border-border')}>
                <span className="text-xs font-extrabold tracking-[0.16em] text-warning">0{index + 1}</span>
                <h3 className="mt-1 text-lg font-bold text-fg">{step.title}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div data-story-visual className="relative mx-auto w-full max-w-xl rounded-3xl border border-border bg-surface-muted p-4 shadow-elevated sm:p-6">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-primary/5 blur-2xl" />
          <div className="relative">{visual}</div>
        </div>
      </div>
    </section>
  )
}
