import { useLayoutEffect, useRef } from 'react'
import { animate } from 'animejs'
import { gsap } from 'gsap'

// Globe geometry (SVG units). The pole is tilted toward the upper right, like the EQISI logo.
const CX = 450
const CY = 278
const R = 184
const AXIS_TILT = 32 // degrees, clockwise
const ELEVATION = (24 * Math.PI) / 180 // how far the north pole leans toward the viewer
const MERIDIAN_COUNT = 6
const LATITUDES = [-45, -15, 15, 45]
const BLUE = '#4860ac'

const cosE = Math.cos(ELEVATION)
const sinE = Math.sin(ELEVATION)

/** Projects a point on the sphere. `visible` is true on the side facing the viewer. */
function project(lat: number, lon: number) {
  const x = Math.cos(lat) * Math.sin(lon)
  const y = Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lon)
  const y2 = y * cosE - z * sinE
  const z2 = y * sinE + z * cosE
  return { X: CX + R * x, Y: CY - R * y2, visible: z2 > 0 }
}

/** Builds an SVG path from samples, keeping only the front-facing segments. */
function buildPath(samples: ReturnType<typeof project>[]) {
  let d = ''
  let prevVisible = false
  for (const p of samples) {
    if (p.visible) d += `${prevVisible ? 'L' : 'M'}${p.X.toFixed(1)} ${p.Y.toFixed(1)}`
    prevVisible = p.visible
  }
  return d
}

function meridianPath(lon: number) {
  const steps = 72
  const samples = Array.from({ length: steps + 1 }, (_, i) => project(-Math.PI / 2 + (Math.PI * i) / steps, lon))
  return buildPath(samples)
}

function latitudePath(latDeg: number) {
  const lat = (latDeg * Math.PI) / 180
  const steps = 120
  const samples = Array.from({ length: steps + 1 }, (_, i) => project(lat, (2 * Math.PI * i) / steps))
  return buildPath(samples)
}

const latitudeD = LATITUDES.map(latitudePath)
const meridianIndexes = Array.from({ length: MERIDIAN_COUNT }, (_, k) => k)
const INITIAL_ROTATION = 0.35

/**
 * Brand-led animated EQISI globe, drawn in the style of the logo mark:
 * bold blue meridians and latitude bands with white gaps where they cross.
 * The meridians are recomputed on a GSAP ticker, so the globe turns in 3D
 * around its tilted axis. Anime.js handles pulses, nodes and floating callouts.
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
    let tick: ((time: number, deltaTime: number) => void) | undefined

    const meridianNodes = Array.from(element.querySelectorAll<SVGPathElement>('[data-meridian]'))
    let rotation = INITIAL_ROTATION

    function drawMeridians() {
      for (const node of meridianNodes) {
        const k = Number(node.dataset.meridian)
        node.setAttribute('d', meridianPath(rotation + (k * Math.PI) / (MERIDIAN_COUNT / 2)))
      }
    }

    const ctx = gsap.context(() => {
      if (reduceMotion) return

      // True 3D turn: about one revolution per minute.
      tick = (_time, deltaTime) => {
        rotation += (deltaTime / 1000) * 0.105
        drawMeridians()
      }
      gsap.ticker.add(tick)

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
      if (tick) gsap.ticker.remove(tick)
      animeAnimations.forEach((animation) => animation.pause())
      if (onPointerMove) element.removeEventListener('pointermove', onPointerMove)
      if (onPointerLeave) element.removeEventListener('pointerleave', onPointerLeave)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-5xl" aria-label="Animated EQISI globe">
      <div className="globe-halo pointer-events-none absolute inset-x-[18%] top-[14%] h-[68%] rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 900 560"
        role="img"
        aria-labelledby="eqisi-globe-title"
        className="globe-parallax relative z-10 mx-auto block h-[clamp(330px,42vh,450px)] w-full max-w-[860px] overflow-visible"
      >
        <title id="eqisi-globe-title">EQISI animated blue globe</title>
        <defs>
          <radialGradient id="eqisi-globe-fill" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e3e9f7" />
          </radialGradient>
          <clipPath id="eqisi-globe-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
          <filter id="eqisi-globe-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>

        <ellipse cx={CX} cy="484" rx="205" ry="20" fill="#1b326e" opacity=".10" filter="url(#eqisi-globe-shadow)" />

        {/* Orbit rings keep the orange accent from the brand palette. */}
        <g className="globe-orbit" fill="none" stroke="#f05424" strokeWidth="2" opacity=".5">
          <ellipse cx={CX} cy={CY} rx="354" ry="104" transform="rotate(-13 450 278)" strokeDasharray="7 12" />
          <ellipse cx={CX} cy={CY} rx="310" ry="145" transform="rotate(23 450 278)" strokeDasharray="4 10" opacity=".6" />
        </g>

        <g className="globe-core">
          <circle cx={CX} cy={CY} r={R} fill="url(#eqisi-globe-fill)" />

          <g clipPath="url(#eqisi-globe-clip)">
            <g transform={`rotate(${AXIS_TILT} ${CX} ${CY})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Latitude bands, bold blue with a white edge. */}
              {latitudeD.map((d, i) => (
                <g key={LATITUDES[i]}>
                  <path d={d} stroke="#ffffff" strokeWidth="15" />
                  <path d={d} stroke={BLUE} strokeWidth="8" />
                </g>
              ))}

              {/* Meridians cross over the latitudes with a white gap, like the logo. */}
              {meridianIndexes.map((k) => {
                const d = meridianPath(INITIAL_ROTATION + (k * Math.PI) / (MERIDIAN_COUNT / 2))
                return (
                  <g key={k}>
                    <path data-meridian={k} d={d} stroke="#ffffff" strokeWidth="15" />
                    <path data-meridian={k} d={d} stroke={BLUE} strokeWidth="8" />
                  </g>
                )
              })}
            </g>
          </g>

          {/* Bold rim, separated from the lines by a thin white gap. */}
          <circle cx={CX} cy={CY} r={R - 1} fill="none" stroke="#ffffff" strokeWidth="6" />
          <circle cx={CX} cy={CY} r={R + 4} fill="none" stroke={BLUE} strokeWidth="10" />
        </g>

        <g>
          <circle className="globe-anime-node" cx="352" cy="214" r="5" fill="#f05424" />
          <circle className="globe-anime-pulse" cx="352" cy="214" r="10" fill="none" stroke="#f05424" strokeWidth="2" />
          <circle className="globe-anime-node" cx="548" cy="332" r="5" fill="#f05424" />
          <circle className="globe-anime-pulse" cx="548" cy="332" r="10" fill="none" stroke="#f05424" strokeWidth="2" />
        </g>

        <g className="globe-anime-card">
          <rect x="86" y="180" width="148" height="62" rx="13" fill="#fff" stroke="#d3daee" />
          <circle cx="108" cy="202" r="6" fill="#f05424" />
          <text x="124" y="206" fontSize="12" fontWeight="700" fill="#1a2342">CONNECTED</text>
          <text x="104" y="226" fontSize="10" fill="#4a5578">People &amp; operations</text>
        </g>
        <g className="globe-anime-card">
          <rect x="670" y="350" width="145" height="62" rx="13" fill="#fff" stroke="#d3daee" />
          <circle cx="692" cy="372" r="6" fill={BLUE} />
          <text x="708" y="376" fontSize="12" fontWeight="700" fill="#1a2342">INTEGRATED</text>
          <text x="688" y="396" fontSize="10" fill="#4a5578">Supply chain systems</text>
        </g>
      </svg>
      <p className="relative z-10 -mt-3 text-center text-xs font-semibold tracking-[0.22em] text-fg-muted uppercase sm:text-sm">
        One connected world · One integrated partner
      </p>
    </div>
  )
}