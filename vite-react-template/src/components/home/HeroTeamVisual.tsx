import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { GlobeVisual } from './GlobeVisual'

import alfariz from '@/assets/eqisi/team/alfariz.png'
import ann from '@/assets/eqisi/team/ann.png'
import cajigal from '@/assets/eqisi/team/cajigal.png'
import flores from '@/assets/eqisi/team/flores.png'
import joy from '@/assets/eqisi/team/joy.png'
import malaca from '@/assets/eqisi/team/malaca.png'
import manuel from '@/assets/eqisi/team/manuel.png'
import tugas from '@/assets/eqisi/team/tugas.png'

const portraits = [
  // Back row: keep the outer people slightly higher and farther from the globe.
  { src: ann, side: 'left', className: 'left-[1%] bottom-[18%] h-[48%] w-[13%] max-w-[150px] z-10' },
  { src: malaca, side: 'left', className: 'left-[10%] bottom-[25%] h-[56%] w-[14%] max-w-[165px] z-10' },
  { src: flores, side: 'right', className: 'right-[1%] bottom-[18%] h-[48%] w-[13%] max-w-[150px] z-10' },
  { src: cajigal, side: 'right', className: 'right-[10%] bottom-[25%] h-[56%] w-[14%] max-w-[165px] z-10' },

  // Front row: lower portraits frame the globe without covering its center.
  { src: joy, side: 'left', className: 'left-[17%] bottom-[4%] h-[48%] w-[14%] max-w-[165px] z-20' },
  { src: alfariz, side: 'left', className: 'left-[5%] bottom-[3%] h-[42%] w-[13%] max-w-[150px] z-20' },
  { src: manuel, side: 'right', className: 'right-[17%] bottom-[4%] h-[48%]] w-[14%] max-w-[165px] z-20' },
  { src: tugas, side: 'right', className: 'right-[5%] bottom-[3%] h-[42%] w-[13%] max-w-[150px] z-20' },
] as const

export function HeroTeamVisual() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = root.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const people = element.querySelectorAll<HTMLElement>('[data-team-portrait]')
      gsap.fromTo(people, { y: 34, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.2,
      })
      gsap.to(people, {
        y: (index) => (index % 2 === 0 ? -7 : 7),
        duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.16, delay: 1.3,
      })
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 overflow-hidden" aria-label="EQISI team surrounding a connected globe">
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-[76%] max-w-[690px] sm:w-[62%] lg:w-[54%]">
        <GlobeVisual />
      </div>
      {portraits.map((portrait, index) => (
        <div
          key={portrait.src}
          data-team-portrait
          className={`absolute flex items-end justify-center opacity-0 ${portrait.className} ${portrait.side === 'left' ? 'origin-bottom-left' : 'origin-bottom-right'}`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <img
            src={portrait.src}
            alt="EQISI team member"
            draggable={false}
            className="max-h-full w-full object-contain object-bottom drop-shadow-[0_12px_16px_rgba(26,35,66,0.12)]"
          />
        </div>
      ))}
      <div className="absolute bottom-[5%] left-1/2 z-30 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    </div>
  )
}
