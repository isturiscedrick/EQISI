import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

type Setters = { x: (value: number) => void; y: (value: number) => void }

/**
 * Pulls any element with the `magnetic` class slightly toward the pointer.
 * One delegated listener serves every button. Fine pointers only, never under reduced motion.
 */
export function useMagneticButtons() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const setters = new WeakMap<HTMLElement, Setters>()
      let active: HTMLElement | null = null

      const settersFor = (el: HTMLElement): Setters => {
        let s = setters.get(el)
        if (!s) {
          s = {
            x: gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' }),
          }
          setters.set(el, s)
        }
        return s
      }

      const release = (el: HTMLElement) => {
        const s = settersFor(el)
        s.x(0)
        s.y(0)
      }

      const onPointerMove = (event: PointerEvent) => {
        const target =
          event.target instanceof Element ? event.target.closest<HTMLElement>('.magnetic') : null
        if (active && active !== target) release(active)
        active = target
        if (!target) return

        const rect = target.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const s = settersFor(target)
        s.x(gsap.utils.clamp(-8, 8, dx * 0.2))
        s.y(gsap.utils.clamp(-6, 6, dy * 0.2))
      }

      document.addEventListener('pointermove', onPointerMove, { passive: true })
      return () => document.removeEventListener('pointermove', onPointerMove)
    })

    // Reverting the matchMedia context also kills the quickTo tweens and clears their transforms.
    return () => mm.revert()
  }, [])
}