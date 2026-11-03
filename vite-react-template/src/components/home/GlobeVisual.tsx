import { useLayoutEffect, useRef } from 'react'
import { animate } from 'animejs'
import { gsap } from 'gsap'

/**
 * Brand-led animated EQISI globe.
 * GSAP handles continuous motion and pointer parallax; Anime.js handles
 * wireframe energy, connection pulses, and the floating data callouts.
 */
export function GlobeVisual() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animeAnimations: Array<{ pause: () => void }> = []
    let onPointerMove: ((event: PointerEvent) => void) | undefined
    let onPointerLeave: (() => void) | undefined

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      // Slow, continuous rotation keeps the globe alive without distracting.
      gsap.to('.globe-spin', {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 72,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('.globe-orbit', {
        rotation: -360,
        transformOrigin: '50% 50%',
        duration: 48,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('.globe-core', {
        scale: 1.018,
        transformOrigin: '50% 50%',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Pointer movement gives the hero globe a restrained sense of depth.
      const moveX = gsap.quickTo('.globe-parallax', 'x', { duration: 0.8, ease: 'power3.out' })
      const moveY = gsap.quickTo('.globe-parallax', 'y', { duration: 0.8, ease: 'power3.out' })
      onPointerMove = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect()
        if (!bounds.width || !bounds.height) return
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        moveX(x * 13)
        moveY(y * 9)
      }
      onPointerLeave = () => {
        moveX(0)
        moveY(0)
      }
      element.addEventListener('pointermove', onPointerMove)
      element.addEventListener('pointerleave', onPointerLeave)
    }, element)

    if (!reduceMotion) {
      // Anime.js animates the network signals independently of the globe spin.
      element.querySelectorAll('.globe-anime-pulse').forEach((node, index) => {
        animeAnimations.push(
          animate(node, {
            scale: [0.72, 1.75],
            opacity: [0.85, 0],
            duration: 1900,
            delay: index * 620,
            loop: true,
            ease: 'out(3)',
          }),
        )
      })

      element.querySelectorAll('.globe-anime-node').forEach((node, index) => {
        animeAnimations.push(
          animate(node, {
            scale: [1, 1.38, 1],
            opacity: [0.72, 1, 0.72],
            duration: 2200,
            delay: index * 360,
            loop: true,
            ease: 'inOut(2)',
          }),
        )
      })

      element.querySelectorAll('.globe-anime-card').forEach((node, index) => {
        animeAnimations.push(
          animate(node, {
            translateY: [0, -9, 0],
            duration: 3600,
            delay: index * 520,
            loop: true,
            ease: 'inOut(2)',
          }),
        )
      })

      element.querySelectorAll('.globe-anime-flow').forEach((node, index) => {
        animeAnimations.push(
          animate(node, {
            strokeDashoffset: [0, -48],
            opacity: [0.35, 0.95, 0.35],
            duration: 2600,
            delay: index * 430,
            loop: true,
            ease: 'inOut(2)',
          }),
        )
      })

      const halo = element.querySelector('.globe-halo')
      if (halo) {
        animeAnimations.push(
          animate(halo, {
            opacity: [0.22, 0.48, 0.22],
            scale: [0.96, 1.06, 0.96],
            duration: 4800,
            loop: true,
            ease: 'inOut(2)',
          }),
        )
      }
    }

    return () => {
      animeAnimations.forEach((animation) => animation.pause())
      if (onPointerMove) element.removeEventListener('pointermove', onPointerMove)
      if (onPointerLeave) element.removeEventListener('pointerleave', onPointerLeave)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-5xl" aria-label="Animated EQISI wireframe globe">
      <div className="globe-halo pointer-events-none absolute inset-x-[18%] top-[14%] h-[68%] rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 900 560"
        role="img"
        aria-labelledby="eqisi-globe-title"
        className="globe-parallax relative z-10 mx-auto block h-[clamp(330px,42vh,450px)] w-full max-w-[860px] overflow-visible"
      >
        <title id="eqisi-globe-title">EQISI animated blue wireframe globe</title>
        <defs>
          <radialGradient id="eqisi-wire-globe-glow" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="72%" stopColor="#dbe8fb" stopOpacity=".25" />
            <stop offset="100%" stopColor="#9db8e8" stopOpacity=".06" />
          </radialGradient>
          <linearGradient id="eqisi-globe-sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="48%" stopColor="#ffffff" stopOpacity=".85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="eqisi-wire-globe-clip">
            <circle cx="450" cy="278" r="184" />
          </clipPath>
          <filter id="eqisi-wire-globe-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>

        <ellipse cx="450" cy="484" rx="205" ry="20" fill="#1b326e" opacity=".10" filter="url(#eqisi-wire-globe-shadow)" />

        <g className="globe-orbit" fill="none" stroke="#7894cb" strokeWidth="1.5" opacity=".66">
          <ellipse cx="450" cy="278" rx="354" ry="104" transform="rotate(-13 450 278)" strokeDasharray="7 12" />
          <ellipse cx="450" cy="278" rx="310" ry="145" transform="rotate(23 450 278)" strokeDasharray="4 10" />
          <ellipse cx="450" cy="278" rx="250" ry="205" transform="rotate(-31 450 278)" opacity=".35" strokeDasharray="2 12" />
        </g>

        <g className="globe-core">
          <circle cx="450" cy="278" r="185" fill="url(#eqisi-wire-globe-glow)" />
          <circle cx="450" cy="278" r="184" fill="none" stroke="#1c3478" strokeWidth="4" opacity=".9" />
          <g clipPath="url(#eqisi-wire-globe-clip)">
            <g className="globe-spin" fill="none" stroke="#1b3479" strokeWidth="3" strokeLinecap="round" opacity=".88">
              <ellipse cx="450" cy="278" rx="54" ry="183" />
              <ellipse cx="450" cy="278" rx="105" ry="183" />
              <ellipse cx="450" cy="278" rx="151" ry="183" />
              <path d="M450 94 C370 132 338 204 338 278 C338 352 370 424 450 462" opacity=".8" />
              <path d="M450 94 C530 132 562 204 562 278 C562 352 530 424 450 462" opacity=".8" />
              <path d="M274 205 C365 238 535 238 626 205" />
              <path d="M266 246 C365 267 535 267 634 246" />
              <path d="M266 310 C365 289 535 289 634 310" />
              <path d="M274 351 C365 318 535 318 626 351" />
              <path d="M296 160 C370 191 530 191 604 160" opacity=".7" />
              <path d="M296 396 C370 365 530 365 604 396" opacity=".7" />
              <path d="M267 278 H633" strokeWidth="2.5" opacity=".72" />
            </g>

            <g fill="none" stroke="#5575b6" strokeWidth="1.25" opacity=".52">
              <path d="M314 130 Q450 204 586 130" />
              <path d="M286 178 Q450 244 614 178" />
              <path d="M286 378 Q450 312 614 378" />
              <path d="M314 426 Q450 352 586 426" />
            </g>

            {/* Moving highlight and data paths make the wireframe feel connected. */}
            <path className="globe-anime-flow" d="M290 220 Q450 110 610 220" fill="none" stroke="#f15a2a" strokeWidth="2" strokeDasharray="8 16" opacity=".65" />
            <path className="globe-anime-flow" d="M300 340 Q450 450 600 340" fill="none" stroke="#6d91ce" strokeWidth="2" strokeDasharray="8 16" opacity=".65" />
          </g>
          <circle cx="450" cy="278" r="184" fill="none" stroke="#172d70" strokeWidth="2.5" opacity=".9" />
          <path d="M330 150 C370 116 410 100 450 96" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
        </g>

        <g>
          <circle className="globe-anime-node" cx="365" cy="220" r="5" fill="#f15a2a" />
          <circle className="globe-anime-pulse" cx="365" cy="220" r="10" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <circle className="globe-anime-node" cx="510" cy="190" r="5" fill="#f15a2a" />
          <circle className="globe-anime-pulse" cx="510" cy="190" r="10" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <circle className="globe-anime-node" cx="546" cy="330" r="5" fill="#416da5" />
          <circle className="globe-anime-pulse" cx="546" cy="330" r="10" fill="none" stroke="#416da5" strokeWidth="2" />
          <circle className="globe-anime-node" cx="418" cy="370" r="5" fill="#416da5" />
          <circle className="globe-anime-pulse" cx="418" cy="370" r="10" fill="none" stroke="#416da5" strokeWidth="2" />
        </g>

        <g className="globe-anime-card">
          <rect x="86" y="180" width="148" height="62" rx="13" fill="#fff" stroke="#d9e2ef" />
          <circle cx="108" cy="202" r="6" fill="#f15a2a" />
          <text x="124" y="206" fontSize="12" fontWeight="700" fill="#1e3554">CONNECTED</text>
          <text x="104" y="226" fontSize="10" fill="#64748b">People &amp; operations</text>
        </g>
        <g className="globe-anime-card">
          <rect x="670" y="350" width="145" height="62" rx="13" fill="#fff" stroke="#d9e2ef" />
          <circle cx="692" cy="372" r="6" fill="#416da5" />
          <text x="708" y="376" fontSize="12" fontWeight="700" fill="#1e3554">INTEGRATED</text>
          <text x="688" y="396" fontSize="10" fill="#64748b">Supply chain systems</text>
        </g>

        <g className="globe-anime-node">
          <circle cx="263" cy="260" r="6" fill="#f15a2a" />
          <circle className="globe-anime-pulse" cx="263" cy="260" r="14" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <path d="M263 260 Q330 182 365 220" fill="none" stroke="#f15a2a" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
        <g className="globe-anime-node">
          <circle cx="637" cy="303" r="6" fill="#f15a2a" />
          <circle className="globe-anime-pulse" cx="637" cy="303" r="14" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <path d="M637 303 Q575 370 546 330" fill="none" stroke="#f15a2a" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
      </svg>
      <p className="relative z-10 -mt-3 text-center text-xs font-semibold tracking-[0.22em] text-fg-muted uppercase sm:text-sm">
        One connected world · One integrated partner
      </p>
    </div>
  )
}
