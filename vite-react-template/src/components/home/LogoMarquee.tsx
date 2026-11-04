import { useLayoutEffect, useRef } from 'react'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'

const logos = c.clients.slice(0, 8)

/** One copy of the logos. The second copy is hidden from assistive tech and from reduced-motion users. */
function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        'flex shrink-0 items-center gap-x-12 pr-12',
        'motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-5 motion-reduce:pr-0',
        duplicate && 'motion-reduce:hidden',
      )}
    >
      {logos.map((client) => (
        <li key={client.name}>
          <img
            src={asset(client.logo)}
            alt={duplicate ? '' : client.name}
            title={duplicate ? undefined : client.name}
            loading="lazy"
            className={cn(
              'h-7 max-w-24 object-contain grayscale opacity-65 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-8',
              client.padded && 'p-1',
            )}
          />
        </li>
      ))}
    </ul>
  )
}

/** Slow, seamless logo ticker. Eases to a stop on hover; static and wrapped under reduced motion. */
export function LogoMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Two identical sets, so moving the track by 50% loops without a visible jump.
      const loop = gsap.to(track, { xPercent: -50, duration: 36, ease: 'none', repeat: -1 })
      const slowTo = (scale: number) => gsap.to(loop, { timeScale: scale, duration: 0.4, overwrite: true })
      const onEnter = () => slowTo(0)
      const onLeave = () => slowTo(1)
      wrap.addEventListener('pointerenter', onEnter)
      wrap.addEventListener('pointerleave', onLeave)
      return () => {
        wrap.removeEventListener('pointerenter', onEnter)
        wrap.removeEventListener('pointerleave', onLeave)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]"
    >
      <div ref={trackRef} className="flex w-max motion-reduce:w-full motion-reduce:justify-center">
        <LogoSet />
        <LogoSet duplicate />
      </div>
    </div>
  )
}