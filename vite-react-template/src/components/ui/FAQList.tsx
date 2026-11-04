import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { animate } from 'animejs'

interface FAQItem {
  question: string
  answer: string
}

interface FAQListProps {
  items: FAQItem[]
}

/** Accessible single-open accordion with a measured Anime.js height transition. */
export function FAQList({ items }: FAQListProps) {
  const [active, setActive] = useState<number | null>(0)
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])

  useLayoutEffect(() => {
    const animations: Array<{ pause: () => void }> = []

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return
      const isOpen = active === index
      if (isOpen && panel.dataset.expanded !== 'true') {
        panel.dataset.expanded = 'true'
        const targetHeight = panel.scrollHeight
        const animation = animate(panel, {
          height: [0, targetHeight],
          opacity: [0, 1],
          duration: 320,
          ease: 'out(3)',
          onComplete: () => { panel.style.height = 'auto' },
        })
        animations.push(animation)
      } else if (!isOpen && panel.dataset.expanded === 'true') {
        const currentHeight = panel.getBoundingClientRect().height
        const animation = animate(panel, {
          height: [currentHeight, 0],
          opacity: [1, 0],
          duration: 240,
          ease: 'in(2)',
          onComplete: () => { panel.dataset.expanded = 'false' },
        })
        animations.push(animation)
      }
    })

    return () => animations.forEach((animation) => animation.pause())
  }, [active])

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
                onClick={() => setActive(isOpen ? null : index)}
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
