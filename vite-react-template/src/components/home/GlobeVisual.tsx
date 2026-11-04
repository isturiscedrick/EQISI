import { useLayoutEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { gsap } from '@/lib/gsap'

const D2R = Math.PI / 180
const CX = 450
const CY = 278
const R = 184
const TILT = 24 * D2R // pole tips toward the viewer, like the logo
const ROLL = -40 * D2R // leans the axis to the right (use a positive value to lean left)
const SPIN = (Math.PI * 2) / 36 // one full turn every 36 s

// Orange orbit (ellipse in a frame rotated by ORBIT_ROT around the globe center)
const ORBIT_A = 268
const ORBIT_B = 78
const ORBIT_ROT = -16 * D2R
const ORBIT_SPEED = 0.85 // rad/s
const TRAIL = 9

const LOCATIONS = [
  { name: 'Manila', region: 'Philippines', detail: 'EQISI home market and strategic operations hub.', color: '#f15a2a' },
  { name: 'Singapore', region: 'Southeast Asia', detail: 'A regional connection point for integrated supply-chain activity.', color: '#4860ac' },
  { name: 'Tokyo', region: 'Japan', detail: 'A connected Asia-Pacific business destination.', color: '#4860ac' },
  { name: 'Sydney', region: 'Australia', detail: 'An Asia-Pacific route represented in the globe visual.', color: '#f15a2a' },
  { name: 'Dubai', region: 'United Arab Emirates', detail: 'A global trade and logistics connection point.', color: '#f15a2a' },
]

const NODES = [
  { lat: 14.6, lon: 121, color: '#f15a2a' },
  { lat: 1.3, lon: 103.8, color: '#416da5' },
  { lat: 35.7, lon: 139.7, color: '#416da5' },
  { lat: -33.9, lon: 151.2, color: '#f15a2a' },
  { lat: 25.2, lon: 55.3, color: '#f15a2a' },
]

// Static wireframe geometry as [lat, lon] polylines (fewer lines, so thick strokes read like the logo).
const LINES: Array<Array<[number, number]>> = []
for (let lon = 0; lon < 360; lon += 40) {
  const line: Array<[number, number]> = []
  for (let lat = -90; lat <= 90; lat += 6) line.push([lat, lon])
  LINES.push(line)
}
for (const lat of [-45, 0, 45]) {
  const line: Array<[number, number]> = []
  for (let lon = 0; lon <= 360; lon += 6) line.push([lat, lon])
  LINES.push(line)
}

/** Orthographic projection of a lat/lon point. z > 0 means the point faces the viewer. */
function project(latDeg: number, lonDeg: number, rot: number) {
  const la = latDeg * D2R
  const lo = lonDeg * D2R + rot
  const x = Math.cos(la) * Math.sin(lo)
  const y = Math.sin(la)
  const z = Math.cos(la) * Math.cos(lo)
  const y2 = y * Math.cos(TILT) - z * Math.sin(TILT)
  const z2 = y * Math.sin(TILT) + z * Math.cos(TILT)
  // Roll the whole globe so the axis leans, like the logo.
  const xr = x * Math.cos(ROLL) - y2 * Math.sin(ROLL)
  const yr = x * Math.sin(ROLL) + y2 * Math.cos(ROLL)
  return { x: CX + R * xr, y: CY - R * yr, z: z2 }
}

function buildWireframe(rot: number) {
  let front = ''
  let back = ''
  for (const line of LINES) {
    let prev: ReturnType<typeof project> | null = null
    let mode = ''
    for (const [lat, lon] of line) {
      const p = project(lat, lon, rot)
      if (prev) {
        const isFront = prev.z + p.z >= 0
        const next = isFront ? 'f' : 'b'
        let d = ''
        if (mode !== next) {
          d += `M${prev.x.toFixed(1)} ${prev.y.toFixed(1)}`
          mode = next
        }
        d += `L${p.x.toFixed(1)} ${p.y.toFixed(1)}`
        if (isFront) front += d
        else back += d
      }
      prev = p
    }
  }
  return { front, back }
}

/** Position on the orange orbit. `front` is true on the half that passes in front of the globe. */
function orbitPoint(theta: number) {
  const lx = ORBIT_A * Math.cos(theta)
  const ly = ORBIT_B * Math.sin(theta)
  const c = Math.cos(ORBIT_ROT)
  const s = Math.sin(ORBIT_ROT)
  return { x: CX + lx * c - ly * s, y: CY + lx * s + ly * c, front: Math.sin(theta) > 0 }
}

/**
 * Brand-led animated EQISI globe.
 * A real 3D-projected wireframe spins on a tilted, leaning axis, surface nodes ride with it,
 * and an orange satellite orbits, passing behind and in front of the sphere.
 * GSAP drives the frame loop and pointer parallax; ScrollTrigger scrubs an extra spin, scale and lift
 * as the hero scrolls away; Anime.js floats the data cards.
 */
export function GlobeVisual() {
  const root = useRef<HTMLDivElement>(null)
  const [activeLocation, setActiveLocation] = useState(0)
  const location = LOCATIONS[activeLocation] ?? LOCATIONS[0]

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const frontPath = element.querySelector<SVGPathElement>('.globe-lines-front')
    const backPath = element.querySelector<SVGPathElement>('.globe-lines-back')
    const nodes = Array.from(element.querySelectorAll<SVGGElement>('.globe-node'))
    const rings = Array.from(element.querySelectorAll<SVGEllipseElement>('.globe-orbit-ring'))
    const satFront = Array.from(element.querySelectorAll<SVGCircleElement>('.sat-front'))
    const satBack = Array.from(element.querySelectorAll<SVGCircleElement>('.sat-back'))
    const satHalo = element.querySelector<SVGCircleElement>('.sat-halo')

    // Extra rotation (radians) added on top of the constant spin. ScrollTrigger scrubs this value.
    const scroll = { spin: 0 }

    function render(t: number) {
      const rot = t * SPIN + scroll.spin

      const lines = buildWireframe(rot)
      frontPath?.setAttribute('d', lines.front)
      backPath?.setAttribute('d', lines.back)

      nodes.forEach((node, i) => {
        const n = NODES[i]
        if (!n) return
        const p = project(n.lat, n.lon, rot)
        const visible = Math.max(0, Math.min(1, p.z * 4))
        const phase = ((t + i * 0.55) % 2.2) / 2.2
        const core = node.querySelector<SVGCircleElement>('.node-core')
        const ring = node.querySelector<SVGCircleElement>('.node-ring')
        if (core) {
          core.setAttribute('cx', p.x.toFixed(1))
          core.setAttribute('cy', p.y.toFixed(1))
          core.setAttribute('opacity', visible.toFixed(2))
        }
        if (ring) {
          ring.setAttribute('cx', p.x.toFixed(1))
          ring.setAttribute('cy', p.y.toFixed(1))
          ring.setAttribute('r', (5 + 17 * phase).toFixed(1))
          ring.setAttribute('opacity', (0.7 * (1 - phase) * visible).toFixed(2))
        }
      })

      // Blue guide orbits: slow dash drift.
      rings.forEach((ring, i) => ring.setAttribute('stroke-dashoffset', String(-t * (6 + i * 3))))

      // Orange satellite plus a fading trail, split between the back and front layers.
      const theta = t * ORBIT_SPEED
      for (let i = 0; i < TRAIL; i++) {
        const p = orbitPoint(theta - i * 0.075)
        const fade = 1 - i / TRAIL
        const radius = (i === 0 ? 6 : 4.5) * (0.5 + 0.5 * fade)
        const on = p.front ? satFront[i] : satBack[i]
        const off = p.front ? satBack[i] : satFront[i]
        if (on) {
          on.setAttribute('cx', p.x.toFixed(1))
          on.setAttribute('cy', p.y.toFixed(1))
          on.setAttribute('r', radius.toFixed(1))
          on.setAttribute('opacity', (fade * (p.front ? 1 : 0.55)).toFixed(2))
        }
        off?.setAttribute('opacity', '0')
        if (i === 0 && satHalo) {
          satHalo.setAttribute('cx', p.x.toFixed(1))
          satHalo.setAttribute('cy', p.y.toFixed(1))
          satHalo.setAttribute('opacity', p.front ? '0.28' : '0.12')
        }
      }
    }

    render(0)
    if (reduceMotion) return

    // Skip work while the globe is off-screen.
    let onScreen = true
    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            onScreen = entry?.isIntersecting ?? true
          })
    observer?.observe(element)

    const tick = (time: number) => {
      if (onScreen) render(time)
    }
    gsap.ticker.add(tick)

    // ScrollTrigger: as the globe scrolls out of view it takes an extra half turn, shrinks and lifts.
    // Scale and yPercent are separate from the x/y that the pointer parallax below animates,
    // so the two effects combine instead of fighting.
    const parallaxSvg = element.querySelector<SVGSVGElement>('.globe-parallax')
    const scrollContext = gsap.context(() => {
      const scrollTrigger = {
        trigger: element,
        start: 'top 35%',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to(scroll, { spin: Math.PI, ease: 'none', scrollTrigger })
      if (parallaxSvg) {
        gsap.to(parallaxSvg, {
          scale: 0.86,
          yPercent: -6,
          transformOrigin: '50% 50%',
          ease: 'none',
          scrollTrigger,
        })
      }
    }, element)

    // Pointer parallax.
    const moveX = gsap.quickTo('.globe-parallax', 'x', { duration: 0.8, ease: 'power3.out' })
    const moveY = gsap.quickTo('.globe-parallax', 'y', { duration: 0.8, ease: 'power3.out' })
    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 13)
      moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 9)
    }
    const onPointerLeave = () => {
      moveX(0)
      moveY(0)
    }
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)

    // Anime.js: floating cards and the soft halo.
    const animations: Array<{ pause: () => void }> = []
    element.querySelectorAll('.globe-anime-card').forEach((node, index) => {
      animations.push(
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
      animations.push(
        animate(halo, {
          opacity: [0.22, 0.48, 0.22],
          scale: [0.96, 1.06, 0.96],
          duration: 4800,
          loop: true,
          ease: 'inOut(2)',
        }),
      )
    }

    return () => {
      gsap.ticker.remove(tick)
      scrollContext.revert()
      observer?.disconnect()
      animations.forEach((animation) => animation.pause())
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  const satellite = (className: string) =>
    Array.from({ length: TRAIL }, (_, i) => (
      <circle key={i} className={className} r="4" fill="#f15a2a" opacity="0" />
    ))

  return (
    <div ref={root} className="relative mx-auto w-full max-w-4xl px-1 sm:px-0" aria-label="Animated EQISI wireframe globe">
      <div className="globe-halo pointer-events-none absolute inset-x-[18%] top-[14%] h-[68%] rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 900 560"
        role="img"
        aria-labelledby="eqisi-globe-title"
        className="globe-parallax relative z-10 mx-auto block h-[clamp(190px,42vw,260px)] w-full max-w-[760px] sm:h-[clamp(250px,32vh,350px)] overflow-visible"
      >
        <title id="eqisi-globe-title">EQISI animated rotating wireframe globe with an orbiting satellite</title>
        <defs>
          <radialGradient id="eqisi-wire-globe-glow" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="72%" stopColor="#dbe8fb" stopOpacity=".25" />
            <stop offset="100%" stopColor="#9db8e8" stopOpacity=".06" />
          </radialGradient>
          <filter id="eqisi-wire-globe-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>

        <ellipse cx="450" cy="484" rx="205" ry="20" fill="#1b326e" opacity=".10" filter="url(#eqisi-wire-globe-shadow)" />

        {/* BEHIND the globe: blue guide orbits, far half of the orange orbit, far satellite */}
        <g transform={`rotate(-13 ${CX} ${CY})`} fill="none" stroke="#7894cb" strokeWidth="1.5" opacity=".6">
          <ellipse className="globe-orbit-ring" cx={CX} cy={CY} rx="354" ry="104" strokeDasharray="7 12" />
        </g>
        <g transform={`rotate(23 ${CX} ${CY})`} fill="none" stroke="#7894cb" strokeWidth="1.5" opacity=".5">
          <ellipse className="globe-orbit-ring" cx={CX} cy={CY} rx="310" ry="145" strokeDasharray="4 10" />
        </g>

        <g transform={`rotate(${ORBIT_ROT / D2R} ${CX} ${CY})`}>
          <path
            d={`M${CX - ORBIT_A} ${CY} A${ORBIT_A} ${ORBIT_B} 0 0 1 ${CX + ORBIT_A} ${CY}`}
            fill="none"
            stroke="#f15a2a"
            strokeWidth="2"
            strokeDasharray="3 8"
            strokeLinecap="round"
            opacity=".5"
          />
        </g>
        <g>{satellite('sat-back')}</g>

        {/* GLOBE */}
        <circle cx={CX} cy={CY} r={R} fill="#f4f8ff" />
        <circle cx={CX} cy={CY} r={R + 1} fill="url(#eqisi-wire-globe-glow)" />
        <path className="globe-lines-back" fill="none" stroke="#5575b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".25" />
        <path className="globe-lines-front" fill="none" stroke="#4860ac" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#4860ac" strokeWidth="11" />

        {/* Surface nodes that rotate with the globe */}
        {NODES.map((n) => (
          <g key={`${n.lat}-${n.lon}`} className="globe-node">
            <circle className="node-ring" r="6" fill="none" stroke={n.color} strokeWidth="2" opacity="0" />
            <circle className="node-core" r="5" fill={n.color} opacity="0" />
          </g>
        ))}

        {/* IN FRONT of the globe: near half of the orange orbit, near satellite */}
        <g transform={`rotate(${ORBIT_ROT / D2R} ${CX} ${CY})`}>
          <path
            d={`M${CX - ORBIT_A} ${CY} A${ORBIT_A} ${ORBIT_B} 0 0 0 ${CX + ORBIT_A} ${CY}`}
            fill="none"
            stroke="#f15a2a"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity=".95"
          />
        </g>
        <circle className="sat-halo" r="13" fill="#f15a2a" opacity="0" />
        <g>{satellite('sat-front')}</g>

        {/* Floating data callouts */}
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
      </svg>
      <p className="relative z-10 -mt-1 px-2 text-center text-[9px] font-semibold tracking-[0.14em] text-fg-muted uppercase sm:text-sm sm:tracking-[0.22em]">
        One connected world · One integrated partner
      </p>
      <div className="relative z-20 mx-auto mt-5 max-w-2xl rounded-2xl border border-border/80 bg-surface/95 p-3 shadow-card backdrop-blur sm:p-4" aria-label="Explore globe locations">
        <div className="flex flex-wrap justify-center gap-2">
          {LOCATIONS.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={activeLocation === index} onClick={() => setActiveLocation(index)} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${activeLocation === index ? 'border-primary bg-primary text-primary-fg shadow-subtle' : 'border-border bg-canvas text-fg hover:border-primary/50'}`}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-3 border-t border-border pt-3 text-left">
          <span className="mt-1 size-2.5 shrink-0 rounded-full" style={{ backgroundColor: location.color }} />
          <div aria-live="polite" className="min-w-0">
            <p className="text-sm font-bold text-fg">{location.name} <span className="font-medium text-fg-muted">· {location.region}</span></p>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{location.detail}</p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-xl px-3 text-center text-[10px] leading-relaxed text-fg-muted">
        Illustrative global connection points for the globe animation; locations shown are not a directory of EQISI offices or confirmed client sites.
      </p>
    </div>
  )
}