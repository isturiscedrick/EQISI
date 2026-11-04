import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface CountUpProps {
  /** Final text, e.g. "26+". Shown as-is when `from` is omitted or motion is reduced. */
  value: string
  /** Start number. Omit for non-numeric values such as "DO-174". */
  from?: number
  duration?: number
  className?: string
}

/** Counts a number up once when it scrolls into view. */
export function CountUp({ value, from, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    const match = /^(\D*)(\d+)(\D*)$/.exec(value)
    if (!node || !match || from === undefined) return

    const [, prefix = '', digits = '', suffix = ''] = match
    const end = Number(digits)
    if (from >= end) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const counter = { n: from }
      const write = () => {
        node.textContent = `${prefix}${Math.round(counter.n)}${suffix}`
      }
      write()
      gsap.to(counter, {
        n: end,
        duration,
        ease: 'power2.out',
        onUpdate: write,
        scrollTrigger: { trigger: node, start: 'top 90%', once: true },
      })
      // Always leave the real value in the DOM when the effect is torn down.
      return () => {
        node.textContent = value
      }
    })

    return () => mm.revert()
  }, [value, from, duration])

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  )
}