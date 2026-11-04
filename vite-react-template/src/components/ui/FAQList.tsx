import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { animate } from 'animejs'

interface FAQItem {
  question: string
  answer: string
}

interface FAQListProps {
  items: FAQItem[]
}

/** Accessible single-open accordion with measured Anime.js height transitions. */
export function FAQList({ items }: FAQListProps) {
  const [active, setActive] = useState<number | null>(null)
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const animations = useRef(new Map<number, { pause: () => void }>())

  useEffect(() => () => {
    animations.current.forEach((animation) => animation.pause())
    animations.current.clear()
  }, [])

  function toggle(index: number) {
    const next = active === index ? null : index

    panelRefs.current.forEach((panel, panelIndex) => {
      if (!panel) return
      animations.current.get(panelIndex)?.pause()

      const opening = next === panelIndex
      const currentHeight = panel.getBoundingClientRect().height
      const targetHeight = opening ? panel.scrollHeight : 0
      const animation = animate(panel, {
        height: [currentHeight, targetHeight],
        opacity: [opening ? 0 : 1, opening ? 1 : 0],
        duration: opening ? 320 : 240,
        ease: opening ? 'out(3)' : 'in(2)',
        onComplete: () => {
          panel.style.height = opening ? 'auto' : '0px'
          panel.style.opacity = opening ? '1' : '0'
        },
      })
      animations.current.set(panelIndex, animation)
    })

    setActive(next)
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      {items.map((item, index) => {
        const isOpen = active === index
        const panelId = `eqisi-faq-panel-${index}`
        return (
          <article key={item.question} className="px-5 sm:px-6">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-sm font-bold text-fg transition-colors hover:text-primary sm:text-base"
              >
                {item.question}
                <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <div
              id={panelId}
              ref={(node) => { panelRefs.current[index] = node }}
              aria-hidden={!isOpen}
              className="faq-panel overflow-hidden"
            >
              <p className="max-w-3xl pb-5 pr-8 text-sm leading-relaxed text-fg-muted">{item.answer}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
