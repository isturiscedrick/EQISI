import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/** A restrained desktop-only pointer halo. The native cursor remains visible. */
export function PointerGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = glow.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const finePointer = window.matchMedia('(pointer: fine)')
    if (!finePointer.matches) return

    const xTo = gsap.quickTo(element, 'x', { duration: 0.32, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.32, ease: 'power3.out' })
    const show = () => gsap.to(element, { autoAlpha: 1, duration: 0.2, overwrite: true })
    const hide = () => gsap.to(element, { autoAlpha: 0, duration: 0.25, overwrite: true })
    const move = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      show()
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      gsap.killTweensOf(element)
    }
  }, [])

  return <div ref={glow} aria-hidden="true" className="pointer-glow pointer-events-none fixed left-0 top-0 z-[90] hidden size-16 -translate-x-1/2 -translate-y-1/2 rounded-full md:block" />
}
